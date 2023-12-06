import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Main from "./pages/mainPage/index.tsx";
import LoginForm from "./pages/loginPage";
import Protected from "./routes/Protected.tsx";
import "./App.css";
import AccountEntryForm from "./pages/accountForm";
import AccountList from "./pages/accountList";
import NotFound from "./components/notFound/NotFound.tsx";
import AccountListArchive from "./pages/accountListArchive/index.tsx";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Protected>
          <Main />
        </Protected>
      ),
    },
    {
      path: "/new-doc",
      element: (
        <Protected>
          <AccountEntryForm />
        </Protected>
      ),
    },
    {
      path: "/edit/:docId/doc",
      element: (
        <Protected>
          <AccountEntryForm />
        </Protected>
      ),
    },
    {
      path: "/account-list",
      element: (
        <Protected>
          <AccountList />
        </Protected>
      ),
    },
    {
      path: "/account-list-archive",
      element: (
        <Protected>
          <AccountListArchive />
        </Protected>
      ),
    },
    {
      path: "/login",
      element: <LoginForm />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
