import { createGitIngestButton, appendGitIngestButton } from "./git-ingest-button";
import { PageObserver } from "./page-observer";

export default defineContentScript({
  matches: ['*://*.github.com/*'],
  main() {
    // Function to check if we're on a repository page
    const isRepoPage = () => window.location.pathname.match(/^\/[^/]+\/[^/]+/);

    // Function to manage button visibility
    const manageButton = () => {
      const existingButton = document.getElementById('git-ingest-button');
      
      if (isRepoPage()) {
        if (!existingButton) {
          const button = createGitIngestButton();
          appendGitIngestButton(button);
        }
      } else {
        existingButton?.remove();
      }
    };

    // Initial check
    manageButton();

    // Setup page observer
    new PageObserver(manageButton);
  },
});
