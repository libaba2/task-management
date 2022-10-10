import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { adminRoutes, MainRouter, AdminRouter } from "./router/route";
import { BrowserRouter as MyRouter, Routes, Route } from "react-router-dom";
import Menu from "./views/menu";
import { Spin } from "antd";
import store from "./store";
import { Provider } from "react-redux";

import "./styles/public.scss";
// 获取导航菜单
const menu = adminRoutes;
const storeState = store.getState();
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
store.subscribe(()=>{
  console.log('subscribe 2', store.getState());
})


root.render(
  <React.StrictMode>
    <Provider store={store}>
      <MyRouter>
        <div className={storeState.loading + "kiy"}></div>
        <Spin tip="Loading..." spinning={storeState.loading}>
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
                <Route
                  key={route.path}
                  path={route.path}
                  element={route.element}
                />
              );
            })}
          </Routes>
        </Spin>
      </MyRouter>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
