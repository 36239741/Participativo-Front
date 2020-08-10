import { environment } from 'src/environments/environment';

const PROXY_CONFIG = {
    "/api/*": {
        "target": environment.API_URL,
        "secure": false,
        "logLevel": "debug",
        "changeOrigin": true
      }
}
module.exports = { PROXY_CONFIG };