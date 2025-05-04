use dalet::typed::Tag;
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub enum DaletProcessingError {
    Network,
    Parse,

    UnsupportedProtocol,
    UnsupportedMimeType,
    InvalidMimeType,

    InvalidCharset,

    GeminiCerts,
}

#[derive(Debug, Serialize, Deserialize)]
pub enum VigiError {
    ReadStateFailed,
    StateSaveFailed,
    NoPathToSave,
}

#[derive(Debug, Serialize, Deserialize)]
pub enum TabType {
    RENDER,
    BROWSER,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct VigiState {
    pub current_tab: usize,
    pub tab_counter: usize,
    pub sidebar_open: bool,
    pub tabs: Vec<SiteTab>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct SiteTab {
    pub id: usize,
    pub current_link: usize,
    pub links: Vec<TabLink>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct TabLink {
    pub title: Option<String>,
    pub body: Option<Vec<Tag>>,

    pub ty: TabType,
    pub uri: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct PermanentState {
    pub current_tab: usize,
    pub sidebar_open: bool,
    pub tabs: Vec<PermanentSiteTab>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct PermanentSiteTab {
    pub current_link: usize,
    pub links: Vec<PermanentTabLink>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct PermanentTabLink {
    pub title: Option<String>,
    pub ty: TabType,
    pub uri: String,
}
