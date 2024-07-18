import { MdDashboard } from "react-icons/md";
import { FaBasketShopping } from "react-icons/fa6";

export const roleRoutes = {
  cashier: [
    {
      title: "Dahboard",
      route: "/dashboard",
      icon: <MdDashboard />,
    },
    {
      title: "Point Of Sales",
      route: "/cashier/pos",
      icon: <FaBasketShopping />,
    },
  ],
  Administrator: [
    {
      title: "Dahboard",
      route: "/dashboard",
      icon: <MdDashboard />,
    },
  ],
};
