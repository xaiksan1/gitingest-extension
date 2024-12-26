import { createGitIngestButton, appendGitIngestButton } from "./git-ingest-button";

export default defineContentScript({
  matches: ['*://*.github.com/*'],
  main() {
    // Function to check if we're on a repository page
    const isRepoPage = () => window.location.pathname.match(/^\/[^/]+\/[^/]+/);

    // Throttle function to limit the rate of execution
    const throttle = (func: Function, limit: number) => {
      let inThrottle: boolean;
      return function(...args: any[]) {
        if (!inThrottle) {
          func.apply(this, args);
          inThrottle = true;
          setTimeout(() => inThrottle = false, limit);
        }
      }
    }

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

    // Throttled version of manageButton
    const throttledManageButton = throttle(manageButton, 250);

    // Create a single observer for the main navigation container
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'childList') {
          throttledManageButton();
          break;
        }
      }
    });

    // Observe the main container that's present on all GitHub pages
    const mainContainer = document.querySelector('#js-repo-pjax-container');
    if (mainContainer) {
      observer.observe(mainContainer, { 
        childList: true,
        subtree: true 
      });
    }

    // Watch for future main container changes
    const bodyObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'childList') {
          const mainContainer = document.querySelector('#js-repo-pjax-container');
          if (mainContainer && !observer.takeRecords().length) {
            observer.observe(mainContainer, { 
              childList: true,
              subtree: true 
            });
          }
        }
      }
    });

    bodyObserver.observe(document.body, { childList: true });

    // Handle browser navigation events
    window.addEventListener('popstate', throttledManageButton);
    window.addEventListener('pushstate', throttledManageButton);
    window.addEventListener('replacestate', throttledManageButton);
  },
});
