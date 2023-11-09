import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./pages/mainPage.tsx"
import './App.css'

function App() {
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
    },

  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
