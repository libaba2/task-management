import { useRoutes } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Loading } from "../components";
import React from "react";
import { HomeOutlined, FormOutlined } from "@ant-design/icons";

// 页面组件
const Login = lazy(
  () => import(/* webpackChunkName: 'login' */ "../views/login/index")
);
const Home = lazy(
  () => import(/* webpackChunkName: 'login' */ "../views/home/index")
);
const NotFound = lazy(
  () => import(/* webpackChunkName: 'project' */ "../views/notfound404/index")
);

// 路由的数据结构
interface IRouter {
  key: string;
  path: string;
  component: any;
  title?: string;
  label?: string;
  icon?: any;
  exact?: boolean;
  children?: Array<IRouter>;
}

// 未登录页面路由
const mainRoutes: Array<IRouter> = [
  {
    path: "/",
    key: "/",
    component: Login,
    title: "登录",
    label: "登录",
  },
  {
    path: "*",
    key: "*",
    component: NotFound,
    title: "404",
    label: "404",
  },
];

// 管理页面路由（已登录）
const adminRoutes: Array<IRouter> = [
  {
    path: "home",
    key: "home",
    component: Home,
    title: "首页",
    label: "首页",
    icon: <HomeOutlined />,
  },
  {
    path: "404",
    key: "404",
    component: NotFound,
    title: "404",
    label: "404",
    icon: <FormOutlined />,
  },
];

// 根据路径获取路由
// const checkAuth = (routers: any, path: string) => {
//   for (const data of routers) {
//     if (data.path === path) return data;
//     if (data.children) {
//       const res: any = checkAuth(data.children, path);
//       if (res) return res;
//     }
//   }

//   return null;
// };

// 路由处理方式
const generateRouter = (routes: Array<IRouter>) => {
  return routes.map((item: any, index: number) => {
    if (item.children) {
      item.children = generateRouter(item.children);
    }
    // 路由懒加载
    item.element = (
      <Suspense fallback={<Loading />}>
        <item.component />
      </Suspense>
    );

    return item;
  });
};

const MainRouter = generateRouter(mainRoutes);
const AdminRouter = () => useRoutes(generateRouter(adminRoutes));

export { adminRoutes, MainRouter, AdminRouter };
