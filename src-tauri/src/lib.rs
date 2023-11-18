use tauri::App;
#[cfg(mobile)]
pub mod mobile;
#[cfg(mobile)]
pub use mobile::*;

use std::sync::{Arc, Mutex};
use reqwest::header::{HeaderMap, HeaderValue, AUTHORIZATION, LOCATION};
extern crate dotenv;
pub mod models;
use dotenv::dotenv;

pub type SetupHook = Box<dyn FnOnce(&mut App) -> Result<(), Box<dyn std::error::Error>> + Send>;

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}
#[tauri::command]
fn my_custom_command(invoke_message: &str) -> String {
    format!(
        "This is the message from Rust invoke from front-end, {}!",
        invoke_message
    )
}
#[tauri::command]
async fn image_request(payload: crate::models::ImagePayload) -> Result<serde_json::Value, String> {
    /*
    dotenv().ok();
    let endpoint = std::env::var("MADCATZ_SERVER")
        .map_err(|e| format!("Failed to read MADCATZ_SERVER environment variable: {}", e))?;
    */
    let endpoint = "http://localhost:1010";

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

#[derive(Default)]
pub struct AppBuilder {
    setup: Option<SetupHook>,
}
impl AppBuilder {
    pub fn new() -> Self {
        Self::default()
    }
    #[must_use]
    pub fn setup<F>(mut self, setup: F) -> Self
    where
        F: FnOnce(&mut App) -> Result<(), Box<dyn std::error::Error>> + Send + 'static,
    {
        self.setup.replace(Box::new(setup));
        self
    }
    pub fn run(self) {
        let setup = self.setup;
        tauri::Builder::default()
            .setup(move |app| {
                if let Some(setup) = setup {
                    (setup)(app)?;
                }
                Ok(())
            })
            .invoke_handler(tauri::generate_handler![
                greet,
                my_custom_command,
                image_request])
            .run(tauri::generate_context!())
            .expect("error while running tauri application");
    }
}

#[cfg(mobile)]
fn do_something() {
    println!("Hello from Mobile!");
}
#[cfg(desktop)]
fn do_something() {
    println!("Hello from Desktop!");
}
fn run() {
    if cfg!(mobile) {
        println!("Hello from Mobile!");
    } else {
        println!("Hello from Desktop!");
    }
}