export type Foods = {
  id: number;
  name: string;
  rating: number;
  deliveryTime: string;
  price: number;
  image: string;
  restaurant: string;
  category: string;
};
export type RestaurantAndMeal = {
  id: number | string;
  restaurant: string;
  rating: number;
  deliveryTime: string;
  image: string;
  categories: string[];
};

export const FOOD_ITEMS = [
  {
    id: "1",
    title: "Suya Palace",
    rating: 4.8,
    deliveryTime: "12 min",
    startingPrice: 800,
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600",
  },
  {
    id: "2",
    title: "ChickenHub",
    rating: 4.8,
    deliveryTime: "18 min",
    startingPrice: 1200,
    image:
      "https://images.unsplash.com/photo-1527477396000-e27163b481c2?q=80&w=600",
  },
  {
    id: "3",
    title: "Frosty Gelato",
    rating: 4.8,
    deliveryTime: "10 min",
    startingPrice: 500,
    image:
      "https://i.pinimg.com/736x/6a/2f/fe/6a2ffe3c63a56f247506872de36e9218.jpg",
  },
  {
    id: "4",
    title: "Deco Kitchen",
    rating: 4.9,
    deliveryTime: "15 min",
    startingPrice: 1500,
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=600",
  },
  {
    id: "5",
    title: "Campus Grill & Shawarma",
    rating: 4.7,
    deliveryTime: "20 min",
    startingPrice: 1000,
    image:
      "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?q=80&w=600",
  },
  {
    id: "6",
    title: "Mama Ebo Pepper Rice",
    rating: 4.6,
    deliveryTime: "25 min",
    startingPrice: 900,
    image:
      "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=600",
  },
  {
    id: "7",
    title: "Buka Express",
    rating: 4.5,
    deliveryTime: "15 min",
    startingPrice: 700,
    image:
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=600",
  },
  {
    id: "8",
    title: "The Pizza Box",
    rating: 4.8,
    deliveryTime: "30 min",
    startingPrice: 2500,
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=600",
  },
  {
    id: "9",
    title: "Smoothie & Juice Bar",
    rating: 4.7,
    deliveryTime: "10 min",
    startingPrice: 600,
    image:
      "https://images.unsplash.com/photo-1553530666-ba11a7da3888?q=80&w=600",
  },
  {
    id: "10",
    title: "Royal Bites Pastries",
    rating: 4.9,
    deliveryTime: "14 min",
    startingPrice: 400,
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=600",
  },
];
export const RESTAURANTS_AND_MEALS: RestaurantAndMeal[] = [
  {
    id: 1,
    restaurant: "Iya Meta Food Canteen",
    rating: 4.8,
    deliveryTime: "20-30 min",
    image:
      "https://i.pinimg.com/736x/e2/6f/92/e26f921977e1636c4f3cda56b276c789.jpg",
    categories: ["Nigerian Food", "Local Dishes", "Buka", "Rice"],
  },
  {
    id: 2,
    restaurant: "Kilimanjaro",
    rating: 4.6,
    deliveryTime: "25-35 min",
    image:
      "https://i.pinimg.com/736x/fd/43/42/fd4342e0a9e8b6bf6fb23b63eccc314c.jpg",
    categories: ["Nigerian Food", "Rice", "Chicken", "Soup"],
  },
  {
    id: 3,
    restaurant: "Amala Skye (Bodija Mama Put)",
    rating: 4.9,
    deliveryTime: "15-25 min",
    image:
      "https://i.pinimg.com/736x/cc/40/70/cc40706d87a228edcedd79a033dea0ea.jpg",
    categories: [
      "Nigerian Food",
      "Jollof Rice",
      "Local Dishes",
      "Fried Chicken",
    ],
  },
  {
    id: 4,
    restaurant: "Sweetco Foods",
    rating: 4.5,
    deliveryTime: "20-30 min",
    image:
      "https://i.pinimg.com/736x/ec/e1/5c/ece15ce26398c6cb208992f9cd5d6411.jpg",
    categories: ["Pizza", "Fast Food", "Italian"],
  },
  {
    id: 5,
    restaurant: "Item 7go",
    rating: 4.7,
    deliveryTime: "15-20 min",
    image:
      "https://i.pinimg.com/736x/b4/20/bb/b420bb3ed2f985a2c16058a3a903bc18.jpg",
    categories: ["Drinks & Wines", "Snacks", "Smoothies", "Shawarma", "Rice"],
  },
  {
    id: 6,
    restaurant: "Tantalizers",
    rating: 4.3,
    deliveryTime: "25-40 min",
    image:
      "https://i.pinimg.com/736x/72/e6/92/72e69291131ea2f5a11f1be1abf79b34.jpg",
    categories: ["Snacks", "Shawarma", "Grill", "Fast Food"],
  },
  {
    id: 7,
    restaurant: "Mr Biggs",
    rating: 4.2,
    deliveryTime: "20-35 min",
    image:
      "https://i.pinimg.com/736x/13/d7/71/13d77124cd6e335f1819ed1fddab9a26.jpg",
    categories: ["Desserts", "Ice Cream", "Gelato"],
  },
  {
    id: 8,
    restaurant: "Moniya Suya Spot",
    rating: 4.8,
    deliveryTime: "15-30 min",
    image:
      "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?q=80&w=400&auto=format&fit=crop",
    categories: ["Nigerian Food", "Suya", "Grilled Meat", "Northern Cuisine"],
  },
  {
    id: 9,
    restaurant: "The Place Restaurant",
    rating: 4.4,
    deliveryTime: "20-30 min",
    image:
      "https://i.pinimg.com/736x/d7/ff/8c/d7ff8c0a61814346f91a8268044c6589.jpg",
    categories: ["Nigerian Food", "Buffet", "Efo", "Asun Jollof"],
  },
  {
    id: 10,
    restaurant: "Ibadan Buka Express",
    rating: 4.9,
    deliveryTime: "20-35 min",
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=400&auto=format&fit=crop",
    categories: ["Nigerian Food", "Pepper Rice", "Local Dishes", "Spicy"],
  },
  {
    id: 11,
    restaurant: "Ultima Foods",
    rating: 4.9,
    deliveryTime: "20-35 min",
    image:
      "https://i.pinimg.com/736x/d8/ea/d6/d8ead6cdcaedb04389d96b4740946a74.jpg",
    categories: [
      "Drinks & Wines",
      "Snacks",
      "QuickChops",
      "Drinks",
      "Fried Chicken",
    ],
  },
  {
    id: 12,
    restaurant: "Chicken Republic",
    rating: 4.9,
    deliveryTime: "20-35 min",
    image:
      "https://i.pinimg.com/736x/62/bf/82/62bf82515f37e01ad14ba1e13f850a6e.jpg",
    categories: ["Burgers", "Snacks", "Fried Chicken", "Fast Food", "Wings"],
  },
  {
    id: 13,
    restaurant: "Crunchies",
    rating: 4.9,
    deliveryTime: "20-35 min",
    image:
      "https://i.pinimg.com/736x/d7/01/6e/d7016e9ae5afe07a9c4374c6a319f587.jpg",
    categories: ["Desserts", "Snacks", "Pastries", "Bakery"],
  },
];
const POPULAR_ITEMS: Foods[] = [
  {
    id: 1,
    name: "Smokey Jollof Combo",
    restaurant: "Iya Meta Food Canteen",
    rating: 4.8,
    deliveryTime: "20-30 min",
    price: 4500,
    image:
      "https://i.pinimg.com/1200x/47/17/13/47171381ac44dce39b102b3024b63797.jpg",
    category: "Grocery",
  },
  {
    id: 2,
    name: "Party Jollof & Grilled Chicken",
    restaurant: "Kilimanjaro",
    rating: 4.9,
    deliveryTime: "25-35 min",
    price: 4200,
    image:
      "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=300&q=60",
    category: "Jollof",
  },
  {
    id: 3,
    name: "Native Jollof Rice (Iwuk Edesi)",
    restaurant: "Amala Skye (Bodija Mama Put)",
    rating: 4.7,
    deliveryTime: "20-35 min",
    price: 4800,
    image:
      "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=300&q=60",
    category: "Jollof",
  },
  {
    id: 4,
    name: "Smokey Jollof Rice with Asun",
    restaurant: "Sweetco Foods",
    rating: 4.9,
    deliveryTime: "25-35 min",
    price: 5200,
    image:
      "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=300&q=60",
    category: "Jollof",
  },
  {
    id: 5,
    name: "Basmati Jollof with Fried Fish",
    restaurant: "Item 7go",
    rating: 4.6,
    deliveryTime: "25-35 min",
    price: 4900,
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=300&q=60",
    category: "Jollof",
  },
  {
    id: 6,
    name: "Fire-Smoked Jollof Fiesta",
    restaurant: "Tantalizers",
    rating: 4.8,
    deliveryTime: "20-30 min",
    price: 4300,
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=300&q=60",
    category: "Jollof",
  },
  {
    id: 7,
    name: "Smokey Jollof & Beef Suya Combo",
    restaurant: "Mr Biggs",
    rating: 4.8,
    deliveryTime: "25-35 min",
    price: 4900,
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=300&q=60",
    category: "Jollof",
  },
  {
    id: 8,
    name: "Garnished Party Jollof Rice",
    restaurant: "Moniya Suya Spot",
    rating: 4.7,
    deliveryTime: "20-30 min",
    price: 4000,
    image:
      "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=300&q=60",
    category: "Jollof",
  },
  {
    id: 9,
    name: "Special Suya Platter",
    restaurant: "The Place Restaurant ",
    rating: 4.9,
    deliveryTime: "15-25 min",
    price: 6200,
    image:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=300&q=60",
    category: "Special",
  },
  {
    id: 10,
    name: "Peppered Snail & Plantain",
    restaurant: "Ibadan Buka Express",
    rating: 4.8,
    deliveryTime: "25-35 min",
    price: 8000,
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=300&q=60",
    category: "Special",
  },
  {
    id: 11,
    name: "Spicy Goat Meat Suya",
    restaurant: "Ultima Foods",
    rating: 4.9,
    deliveryTime: "15-30 min",
    price: 5500,
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=300&q=60",
    category: "Special",
  },
  {
    id: 12,
    name: "Chef Special Grill Board",
    restaurant: "Chicken Republic",
    rating: 4.9,
    deliveryTime: "30-45 min",
    price: 12000,
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=300&q=60",
    category: "Special",
  },
  {
    id: 13,
    name: "Spicy Chicken Suya Skewers",
    restaurant: "Crunchies",
    rating: 4.7,
    deliveryTime: "15-25 min",
    price: 4500,
    image:
      "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=300&q=60",
    category: "Special",
  },
  {
    id: 14,
    name: "Special Fish Suya",
    restaurant: "Iya Meta Food Canteen",
    rating: 4.8,
    deliveryTime: "20-30 min",
    price: 6000,
    image:
      "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=300&q=60",
    category: "Special",
  },
  {
    id: 15,
    name: "Special Nkwobi Pot",
    restaurant: "Kilimanjaro",
    rating: 4.9,
    deliveryTime: "25-35 min",
    price: 6500,
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=300&q=60",
    category: "Special",
  },
  {
    id: 16,
    name: "Special Peppered Ram Meat",
    restaurant: "Amala Skye (Bodija Mama Put)",
    rating: 4.9,
    deliveryTime: "20-30 min",
    price: 7500,
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=300&q=60",
    category: "Special",
  },
  {
    id: 17,
    name: "Gourmet Beef Burger",
    restaurant: "Sweetco Foods",
    rating: 4.6,
    deliveryTime: "25-35 min",
    price: 3800,
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=300&q=60",
    category: "Burger",
  },
  {
    id: 18,
    name: "Double Cheese Bacon Burger",
    restaurant: "Item 7go",
    rating: 4.7,
    deliveryTime: "25-35 min",
    price: 4500,
    image:
      "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?auto=format&fit=crop&w=300&q=60",
    category: "Burger",
  },
  {
    id: 19,
    name: "Crispy Zesty Chicken Burger",
    restaurant: "Tantalizers",
    rating: 4.6,
    deliveryTime: "20-30 min",
    price: 4000,
    image:
      "https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=300&q=60",
    category: "Burger",
  },
  {
    id: 20,
    name: "Veggie Loaded Supreme Burger",
    restaurant: "Mr Biggs",
    rating: 4.3,
    deliveryTime: "20-30 min",
    price: 3500,
    image:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=300&q=60",
    category: "Burger",
  },
  {
    id: 21,
    name: "Triple Patty Smash Burger",
    restaurant: "Moniya Suya Spot",
    rating: 4.9,
    deliveryTime: "25-35 min",
    price: 5400,
    image:
      "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=300&q=60",
    category: "Burger",
  },
  {
    id: 22,
    name: "Crispy BBQ Bacon Burger",
    restaurant: "The Place Restaurant ",
    rating: 4.7,
    deliveryTime: "20-30 min",
    price: 4600,
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=300&q=60",
    category: "Burger",
  },
  {
    id: 23,
    name: "Mushroom & Swiss Beef Burger",
    restaurant: "Ibadan Buka Express",
    rating: 4.4,
    deliveryTime: "25-35 min",
    price: 4200,
    image:
      "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?auto=format&fit=crop&w=300&q=60",
    category: "Burger",
  },
  {
    id: 24,
    name: "Pounded Yam & Egusi",
    restaurant: "Ultima Foods",
    rating: 4.7,
    deliveryTime: "30-40 min",
    price: 5000,
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=300&q=60",
    category: "Swallow",
  },
  {
    id: 25,
    name: "Amala with Efo Riro & Goat Meat",
    restaurant: "Chicken Republic",
    rating: 4.8,
    deliveryTime: "25-40 min",
    price: 4600,
    image:
      "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=300&q=60",
    category: "Swallow",
  },
  {
    id: 26,
    name: "Semo & Ogbono Soup Platter",
    restaurant: "Crunchies",
    rating: 4.5,
    deliveryTime: "30-40 min",
    price: 4700,
    image:
      "https://images.unsplash.com/photo-1547496592-146d4?auto=format&fit=crop&w=300&q=60",
    category: "Swallow",
  },
  {
    id: 27,
    name: "Wheat Swallow & Afang Soup",
    restaurant: "Iya Meta Food Canteen",
    rating: 4.7,
    deliveryTime: "30-40 min",
    price: 5300,
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=300&q=60",
    category: "Swallow",
  },
  {
    id: 28,
    name: "Eba & Fresh Fish Okra Soup",
    restaurant: "Kilimanjaro",
    rating: 4.7,
    deliveryTime: "30-40 min",
    price: 4500,
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=300&q=60",
    category: "Swallow",
  },
  {
    id: 29,
    name: "Starch & Banga Soup Special",
    restaurant: "Amala Skye (Bodija Mama Put)",
    rating: 4.8,
    deliveryTime: "30-45 min",
    price: 5800,
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=300&q=60",
    category: "Swallow",
  },
  {
    id: 30,
    name: "Pounded Yam & Edikang Ikong",
    restaurant: "Sweetco Foods",
    rating: 4.9,
    deliveryTime: "30-45 min",
    price: 5500,
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=300&q=60",
    category: "Swallow",
  },
  {
    id: 31,
    name: "Crispy Fried Chicken Bucket",
    restaurant: "Item 7go",
    rating: 4.5,
    deliveryTime: "20-30 min",
    price: 7500,
    image:
      "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=300&q=60",
    category: "Chicken",
  },
  {
    id: 32,
    name: "BBQ Chicken Wings & Fries",
    restaurant: "Tantalizers",
    rating: 4.5,
    deliveryTime: "20-30 min",
    price: 5200,
    image:
      "https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=300&q=60",
    category: "Chicken",
  },
  {
    id: 33,
    name: "Grilled Peppered Chicken Wings",
    restaurant: "Mr Biggs",
    rating: 4.6,
    deliveryTime: "20-30 min",
    price: 4200,
    image:
      "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=300&q=60",
    category: "Chicken",
  },
  {
    id: 34,
    name: "Whole Roasted Peri-Peri Chicken",
    restaurant: "Moniya Suya Spot",
    rating: 4.8,
    deliveryTime: "30-45 min",
    price: 9000,
    image:
      "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=300&q=60",
    category: "Chicken",
  },
  {
    id: 35,
    name: "Southern Fried Chicken Tenders",
    restaurant: "The Place Restaurant ",
    rating: 4.4,
    deliveryTime: "15-25 min",
    price: 3800,
    image:
      "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=300&q=60",
    category: "Chicken",
  },
  {
    id: 36,
    name: "Honey Glazed Grilled Chicken",
    restaurant: "Ibadan Buka Express",
    rating: 4.7,
    deliveryTime: "20-30 min",
    price: 4800,
    image:
      "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=300&q=60",
    category: "Chicken",
  },
  {
    id: 37,
    name: "Spicy Fried Chicken Strip Bucket",
    restaurant: "Ultima Foods",
    rating: 4.6,
    deliveryTime: "15-25 min",
    price: 6800,
    image:
      "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=300&q=60",
    category: "Chicken",
  },
  {
    id: 38,
    name: "Wood-Fired Pepperoni Pizza",
    restaurant: "Chicken Republic",
    rating: 4.6,
    deliveryTime: "30-45 min",
    price: 6800,
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=300&q=60",
    category: "Pizza",
  },
  {
    id: 39,
    name: "BBQ Chicken Pizza",
    restaurant: "Crunchies",
    rating: 4.7,
    deliveryTime: "30-40 min",
    price: 7200,
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=300&q=60",
    category: "Pizza",
  },
  {
    id: 40,
    name: "Four Cheese Margherita Pizza",
    restaurant: "Iya Meta Food Canteen",
    rating: 4.5,
    deliveryTime: "25-35 min",
    price: 6000,
    image:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=300&q=60",
    category: "Pizza",
  },
  {
    id: 41,
    name: "Classic Pepperoni Pizza Box",
    restaurant: "Kilimanjaro",
    rating: 4.8,
    deliveryTime: "25-40 min",
    price: 6500,
    image:
      "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=300&q=60",
    category: "Pizza",
  },
  {
    id: 42,
    name: "Spicy Meatball Pizza",
    restaurant: "Amala Skye (Bodija Mama Put)",
    rating: 4.5,
    deliveryTime: "30-40 min",
    price: 6900,
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=300&q=60",
    category: "Pizza",
  },
  {
    id: 43,
    name: "Meat Lovers Supreme Pizza",
    restaurant: "Sweetco Foods",
    rating: 4.8,
    deliveryTime: "30-40 min",
    price: 7800,
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=300&q=60",
    category: "Pizza",
  },
  {
    id: 44,
    name: "Buffalo Chicken Pizza",
    restaurant: "Item 7go",
    rating: 4.6,
    deliveryTime: "30-45 min",
    price: 7000,
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=300&q=60",
    category: "Pizza",
  },
  {
    id: 45,
    name: "Grilled Catfish Pepper Soup",
    restaurant: "Tantalizers",
    rating: 4.9,
    deliveryTime: "35-50 min",
    price: 9500,
    image:
      "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=300&q=60",
    category: "Pepper Soup",
  },
  {
    id: 46,
    name: "Seafood Pepper Soup",
    restaurant: "Mr Biggs",
    rating: 4.8,
    deliveryTime: "30-45 min",
    price: 8500,
    image:
      "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=300&q=60",
    category: "Pepper Soup",
  },
  {
    id: 47,
    name: "Goat Meat Pepper Soup",
    restaurant: "Moniya Suya Spot",
    rating: 4.8,
    deliveryTime: "25-35 min",
    price: 5500,
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=300&q=60",
    category: "Pepper Soup",
  },
  {
    id: 48,
    name: "Assorted Meat Pepper Soup",
    restaurant: "The Place Restaurant ",
    rating: 4.6,
    deliveryTime: "20-30 min",
    price: 4800,
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=300&q=60",
    category: "Pepper Soup",
  },
  {
    id: 49,
    name: "Fresh Tilapia Pepper Soup",
    restaurant: "Ibadan Buka Express",
    rating: 4.7,
    deliveryTime: "30-45 min",
    price: 7000,
    image:
      "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=300&q=60",
    category: "Pepper Soup",
  },
  {
    id: 50,
    name: "Croaker Fish Pepper Soup",
    restaurant: "Ultima Foods",
    rating: 4.7,
    deliveryTime: "30-45 min",
    price: 8800,
    image:
      "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=300&q=60",
    category: "Pepper Soup",
  },
  {
    id: 51,
    name: "Cow Tail Pepper Soup",
    restaurant: "Chicken Republic",
    rating: 4.8,
    deliveryTime: "30-40 min",
    price: 6000,
    image:
      "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=300&q=60",
    category: "Pepper Soup",
  },
  {
    id: 52,
    name: "Spicy Shawarma Supreme",
    restaurant: "Crunchies",
    rating: 4.4,
    deliveryTime: "15-20 min",
    price: 2500,
    image:
      "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=300&q=60",
    category: "Shawarma",
  },
  {
    id: 53,
    name: "Chicken Shawarma with Sausage",
    restaurant: "Iya Meta Food Canteen",
    rating: 4.6,
    deliveryTime: "15-25 min",
    price: 3000,
    image:
      "https://images.unsplash.com/photo-1561651823-34feb02250e4?auto=format&fit=crop&w=300&q=60",
    category: "Shawarma",
  },
  {
    id: 54,
    name: "Beef Shawarma Deluxe",
    restaurant: "Kilimanjaro",
    rating: 4.5,
    deliveryTime: "15-25 min",
    price: 2800,
    image:
      "https://images.unsplash.com/photo-1561651823-34feb02250e4?auto=format&fit=crop&w=300&q=60",
    category: "Shawarma",
  },
  {
    id: 55,
    name: "Mixed Meat Shawarma Wrap",
    restaurant: "Amala Skye (Bodija Mama Put)",
    rating: 4.7,
    deliveryTime: "15-20 min",
    price: 3200,
    image:
      "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=300&q=60",
    category: "Shawarma",
  },
  {
    id: 56,
    name: "Jumbo Chicken Shawarma Roll",
    restaurant: "Sweetco Foods",
    rating: 4.6,
    deliveryTime: "15-20 min",
    price: 3500,
    image:
      "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=300&q=60",
    category: "Shawarma",
  },
  {
    id: 57,
    name: "Cheese Garlic Shawarma",
    restaurant: "Item 7go",
    rating: 4.5,
    deliveryTime: "15-20 min",
    price: 3300,
    image:
      "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=300&q=60",
    category: "Shawarma",
  },
  {
    id: 58,
    name: "Double Meat Chicken Shawarma",
    restaurant: "Tantalizers",
    rating: 4.6,
    deliveryTime: "15-25 min",
    price: 3600,
    image:
      "https://images.unsplash.com/photo-1561651823-34feb02250e4?auto=format&fit=crop&w=300&q=60",
    category: "Shawarma",
  },
  {
    id: 59,
    name: "Asun Fried Rice Box",
    restaurant: "Mr Biggs",
    rating: 4.7,
    deliveryTime: "20-30 min",
    price: 4800,
    image:
      "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=300&q=60",
    category: "Rice",
  },
  {
    id: 60,
    name: "Special Seafood Fried Rice",
    restaurant: "Moniya Suya Spot",
    rating: 4.8,
    deliveryTime: "25-35 min",
    price: 6500,
    image:
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=300&q=60",
    category: "Rice",
  },
  {
    id: 61,
    name: "Coconut Fried Rice & Prawns",
    restaurant: "The Place Restaurant ",
    rating: 4.9,
    deliveryTime: "30-40 min",
    price: 5800,
    image:
      "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&w=300&q=60",
    category: "Rice",
  },
  {
    id: 62,
    name: "Special Fried Rice & Turkey",
    restaurant: "Ibadan Buka Express",
    rating: 4.8,
    deliveryTime: "25-35 min",
    price: 5500,
    image:
      "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=300&q=60",
    category: "Rice",
  },
  {
    id: 63,
    name: "Ofada Rice & Spicy Stew",
    restaurant: "Ultima Foods",
    rating: 4.9,
    deliveryTime: "25-40 min",
    price: 5000,
    image:
      "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=300&q=60",
    category: "Rice",
  },
  {
    id: 64,
    name: "Chinese Fried Rice & Chili Chicken",
    restaurant: "Chicken Republic",
    rating: 4.6,
    deliveryTime: "20-35 min",
    price: 5400,
    image:
      "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=300&q=60",
    category: "Rice",
  },
  {
    id: 65,
    name: "Egg Fried Rice & Grilled Pork",
    restaurant: "Crunchies",
    rating: 4.7,
    deliveryTime: "25-35 min",
    price: 5200,
    image:
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=300&q=60",
    category: "Rice",
  },
];

export default POPULAR_ITEMS;
