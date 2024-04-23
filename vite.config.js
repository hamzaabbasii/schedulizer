import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	base: "/schedulizer/",
	plugins: [react()],
	resolve: {
		alias: {
			"react-use": "@types/react-use",
		},
	},
	server: {
		proxy: {
			"/user": "http://localhost:8000",
			"/business": "http://localhost:8000",
			"/services": "http://localhost:8000",
			"/appointment": "http://localhost:8000",
		},
	},
});
