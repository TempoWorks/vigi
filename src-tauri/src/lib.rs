mod types;

use std::fs;

use dalet::typed::Page;

use drova_plugins::plugins;
use drova_sdk::{Core, CoreBuilder, Error};
use tauri::Manager;
use types::{
    PermanentSiteTab, PermanentState, PermanentTabLink, SiteTab, TabLink, VigiError, VigiState,
};

struct AppData<'a> {
    drova_core: Core<'a>,
}

#[tauri::command]
async fn process_url(input: &str, app: tauri::AppHandle) -> Result<Page, Error> {
    app.state::<AppData>().drova_core.process(input).await
}

#[tauri::command]
async fn save_state(state: VigiState, app_handle: tauri::AppHandle) -> Result<(), VigiError> {
    let path = app_handle
        .path()
        .app_local_data_dir()
        .map_err(|_| VigiError::NoPathToSave)?
        .join("state.vigi");

    println!("saving state to: {}", path.to_str().unwrap());

    let permanent = PermanentState {
        current_tab: state.current_tab,
        sidebar_open: state.sidebar_open,
        tabs: state
            .tabs
            .into_iter()
            .map(
                |SiteTab {
                     id: _,
                     current_link,
                     links,
                 }| {
                    return PermanentSiteTab {
                        current_link,
                        links: links
                            .into_iter()
                            .map(
                                |TabLink {
                                     ty,
                                     uri,
                                     title,
                                     body: _,
                                 }| {
                                    return PermanentTabLink { ty, uri, title };
                                },
                            )
                            .collect(),
                    };
                },
            )
            .collect(),
    };

    Ok(fs::write(
        path,
        bitcode::serialize(&permanent).map_err(|_| VigiError::StateSaveFailed)?,
    )
    .map_err(|_| VigiError::StateSaveFailed)?)
}

#[tauri::command]
async fn get_state(app_handle: tauri::AppHandle) -> Result<VigiState, VigiError> {
    let path = app_handle
        .path()
        .app_local_data_dir()
        .map_err(|_| VigiError::NoPathToSave)?
        .join("state.vigi");

    println!("getting state from: {}", path.to_str().unwrap());

    let permanent: PermanentState =
        bitcode::deserialize(&fs::read(path).map_err(|_| VigiError::ReadStateFailed)?)
            .map_err(|_| VigiError::ReadStateFailed)?;

    let mut counter = 0;

    Ok(VigiState {
        current_tab: permanent.current_tab,
        tab_counter: permanent.tabs.len(),
        sidebar_open: permanent.sidebar_open,
        tabs: permanent
            .tabs
            .into_iter()
            .map(
                |PermanentSiteTab {
                     current_link,
                     links,
                 }| {
                    counter += 1;

                    SiteTab {
                        id: counter - 1,
                        current_link,
                        links: links
                            .into_iter()
                            .map(|PermanentTabLink { title, ty, uri }| TabLink {
                                ty,
                                title,
                                body: None,
                                uri,
                            })
                            .collect(),
                    }
                },
            )
            .collect(),
    })
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            app.manage(AppData {
                drova_core: CoreBuilder::default().plugin(plugins).build(),
            });
            Ok(())
        })
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![process_url, save_state, get_state])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
