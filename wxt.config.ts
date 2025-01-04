import { defineConfig } from 'wxt';
import type { ConfigEnv } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  extensionApi: 'chrome',
  modules: ['@wxt-dev/module-react'],
  manifest: (env: ConfigEnv) => ({
    name: (env.browser === 'firefox') ? 'Git Ingest - Turn any Git repo to LLM prompt' : 'Git Ingest - Turn any Git repo to a LLM-friendly prompt',
    description: 'Turn any Git repository into a prompt-friendly text ingest for LLMs. By replacing hub with ingest to access a coresponding digest.',
    permissions: ['storage'],
  })
});
