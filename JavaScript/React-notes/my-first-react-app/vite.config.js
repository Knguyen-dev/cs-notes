import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig({
	plugins: [react()],
	test: {
		setupFiles: "src/React_Testing/tests/setup.js",
		environment: "jsdom",
		globals: true,
	},
})
