use bytes::Bytes;
use dalet::typed::Page;
use url::Url;

mod extract_daletpack;
mod extract_data;
mod utils;

use extract_daletpack::process_data;
use extract_data::process_url;

use crate::types::DaletProcessingError;

#[derive(Debug)]
pub enum MimeType {
    Text,
    GemText,

    Unsupported,
}

#[derive(Debug)]
pub struct Response {
    mime: MimeType,
    data: Bytes,
}

pub async fn process_input(input: &str) -> Result<Page, DaletProcessingError> {
    println!("\nprocessing: {}", input);

    let parsed = Url::parse(input);

    let Response { mime, data } = match parsed {
        Ok(url) => process_url(url).await?,
        Err(_) => Err(DaletProcessingError::Network)?,
    };

    println!("  mime: {:?}\n  size: {} kb\n", mime, data.len() / 1000);

    let result = process_data(mime, data).await?;

    Ok(result)
}
