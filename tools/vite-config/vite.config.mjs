const defineConfig = require('vite');
const react = require('@vitejs/plugin-react')
const tsconfigPaths = require('vite-tsconfig-paths')
const dts = require('vite-plugin-dts')
const preserveDirectives = require('rollup-preserve-directives')
// const path = require("node:path")

const createConfig = (libraryName, additionalConfig) => {
  return defineConfig({
    /*resolve: {
      alias: {
        "@/style": path.resolve(__dirname, './src/assets/css'),
      }
    },*/
    plugins: [
      preserveDirectives(),
      react(),
      tsconfigPaths({
        projects: ["./tsconfig.json"],
      }),
      dts({
        rollupTypes: true,
        insertTypesEntry: true, // generates an `index.d.ts` if there's an `index.ts`
        tsconfigPath: "./tsconfig.json",
        outDir: "./dist/_types",
        exclude: ["./src/stories"],
      })
    ],
    build: {
      lib: {
        entry: 'index.ts', // adjust if your entry is different
        name: libraryName,
        formats: ["es"],
        fileName: (format) => `index.${format}.js`,
      },
      emptyOutDir: true,
      outDir: "./dist",
      sourcemap: false,
      copyPublicDir: true,
      minify: false,
      rollupOptions: {
        output: {
          dir: './dist/',
          preserveModules: true,
          entryFileNames: "[name].js",
          chunkFileNames: "[name].js",
          assetFileNames: "[name].[ext]",
          globals: {
            react: "React",
            "react-dom": "ReactDOM",
          }
        },
        external: [
          "react", "react-dom", "react/jsx-runtime",
          "next/navigation", "next/link", "next/auth", "next/font/google",
          "dayjs", "lodash"
        ],
      },
      cssCodeSplit: true,
    },
    ...additionalConfig
  });
}

module.exports = createConfig;
