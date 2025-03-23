use super::{utils::truncate, MimeType};
use bytes::Bytes;
use dalet::{
    parsers::gemtext::parse_gemtext,
    typed::{Page, Tag::*},
};
use std::str;

use crate::types::VigiError;

pub async fn process_data(mime: MimeType, data: Bytes) -> Result<Page, VigiError> {
    let result = match mime {
        MimeType::Text => {
            process_text(str::from_utf8(&data).map_err(|_| VigiError::InvalidCharset)?).await
        }
        MimeType::GemText => {
            process_gemini(str::from_utf8(&data).map_err(|_| VigiError::InvalidCharset)?).await?
        }
        MimeType::Unsupported => Err(VigiError::UnsupportedMimeType)?,
    };

    Ok(result)
}

async fn process_text(data: &str) -> Page {
    let title = truncate(data, 20);
    let description = truncate(data, 100);

    Page {
        title: title.into(),
        description: description.into(),
        body: vec![El { body: data.into() }],
    }
}

async fn process_gemini(data: &str) -> Result<Page, VigiError> {
    Ok(parse_gemtext(data).map_err(|_| VigiError::Parse)?)
}
