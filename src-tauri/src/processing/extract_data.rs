use crate::types::VigiError;
use async_trait::async_trait;
use mime::Mime;
use reqwest::header::CONTENT_TYPE;
use url::Url;

use tokio_gemini::certs::SelfsignedCertVerifier;

use super::{utils::mime_to_type, Response};

pub async fn process_url(url: Url) -> Result<Response, VigiError> {
    let result = match url.scheme() {
        "http" | "https" => process_http(url.as_str()).await?,
        "gemini" => process_gemini(url.as_str()).await?,
        _ => Err(VigiError::UnsupportedProtocol)?,
    };

    Ok(result)
}

async fn process_http(url: &str) -> Result<Response, VigiError> {
    let res = reqwest::get(url).await.map_err(|_| VigiError::Network)?;

    let mime = {
        match res.headers().get(CONTENT_TYPE) {
            Some(header) => match header.to_str() {
                Ok(mime) => mime.to_owned(),
                Err(_) => "text/plain".to_owned(),
            },
            None => "text/plain".to_owned(),
        }
    }
    .parse::<Mime>()
    .map_err(|_| VigiError::InvalidMimeType)?;

    Ok(Response {
        mime: mime_to_type(mime),
        data: res.bytes().await.map_err(|_| VigiError::Network)?.into(),
    })
}

async fn process_gemini(url: &str) -> Result<Response, VigiError> {
    let client = tokio_gemini::Client::builder()
        .with_selfsigned_cert_verifier(CertVerifier)
        .build();

    match client
        .request(url)
        .await
        .map_err(|_| VigiError::Network)?
        .ensure_ok()
    {
        Ok(mut resp) => Ok(Response {
            mime: mime_to_type(resp.mime().map_err(|_| VigiError::InvalidMimeType)?),
            data: resp.bytes().await.map_err(|_| VigiError::Network)?,
        }),
        Err(_) => Err(VigiError::Network),
    }
}

struct CertVerifier;

#[async_trait]
impl SelfsignedCertVerifier for CertVerifier {
    async fn verify(
        &self,
        _: &tokio_gemini::certs::CertificateDer<'_>,
        _: &str,
        _: u16,
    ) -> Result<bool, tokio_gemini::LibError> {
        Ok(true)
    }
}
