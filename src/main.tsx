import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./providers/ThemeProvider.tsx";
import { Toaster } from "./components/ui/sonner.tsx";
import { routes } from "./routes/routes.tsx";
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <Provider store={store}>
        <RouterProvider router={routes} />
        <Toaster richColors />
      </Provider>
    </ThemeProvider>

  </React.StrictMode>
);