import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./pages/mainPage/index.tsx";
import LoginForm from "./pages/loginPage";
import Protected from "./routes/Protected.tsx";
import "./App.css";
import AccountEntryForm from "./pages/accountForm";
import AccountList from "./pages/accountList";
import AccountPage from "./pages/accountPage";
import NotFound from "./components/notFound/NotFound.tsx";
import AccountListArchive from "./pages/accountListArchive/index.tsx";
import AccountBalancePage from "./pages/accountBalancePage/index.tsx";
import DraftForm from "./pages/draftPage/index.tsx";
import Revenue from "./pages/accountBalancePage/revenue/index.tsx";

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
      path: "/draft-form",
      element: (
        <Protected>
          <DraftForm />
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
      path: "/account-page",
      element: (
        <Protected>
          <AccountPage />
        </Protected>
      ),
    },
    {
      path: "/account-balance-page",
      element: (
        <Protected>
          <AccountBalancePage />
        </Protected>
      ),
    },
    {
      path: "/account-balance-page/:account/:revenue",
      element: (
        <Protected>
          <Revenue />
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
