import {
  AlignLeft,
  KeyRound,
  LayoutDashboard,
  List,
  Settings2Icon,
} from "lucide-react";

export const DashboardRoutes = [
  {
    id: 1,
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "",
  },
  {
    id: 2,
    label: "Groups",
    icon: AlignLeft,
    path: "/groups",
  },
  {
    id: 3,
    label: "Keywords",
    icon: KeyRound,
    path: "/keywords",
  },
  {
    id: 4,
    label: "Posts",
    icon: List,
    path: "/posts",
  },
  {
    id: 5,
    label: "Settings",
    icon: Settings2Icon,
    path: "/settings",
  },
];

export const groups = [
  {
    id: 1,
    name: "NextJS Developers",
    url: "https://www.facebook.com/groups/274791304282884",
    cover:
      "https://scontent.fmru4-1.fna.fbcdn.net/v/t1.6435-9/176468002_283800146686805_924265491618579039_n.png?_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_ohc=OHbrTChbco4Ab6bM8xC&_nc_ht=scontent.fmru4-1.fna&oh=00_AfBW2hxEdniVlT4sjp_PHclaFtiS7HjEnuGz-btEweA3Rw&oe=663DDF4A",
    status: "pending",
  },
  {
    id: 2,
    name: "Canva Community",
    url: "https://www.facebook.com/groups/274791304282884",
    cover:
      "https://scontent.fmru4-1.fna.fbcdn.net/v/t1.6435-9/176468002_283800146686805_924265491618579039_n.png?_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_ohc=OHbrTChbco4Ab6bM8xC&_nc_ht=scontent.fmru4-1.fna&oh=00_AfBW2hxEdniVlT4sjp_PHclaFtiS7HjEnuGz-btEweA3Rw&oe=663DDF4A",
    status: "approved",
  },
];

export const keywords = [
  {
    id: 1,
    name: "roofer",
    posts: 0,
  },
  {
    id: 2,
    name: "plumber",
    posts: 1,
  },
];

export const settingsRoutes = [
  {
    label: "Account",
    route: "",
  },
  {
    label: "Subscription",
    route: "/subscription",
  },
];

export const plans = [
  {
    title: "Starter",
    desc: "Good for testing.",
    price: {
      monthly: "14.99",
      yearly: "149.99",
    },
    perks: {
      groups: 2,
      keywords: 1,
      notifications: "unlimited",
    },
    subscribe: false,
  },
  {
    title: "Pro",
    desc: "Start developping your interest.",
    price: {
      monthly: "19.99",
      yearly: "199.99",
    },
    perks: {
      groups: 5,
      keywords: 5,
      notifications: "unlimited",
    },
    subscribe: true,
  },
  {
    title: "Advanced",
    desc: "Access unlimited perks",
    price: {
      monthly: "24.99",
      yearly: "249.99",
    },
    perks: {
      groups: "Unlimited",
      keywords: "Unlimited",
      notifications: "unlimited",
    },
    subscribe: false,
  },
];

export const user = {
  name: "Jane",
  userId: 2390434,
  avatar:
    "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600",
  email: "jane@gmail.com",
  subscription: {
    plan: "starter",
  },
  data: {
    groups: 4,
    keywords: 2,
  },
};
