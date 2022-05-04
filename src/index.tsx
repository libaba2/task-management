import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { adminRoutes, MainRouter, AdminRouter } from "./router/route";
import { BrowserRouter as MyRouter, Routes, Route } from "react-router-dom";
import Menu from "./views/menu";

import "./styles/public.scss";
// 获取导航菜单
const menu = adminRoutes

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <MyRouter>
      <Routes>
        <Route
          path="/*"
          element={
            <Menu menu={menu}>
              <AdminRouter />
            </Menu>
          }
        />

        {MainRouter.map((route: any) => {
          return (
            <Route key={route.path} path={route.path} element={route.element} />
          );
        })}
      </Routes>
    </MyRouter>
  </React.StrictMode>
);

reportWebVitals();
