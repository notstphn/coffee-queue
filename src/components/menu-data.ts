export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  accent: string;
};

export const menuItems: MenuItem[] = [
  {
    id: "latte-vanilla",
    name: "Vanilla Latte",
    description: "Velvety espresso with vanilla bean and silky milk.",
    price: "$69.69",
    category: "Lattes",
    accent: "from-amber-200 to-orange-300",
  },
  {
    id: "mocha-cocoa",
    name: "Cocoa Mocha",
    description: "Dark chocolate and espresso topped with microfoam.",
    price: "$5.75",
    category: "Lattes",
    accent: "from-rose-200 to-orange-200",
  },
  {
    id: "flat-white",
    name: "Flat White",
    description: "Smooth ristretto with a creamy milk finish.",
    price: "$5.00",
    category: "Espresso",
    accent: "from-amber-100 to-amber-300",
  },
  {
    id: "cold-brew",
    name: "Cold Brew",
    description: "Slow-steeped, bright, and naturally sweet.",
    price: "$4.75",
    category: "Cold",
    accent: "from-sky-200 to-cyan-300",
  },
  {
    id: "matcha-oat",
    name: "Matcha Oat",
    description: "Ceremonial-grade matcha with oat milk.",
    price: "$5.25",
    category: "Non-Coffee",
    accent: "from-emerald-200 to-lime-300",
  },
  {
    id: "chai-cloud",
    name: "Chai Cloud",
    description: "Spiced chai with frothy milk and honey.",
    price: "$5.00",
    category: "Tea",
    accent: "from-yellow-200 to-orange-200",
  },
    {
    id: "skibidi-riz",
    name: "Riz Jizz",
    description: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA BIG CHUNGUS.",
    price: "$9.11",
    category: "Non-Coffee",
    accent: "from-green-200 to-red-200",
  },
];
