import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

import packageJSON from './package.json';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      outDir: ['build'],
      rollupTypes: true,
      insertTypesEntry: true,
      tsconfigPath: './tsconfig.app.json'
    })
  ],
  build: {
    lib: {
      entry: 'src/index.tsx',
      fileName: (format, entryName) => `${entryName}.${format}.js`,
      name: packageJSON.name,
      formats: ['cjs', 'es']
    },
    outDir: 'build',
    rollupOptions: {
      external: Object.keys(packageJSON.peerDependencies),
      output: {
        exports: 'named'
      }
    }
  }
});
