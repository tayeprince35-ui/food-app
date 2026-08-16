type Foods = {
  id: number;
  name: string;
  rating: number;
  deliveryTime: string;
  price: number;
  image: string;
  restaurant: string;
  category: string;
};
const POPULAR_ITEMS: Foods[] = [
  {
    id: 1,
    name: 'Smokey Jollof Combo',
    restaurant: 'Taste of Lagos',
    rating: 4.8,
    deliveryTime: '20-30 min',
    price: 4500,
    image:
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
    category: 'Jollof',
  },
  {
    id: 2,
    name: 'Special Suya Platter',
    restaurant: 'Suya Spot',
    rating: 4.9,
    deliveryTime: '15-25 min',
    price: 6200,
    image:
      'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80',
    category: 'Special',
  },
  {
    id: 3,
    name: 'Gourmet Beef Burger',
    restaurant: 'Burger Hub',
    rating: 4.6,
    deliveryTime: '25-35 min',
    price: 3800,
    image:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
    category: 'Burger',
  },
  {
    id: 4,
    name: 'Pounded Yam & Egusi',
    restaurant: 'Buka Express',
    rating: 4.7,
    deliveryTime: '30-40 min',
    price: 5000,
    image:
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80',
    category: 'Swallow',
  },
  {
    id: 5,
    name: 'Crispy Fried Chicken Bucket',
    restaurant: 'Crunchy Bites',
    rating: 4.5,
    deliveryTime: '20-30 min',
    price: 7500,
    image:
      'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=600&q=80',
    category: 'Chicken',
  },
  {
    id: 6,
    name: 'Peppered Snail & Plantain',
    restaurant: 'Chop Town',
    rating: 4.8,
    deliveryTime: '25-35 min',
    price: 8000,
    image:
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
    category: 'Special',
  },
  {
    id: 7,
    name: 'Wood-Fired Pepperoni Pizza',
    restaurant: 'Pizza Artisan',
    rating: 4.6,
    deliveryTime: '30-45 min',
    price: 6800,
    image:
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
    category: 'Pizza',
  },
  {
    id: 8,
    name: 'Grilled Catfish Pepper Soup',
    restaurant: 'Ocean Delight',
    rating: 4.9,
    deliveryTime: '35-50 min',
    price: 9500,
    image:
      'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80',
    category: 'Pepper Soup',
  },
  {
    id: 9,
    name: 'Spicy Shawarma Supreme',
    restaurant: 'Wrap & Roll',
    rating: 4.4,
    deliveryTime: '15-20 min',
    price: 2500,
    image:
      'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=600&q=80',
    category: 'Sharwama',
  },
  {
    id: 10,
    name: 'Asun Fried Rice Box',
    restaurant: 'Wok & Grills',
    rating: 4.7,
    deliveryTime: '20-30 min',
    price: 4800,
    image:
      'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=600&q=80',
    category: 'Rice',
  },
];
export default POPULAR_ITEMS;
