import "./index.css"

import ReactDOM from "react-dom/client"

import App from "./app/App"
import { ContextProvider } from "./lib/Context"

ReactDOM.createRoot(document.getElementById("root")).render(
    <ContextProvider>
        <App />
    </ContextProvider>
)