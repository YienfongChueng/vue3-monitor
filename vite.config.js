import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import {  ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { visualizer } from "rollup-plugin-visualizer";
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    open:true,
    port:8088
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname,"src")
    }
  },
  plugins: [
    vue(),
    visualizer({open: true}),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [
        // IconsResolver({
        //   enabledCollections: ['ep'],
        //   prefix: 'icon'
        // }),
        ElementPlusResolver(),
      ],
    }),
    // Icons({
    //   autoInstall: true,
    // }),
  ],
})
