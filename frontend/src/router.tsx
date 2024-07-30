import {
  createBrowserRouter,
} from "react-router-dom";
import { lazy } from "react";

import DefaultLayout from "./layouts/default.tsx";
const Header = lazy(() => import("./components/Header"));
const Home = lazy(() => import('./pages/Home'));


export const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout slots={[  // wrapping elements with custom Layout
      {
        el: Header,
        props: {
          title: 'Daily Deeds',
        },
      },
      {el:Home}
    ]}/>
  },
]);