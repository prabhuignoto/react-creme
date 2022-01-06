import reactRefresh from '@vitejs/plugin-react-refresh';
import { defineConfig } from 'vite';
import reactSVG from "vite-plugin-react-svg";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh(), reactSVG()],
})
