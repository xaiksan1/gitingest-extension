export default defineContentScript({
  matches: ['*://*.github.com/*'],
  main() {
    // Only run on repository pages
    if (!window.location.pathname.match(/^\/[^/]+\/[^/]+/)) return;

    // Create button container
    const li = document.createElement('li');
    
    // Create button with GitHub's style
    const button = document.createElement('button');
    button.className = 'btn-sm btn';
    button.innerHTML = `
      <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-arrow-right mr-2">
        <path d="M8.22 2.97a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042l2.97-2.97H3.75a.75.75 0 0 1 0-1.5h7.44L8.22 4.03a.75.75 0 0 1 0-1.06Z"></path>
      </svg>
      Open in GitIngest
    `;

    // Add click handler
    button.addEventListener('click', () => {
      const currentUrl = window.location.href;
      const gitIngestUrl = currentUrl.replace('github.com', 'gitingest.com');
      window.location.href = gitIngestUrl;
    });

    // Add button to container
    li.appendChild(button);

    // Insert into the repository actions list
    const actionsList = document.querySelector('.pagehead-actions');
    if (actionsList) {
      actionsList.insertBefore(li, actionsList.firstChild);
    }
  },
});
