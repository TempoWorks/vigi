use dalet::typed::Tag;
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
    ReadStateFailed,
    StateSaveFailed,
    NoPathToSave,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct PermanentState {
    current_tab: usize,
    sidebar_open: bool,
    tabs: Vec<PermanentSiteTab>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct PermanentSiteTab {
    current_link: usize,
    links: Vec<TabLink>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct TabLink {
    title: String,
    body: Vec<Tag>,

    ty: TabType,
    uri: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub enum TabType {
    RENDER,
    BROWSER,
}
