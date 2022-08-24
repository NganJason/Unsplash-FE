import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider as AntDConfigProvider } from "antd";
import "antd/dist/antd.variable.css";

const queryClient = new QueryClient();

AntDConfigProvider.config({
  theme: {
    primaryColor: "#7F8487",
  },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <AntDConfigProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </AntDConfigProvider>
  </React.StrictMode>
);