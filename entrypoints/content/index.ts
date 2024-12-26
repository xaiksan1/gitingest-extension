import { createGitIngestButton, appendGitIngestButton } from "./git-ingest-button";

export default defineContentScript({
  matches: ['*://*.github.com/*'],
  main() {
    // Only run on repository pages
    if (!window.location.pathname.match(/^\/[^/]+\/[^/]+/)) return;

    // Create the GitIngest button
    const button = createGitIngestButton();

    // Insert into the repository actions list
    appendGitIngestButton(button);
  },
});
