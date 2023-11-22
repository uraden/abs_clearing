import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./pages/mainPage/index.tsx";
import LoginForm from "./pages/loginPage";
import Protected from "./routes/Protected.tsx";
import "./App.css";
import AccountEntryForm from "./pages/accountForm";
import AccountList from "./components/simpleTable/index.tsx";
import NotFound from "./components/NotFound.tsx";

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
      path: "/account-form",
      element: (
        <Protected isSignedIn={true}>
          <AccountEntryForm />
        </Protected>
      ),
    },
    {
      path: "/account-list",
      element: (
        <Protected isSignedIn={true}>
          <AccountList />
        </Protected>
      ),
    },
    {
      path: "/login",
      element: <LoginForm />,
    },
    {
      path: "*",
      element: <NotFound />
    }
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
