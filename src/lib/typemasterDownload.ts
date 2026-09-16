/**
 * TypeMaster download (Keepware Labs).
 *
 * TypeMaster is free. Installers are hosted as GitHub Release assets rather
 * than in `public/`, because Cloudflare Pages rejects any single file over
 * 25 MiB and the MSI is ~55 MB.
 */

const RELEASE_TAG = 'v0.9.6';
const RELEASE_BASE = `https://github.com/amidia-AI/keepware-website/releases/download/${RELEASE_TAG}`;

export const TYPEMASTER_SETUP_EXE_URL = `${RELEASE_BASE}/Type.Master.V1_0.9.6_x64-setup.exe`;
export const TYPEMASTER_MSI_URL = `${RELEASE_BASE}/Type.Master.V1_0.9.6_x64_en-US.msi`;

/**
 * Starts the TypeMaster installer download in a new tab so an in-flight
 * download never navigates the site away.
 */
export function downloadTypeMaster(): void {
  window.open(TYPEMASTER_SETUP_EXE_URL, '_blank', 'noopener,noreferrer');
  reportDownload();
}

/**
 * Fire-and-forget ping to bump the public download counter. Never blocks or
 * delays the actual download, and failures are silently ignored.
 */
function reportDownload(): void {
  fetch('/api/downloads', { method: 'POST' }).catch(() => {});
}
