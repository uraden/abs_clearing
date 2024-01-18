import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Main from "./pages/mainPage/index.tsx";
import LoginForm from "./pages/loginPage";
import Protected from "./routes/Protected.tsx";
import "./App.css";
// import AccountEntryForm from "./pages/accountForm";
import NewDoc from "./pages/accountFormNew/newDoc.tsx";
import AccountEditDoc from "./pages/editDoc";
import ArchiveDoc from "./pages/archiveDoc"
// import AccountEntryFormNew from "./pages/accountFormNew";
import AccountList from "./pages/accountList";
import AccountPage from "./pages/accountPage";
import NotFound from "./components/notFound/NotFound.tsx";
import AccountListArchive from "./pages/accountListArchive/index.tsx";
import AccountBalancePage from "./pages/accountBalancePage/index.tsx";
import DraftForm from "./pages/draftPage/index.tsx";
import Revenue from "./pages/accountBalancePage/revenue/index.tsx";
import BalanceSheetPage from "./pages/balanceSheetPage/index.tsx";
import BalancePeriodSheetPage from "./pages/balancePeriodSheetPage/index.tsx";
import AccountPeriodReport from "./pages/accountPeriodReports/index.tsx";
import BalanceExchange from "./pages/balanceExchange/index.tsx"
import AccountRecentReport from "./pages/accountRecentReports/index.tsx";
import DeleteIncomplete from "./pages/deleteIncomplete/index.tsx";
import Reference from "./pages/reference/index.tsx";
import BankReference from "./pages/bankReference/index.tsx";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Protected>
          <AccountPage />
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
          <NewDoc />
          {/* <AccountEntryFormNew /> */}
        </Protected>
      ),
    },
    // {
    //   path: "/new-ui-doc",
    //   element: (
    //     <Protected>
    //       <AccountEntryFormNew />
    //     </Protected>
    //   ),
    // },
    {
      path: "/edit/:docId/doc",
      element: (
        <Protected>
          <AccountEditDoc />
        </Protected>
      ),
    },
    {
      path: "/archive/:docId/doc",
      element: (
        <Protected>
          <ArchiveDoc />
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
    // {
    //   path: "/account-page",
    //   element: (
    //     <Protected>
    //       <AccountPage />
    //     </Protected>
    //   ),
    // },
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
      path: "/account-recent-reports",
      element: (
        <Protected>
          <AccountRecentReport />
        </Protected>
      ),
    },
    {
      path: "/account-period-reports",
      element: (
        <Protected>
          <AccountPeriodReport />
        </Protected>
      ),
    },
    {
      path: "/saldo-report",
      element: (
        <Protected>
          <BalanceExchange />
        </Protected>
      ),
    },
    {
      path: "/balance-sheet",
      element: (
        <Protected>
          <BalanceSheetPage />
        </Protected>
      ),
    },
    {
      path: "/balance-period-sheet",
      element: (
        <Protected>
          <BalancePeriodSheetPage />
        </Protected>
      ),
    },
    {
      path: "/delete-incomplete",
      element: (
        <Protected>
          <DeleteIncomplete />
        </Protected>
      ),
    },
    {
      path: "/reference",
      element: (
        <Protected>
          <Reference />
        </Protected>
      ),
    },
    {
      path: "/bank-reference",
      element: (
        <Protected>
          <BankReference />
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
