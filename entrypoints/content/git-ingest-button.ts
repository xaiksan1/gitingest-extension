// Create and return the GitIngest button element
import { storage } from 'wxt/storage';

export async function createGitIngestButton(): Promise<HTMLLIElement> {
  // Add custom styles
  const style = document.createElement('style');
  style.textContent = `
    @media (max-width: 1200px) {
      .gitingest-text-full {
        display: none !important;
      }
      .gitingest-text-short {
        display: inline !important;
      }
    }
    @media (min-width: 1201px) {
      .gitingest-text-full {
        display: inline !important;
      }
      .gitingest-text-short {
        display: none !important;
      }
    }
  `;
  document.head.appendChild(style);

  // Create button container
  const li = document.createElement('li');
  
  // Create link with GitHub's button style
  const link = document.createElement('a');
  link.className = 'btn-sm btn';

  // Get custom base URL from storage, default to gitingest.com if not set
  const baseUrl = await storage.getItem<string>('sync:baseUrl') || 'gitingest.com';
  link.href = window.location.href.replace('github.com', baseUrl);
  
  // Create spans for different screen sizes
  const linkContent = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16" class="octicon octicon-file-moved mr-2"><path d="M2 1.75C2 .784 2.784 0 3.75 0h6.586c.464 0 .909.184 1.237.513l2.914 2.914c.329.328.513.773.513 1.237v9.586A1.75 1.75 0 0 1 13.25 16h-3.5a.75.75 0 0 1 0-1.5h3.5a.25.25 0 0 0 .25-.25V4.664a.25.25 0 0 0-.073-.177l-2.914-2.914a.25.25 0 0 0-.177-.073H3.75a.25.25 0 0 0-.25.25v6.5a.75.75 0 0 1-1.5 0v-6.5Z"></path><path d="m5.427 15.573 3.146-3.146a.25.25 0 0 0 0-.354L5.427 8.927A.25.25 0 0 0 5 9.104V11.5H.75a.75.75 0 0 0 0 1.5H5v2.396c0 .223.27.335.427.177Z"></path></svg>
    <span class="gitingest-text-full">Open in GitIngest</span>
    <span class="gitingest-text-short">GitIngest</span>
  `;
  link.innerHTML = linkContent;

  // Add button to container
  li.appendChild(link);

  li.id = 'git-ingest-button';

  return li;
}

export function appendGitIngestButton(button: HTMLElement) {
  const actionsList = document.querySelector('#repository-details-container > ul');
  if (actionsList) {
    if (actionsList.children.length >= 2) {
      actionsList.insertBefore(button, actionsList.children[1]);
    } else {
      actionsList.insertBefore(button, actionsList.firstChild);
    }
  }
}

// Add storage change listener to update button URL when settings change
storage.watch('sync:baseUrl', () => {
  const button = document.getElementById('git-ingest-button');
  if (button) {
    const link = button.querySelector('a');
    if (link) {
      createGitIngestButton().then(newButton => {
        link.href = newButton.querySelector('a')?.href || link.href;
      });
    }
  }
});