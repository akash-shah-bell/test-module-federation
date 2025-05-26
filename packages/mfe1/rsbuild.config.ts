import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';
import { createModuleFederationConfig } from '@module-federation/rsbuild-plugin';
import path from 'path';

const moduleFederationConfig = createModuleFederationConfig({
  name: 'mfe1',
  exposes: {
    "./index": "./src/index.ts"
  },
  remotes: {
    '@remote/mfe2': 'mfe2@http://localhost:8082/mf-manifest.json',
  },
  shareStrategy: 'loaded-first',
  shared: {
    react: { singleton: true },
    'react-dom': { singleton: true },
  },
});


export default defineConfig({
  source: {
    entry: {
      'index': path.join(path.resolve(__dirname), 'src', 'index.ts')
    }
  },
  plugins: [pluginReact(), pluginModuleFederation(moduleFederationConfig)],
  server: {
    port: 8081,
  },
});
