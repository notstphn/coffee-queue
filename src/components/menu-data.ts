export type MenuItem = {
  id: string;
  name: string;
  description: string;
  category: string;
  accent: string;
  image: string;
};

export const menuItems: MenuItem[] = [
  {
    id: "latte-vanilla",
    name: "Vanilla Latte",
    description: "Description 1.",
    category: "Lattes",
    accent: "from-amber-200 to-orange-300",
    image: "/menu/vanilla-latte.png",
  },
  {
    id: "latte-cinnamon-bun",
    name: "Cinnamon Bun Latte",
    description: "Description 2.",
    category: "Lattes",
    accent: "from-rose-200 to-orange-200",
    image: "/menu/cinnamon-bun-latte.png",
  },
  {
    id: "latte-butter-pecan",
    name: "Butter Pecan Latte",
    description: "Description 3.",
    category: "Lattes",
    accent: "from-amber-100 to-amber-300",
    image: "/menu/butter-pecan-latte.png",
  },
  {
    id: "latte-maple-butter",
    name: "Maple Butter Latte",
    description: "Description 4.",
    category: "Lattes",
    accent: "from-sky-200 to-cyan-300",
    image: "/menu/maple-butter-latte.png",
  },
  {
    id: "matcha-strawberry",
    name: "Matcha Strawberry",
    description: "Description 5.",
    category: "Matcha",
    accent: "from-emerald-200 to-lime-300",
    image: "/menu/matcha-strawberry.png",
  },
  {
    id: "matcha-vanilla",
    name: "Vanilla Matcha",
    description: "Description 6.",
    category: "Matcha",
    accent: "from-yellow-200 to-orange-200",
    image: "/menu/vanilla-matcha.png",
  },
];
