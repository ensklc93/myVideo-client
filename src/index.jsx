import { createRoot } from "react-dom/client"
import { MainView } from "./components/main-view/main-view"
import Container from 'react-bootstrap/Container';


import "bootstrap/dist/css/bootstrap.min.css"
// Import statement to indicate that it needs to bundle `./index.scss`
import "./index.scss"

// Main component
const MyVideoApplication = () => {
  return (
    <Container fluid>
      <MainView />
    </Container>
  )
}

// Finds the root of the app
const container = document.querySelector("#root")
const root = createRoot(container)

// Tells React to render the app in the root DOM element
root.render(<MyVideoApplication />)