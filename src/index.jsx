import { createRoot } from "react-dom/client"
import { MainView } from "./components/main-view/main-view.jsx"

// Import statement to indicate that it needs to bundle `./index.scss`
import "./index.scss"

// Main component
const MyFlixApplication = () => {
  return <MainView />;
}

// Finds the root of the app
const container = document.querySelector("#root")
const root = createRoot(container)

// Tells React to render the app in the root DOM element
root.render(<MyFlixApplication />)
