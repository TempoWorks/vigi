use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug)]
pub enum VigiError {
    Network,
    Parse,

    UnsupportedProtocol,
    UnsupportedMimeType,
    InvalidMimeType,

    InvalidCharset,

    GeminiCerts,
}
