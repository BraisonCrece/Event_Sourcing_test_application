import { createApp} from "vue"
import { install as router } from "vue-router-dom"

import App from "./app"

const app = createApp(App)
app.use(router)
app.mount("#app")
