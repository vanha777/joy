use std::sync::{Arc, Mutex};
use std::thread;

use serde::{Serialize, Deserialize};

struct ServerState {
    clients_connected: u32,
    // Add other state fields as needed
}
#[derive(Clone, Serialize, Deserialize, Debug)]
pub struct ImagePayload {
    pub invoke_message: String,
    pub access_token: String,
    pub user_id: String, // Add other state fields as needed
}
