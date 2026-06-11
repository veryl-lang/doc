use std::fs;
use std::path::PathBuf;

fn main() {
    let manifest_dir = PathBuf::from(std::env::var("CARGO_MANIFEST_DIR").unwrap());
    let lock_path = manifest_dir.join("Cargo.lock");
    println!("cargo:rerun-if-changed={}", lock_path.display());

    let revision = fs::read_to_string(&lock_path)
        .ok()
        .and_then(|text| extract_revision(&text))
        .unwrap_or_else(|| "unknown".to_string());

    println!("cargo:rustc-env=VERYL_REVISION={revision}");
}

fn extract_revision(lock: &str) -> Option<String> {
    let mut in_target = false;
    for line in lock.lines() {
        let line = line.trim();
        if line.starts_with("[[package]]") {
            in_target = false;
            continue;
        }
        if line == "name = \"veryl-parser\"" {
            in_target = true;
            continue;
        }
        if in_target && line.starts_with("source = ") {
            let hash = line.rsplit_once('#').map(|(_, h)| h.trim_end_matches('"'));
            if let Some(hash) = hash {
                return Some(hash.to_string());
            }
        }
    }
    None
}
