use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
pub enum VigiError {
    NetworkError,
    ParseError,
}
