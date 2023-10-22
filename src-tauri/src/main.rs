// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
extern crate dotenv;
use dotenv::dotenv;
use std::env;
use std::sync::{Arc, Mutex};
use std::thread;

// Using lazy_static to initialize the Arc<Mutex<String>>
lazy_static::lazy_static! {
  static ref STATE: Arc<Mutex<String>> = Arc::new(Mutex::new(String::from("Initial Server State")));
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![my_custom_command, get_server_state,change_server_state])
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
fn get_server_state() -> String {
    let state = STATE.lock().unwrap();
    format!("This is the message from Rust invoked from front-end: {}!", *state)
}

#[tauri::command]
fn change_server_state(new_state: &str) -> String {
    let mut state = STATE.lock().unwrap();
    *state = new_state.to_string();
    format!("State has been updated to: {}", *state)
}
