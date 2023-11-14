import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./pages/mainPage/index.tsx"
import LoginForm from "./pages/loginPage";
import Protected from "./routes/Protected.tsx";
import './App.css'

function App() {
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Protected isSignedIn={true}>
          <Main />
      </Protected>
      ),
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
