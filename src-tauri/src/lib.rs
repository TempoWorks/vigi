mod processing;
mod types;

use std::fs;

use dalet::typed::Page;
use processing::process_input;
use tauri::Manager;
use types::{DaletProcessingError, VigiError};

#[tauri::command]
async fn process_url(input: &str) -> Result<Page, DaletProcessingError> {
    process_input(input).await
}

#[tauri::command]
async fn save_state(input: &str, app_handle: tauri::AppHandle) -> Result<(), VigiError> {
    let path = app_handle
        .path()
        .app_local_data_dir()
        .map_err(|_| VigiError::NoPathToSave)?
        .join("state.json");

    println!("save_state: {:?}", path);

    Ok(fs::write(path, input).map_err(|_| VigiError::StateSaveFailed)?)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![process_url, save_state])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
