// component
import Iconify from "../../components/Iconify";

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: "dashboard",
    path: "/dashboard",
    icon: getIcon("eva:pie-chart-2-fill"),
    /* "children" key can be added in these objects, example:children:[{...}] */
  },
  {
    title: "All Products",
    path: "/products",
    icon: getIcon("fluent-mdl2:product-variant"),
  },
  {
    title: "Admin Order",
    path: "/admin-order",
    icon: getIcon("material-symbols:order-approve"),
  },
  {
    title: "Seller Order",
    path: "/seller-order",
    icon: getIcon("streamline:briefcase-dollar-solid"),
  },
  {
    title: "users",
    path: "/users",
    icon: getIcon("fe:users"),
  },

  /* example: collapsible sidebar routes
    {
      title: "parent",
      path: "/parent",
      icon: getIcon("fe:users"),
    children: [
        {
            title: "child1",
        path: "/parent/child1",
        icon: getIcon("fe:users"),
      },
      {
        title: "child2",
        path: "/parent/child2",
        icon: getIcon("fe:users"),
      },
    ],
  },
  */
];

export default navConfig;
