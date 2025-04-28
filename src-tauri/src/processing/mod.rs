use bytes::Bytes;
use dalet::typed::Page;
use url::Url;

mod extract_daletpack;
mod extract_data;
mod utils;

use extract_daletpack::process_data;
use extract_data::process_url;

use crate::types::VigiError;

pub enum MimeType {
    Text,
    GemText,

    Unsupported,
}

pub struct Response {
    mime: MimeType,
    data: Bytes,
}

pub async fn process_input(input: &str) -> Result<Page, VigiError> {
    println!("processing: {}", input);

    let parsed = Url::parse(input);

    let Response { mime, data } = match parsed {
        Ok(url) => process_url(url).await?,
        Err(_) => Err(VigiError::Network)?,
    };

    let result = process_data(mime, data).await?;

    Ok(result)
}
