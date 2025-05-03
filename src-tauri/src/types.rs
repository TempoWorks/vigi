use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
pub enum DaletProcessingError {
    Network,
    Parse,

    UnsupportedProtocol,
    UnsupportedMimeType,
    InvalidMimeType,

    InvalidCharset,

    GeminiCerts,
}

#[derive(Serialize, Deserialize, Debug)]
pub enum VigiError {
    StateSaveFailed,
    NoPathToSave,
}
