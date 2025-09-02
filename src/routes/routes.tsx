import App from "@/App";
import BooksPage from "@/pages/BooksPage";
import BorrowSummary from "@/pages/BorrowSummary";
import CreateBookPage from "@/pages/CreateBookPage";
import { createBrowserRouter } from "react-router-dom";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <BooksPage />,
      },
      {
        path: "books",
        element: <BooksPage />,
      },
      {
        path: "create-book",
        element: <CreateBookPage />,
      },
       {
        path: "borrow-summary",
        element: <BorrowSummary />,
      },
    ],
  },
]);
