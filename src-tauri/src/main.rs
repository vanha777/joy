// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
extern crate dotenv;
pub mod models;
use dotenv::dotenv;
use reqwest::header::{HeaderMap, HeaderValue, AUTHORIZATION, LOCATION};
use reqwest::{self, header};
use serde_json;
use std::env;
use std::sync::{Arc, Mutex};
use std::thread;

// Using lazy_static to initialize the Arc<Mutex<String>>
lazy_static::lazy_static! {
  static ref STATE: Arc<Mutex<String>> = Arc::new(Mutex::new(String::from("Initial Server State")));
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            my_custom_command,
            get_server_state,
            change_server_state,
            image_request
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn my_custom_command(invoke_message: &str) -> String {
    format!(
        "This is the message from Rust invoke from front-end, {}!",
        invoke_message
    )
}

#[tauri::command]
async fn image_request(payload: models::ImagePayload) -> Result<serde_json::Value, String> {
    dotenv().ok();
    let endpoint = std::env::var("MADCATZ_SERVER")
        .map_err(|e| format!("Failed to read MADCATZ_SERVER environment variable: {}", e))?;

    let body = serde_json::json!({
        "input": payload.invoke_message.to_string()
    });
    let token = &payload.access_token.clone();
    let user = &payload.user_id.clone();
    // Create a custom HTTP header
    let mut headers = HeaderMap::new();
    headers.insert(
        AUTHORIZATION,
        HeaderValue::from_str(token).map_err(|e| e.to_string())?,
    );
    headers.insert(
        LOCATION,
        HeaderValue::from_str(user).map_err(|e| e.to_string())?,
    );

    let response = reqwest::Client::new()
        .post(&format!("{}/image", endpoint))
        .headers(headers)
        .json(&body) // Serialize the JSON body to a string
        .send()
        .await
        .map_err(|e| format!("Failed to send HTTP request: {}", e))?;

    let result_text = response
        .json()
        .await
        .map_err(|e| format!("Failed to read response body: {}", e))?;

    Ok(result_text)
}

#[tauri::command]
fn get_server_state() -> String {
    let state = STATE.lock().unwrap();
    format!(
        "This is the message from Rust invoked from front-end: {}!",
        *state
    )
}

#[tauri::command]
fn change_server_state(new_state: &str) -> String {
    let mut state = STATE.lock().unwrap();
    *state = new_state.to_string();
    format!("State has been updated to: {}", *state)
}
