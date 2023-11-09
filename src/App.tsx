import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./pages/mainPage/index.tsx"
import LoginForm from "./pages/loginPage";
import './App.css'

function App() {
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
    },
    {
      path: "/login",
      element: <LoginForm />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
