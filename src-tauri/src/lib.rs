mod processing;
mod types;

use dalet::typed::Page;
use processing::process_input;
use types::VigiError;

#[tauri::command]
async fn process_url(input: &str) -> Result<Page, VigiError> {
    process_input(input).await
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![process_url])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
