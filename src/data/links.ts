// Nav Links
export const navLinks = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Shop",
    href: "/shop",
  },
  {
    name: "About",
    href: "/about",
  },
  {
    name: "Contact",
    href: "/contact",
  },
];

export const categoriesLinks = [
  {
    name: "All Products",
    href: "/shop?",
  },
  {
    name: "Electronics",
    href: `/shop?c=${encodeURIComponent("electronics")}`,
  },
  {
    name: "Fashion",
    href: `/shop?c=${encodeURIComponent("fashion")}`,
  },
  {
    name: "Furniture",
    href: `/shop?c=${encodeURIComponent("furniture")}`,
  },
  {
    name: "Accessories",
    href: `/shop?c=${encodeURIComponent("accessories")}`,
  },
  {
    name: "Health & Wellness",
    href: `/shop?c=${encodeURIComponent("health & wellness")}`,
  },
  {
    name: "Home & Kitchen",
    href: `/shop?c=${encodeURIComponent("home & kitchen")}`,
  },
  {
    name: "Groceries",
    href: `/shop?c=${encodeURIComponent("groceries")}`,
  },
  {
    name: "Beauty & Personal Care",
    href: `/shop?c=${encodeURIComponent("beauty & personal care")}`,
  },
  {
    name: "Baby & Kids",
    href: `/shop?c=${encodeURIComponent("baby & kids")}`,
  },
  {
    name: "Sports & Outdoor",
    href: `/shop?c=${encodeURIComponent("sports & outdoor")}`,
  },
  {
    name: "Automotive",
    href: `/shop?c=${encodeURIComponent("automotive")}`,
  },
];

export const priceLinks = [
    {
      price: 'All Prices',
      href: '',
    },
    {
      price: '$0.00 - $99.99',
      href: `min=0&max=99`,
    },
    {
      price: '$100.00 - $199.99',
      href: 'min=100&max=199',
    },
    {
      price: '$200.00 - $299.99',
      href: 'min=200&max=299',
    },
    {
      price: '$300.00 - $399.99',
      href: 'min=300&max=399',
    },
    {
      price: '$400.00 - $499.99',
      href: 'min=400&max=499',
    },
    {
      price: '$500.00 & Above',
      href: 'min=500&max=1000000000',
    },
  ];

