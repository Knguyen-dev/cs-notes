import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    /*
  - server.host: Which IP address the server should listen under. The default is 127.0.0.1, but you can 
    set it to '0.0.0.0' or 'true' to listen on all addresss.
  - server.port: Specify the port the app is listening on, if the port is laralready taken, it tries the next one
  - server.strictPort: If true, it exits rather than trying to try on the next port. This is good to setup since 
    you're using port mapping
  */
    server: {
        host: true,
        strictPort: true,
        port: 8080,
    },
})
