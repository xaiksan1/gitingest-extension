import { createGitIngestButton, appendGitIngestButton } from "./git-ingest-button";
import { PageObserver } from "./page-observer";

export default defineContentScript({
  matches: ['*://*.github.com/*'],
  main() {
    // Function to check if we're on a repository page
    const isRepoPage = () => window.location.pathname.match(/^\/[^/]+\/[^/]+/);

    // Function to manage button visibility
    let isCreatingButton = false;  // Flag to prevent concurrent button creation

    const manageButton = () => {
      const existingButton = document.getElementById('git-ingest-button');
      
      if (isRepoPage()) {
        if (!existingButton && !isCreatingButton) {
          isCreatingButton = true;
          // Handle async operation without changing function signature
          createGitIngestButton()
            .then(button => {
              appendGitIngestButton(button);
              isCreatingButton = false;
            })
            .catch(error => {
              console.error(error);
              isCreatingButton = false;
            });
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
