use mime::Mime;

use super::MimeType;

pub fn mime_to_type(mime: Mime) -> MimeType {
    match (mime.type_().as_str(), mime.subtype().as_str()) {
        ("text", "plain") => MimeType::Text,
        ("text", "gemini") => MimeType::GemText,

        _ => MimeType::Unsupported,
    }
}

pub fn truncate(s: &str, max_chars: usize) -> &str {
    match s.char_indices().nth(max_chars) {
        Some((idx, _)) => &s[..idx],
        None => s,
    }
}
