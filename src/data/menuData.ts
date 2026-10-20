export interface CustomizationOption {
  name: string;
  choices: string[];
  defaultChoice?: string;
  extraPriceMap?: Record<string, number>;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  isVegetarian: boolean;
  image: string;
  isCustomizable: boolean;
  customizationOptions?: CustomizationOption[];
}

export const CATEGORIES = [
  'All',
  'Usual Suspects',
  'Coffee',
  'Hot Signature Coffee',
  'Dip Teas',
  'Manual Brew',
  'Cold Brew',
  'Nitro Cold Brew',
  'Iced Coffee',
  'Iced Signature Coffee',
  'Frappucino',
  'Signature Frappucino',
  'Mojito & Iced Tea',
  'Tea',
  'Mocktails',
  'Shakes',
  'Thick Shakes',
  'Affogato',
  'Special Menu',
  'Soup',
  "Avocado Lover's",
  'Salad',
  'All Day Breakfast',
  'Kafa Recommended Breakfast',
  'Waffles',
  'Quick Bites',
  'Small Plates - Kafa Recomends',
  'Sushi',
  'Momo And Dimsum',
  'Wood Fired Pizza, 12" Thin Crust',
  'Sandwiches, Wraps, Burger And Klub',
  'Pasta',
  'Large Plates And Bowls',
  "Kid's Menu",
  'Appetizer',
  'Mini Chinese',
  'Off The Grill',
  'Continental Rice Bowl',
  'Oriental Rice Bowl',
  'Pancakes',
  'Brownie',
  'Add On',
  'Desserts',
  'Bakery & Pastries',
  'Savory Bites'
] as const;

export type Category = typeof CATEGORIES[number];

export const MENU_ITEMS: MenuItem[] = [
  // --- SALAD ---
  {
    id: 'sld1',
    name: 'Veg Kafa Caesar',
    description: 'Mixed Lettuce, Sundried Tomatoes, Olives And Parmesan Caesar Dressing',
    price: 379,
    category: 'Salad',
    isVegetarian: true,
    image: '/veg-kafa-caesar.png',
    isCustomizable: false
  },
  {
    id: 'sld2',
    name: 'Chicken Kafa Caesar',
    description: 'Mixed Lettuce, Sundried Tomatoes, Olives And Parmesan Caesar Dressing',
    price: 419,
    category: 'Salad',
    isVegetarian: false,
    image: '/chicken-kafa-caesar.jpg',
    isCustomizable: false
  },
  {
    id: 'sld3',
    name: 'Veg Chopped Taco Salad',
    description: 'American Corn, Sweet Peppers, Cherry Tomatoes, Black Beans, Mexican Salsa & Sour Cream',
    price: 379,
    category: 'Salad',
    isVegetarian: true,
    image: '/veg-chopped-taco-salad.jpg',
    isCustomizable: false
  },
  {
    id: 'sld4',
    name: 'Chicken Chopped Taco Salad',
    description: 'American Corn, Sweet Peppers, Cherry Tomatoes, Black Beans, Mexican Salsa & Sour Cream',
    price: 419,
    category: 'Salad',
    isVegetarian: false,
    image: '/chicken-chopped-taco-salad.png',
    isCustomizable: false
  },
  {
    id: 'sld5',
    name: 'Avacado Shrimp Salad',
    description: '[Shrimp Preparation]',
    price: 399,
    category: 'Salad',
    isVegetarian: false,
    image: '/avacado-shrimp-salad.jpg',
    isCustomizable: false
  },
  {
    id: 'sld6',
    name: 'Water Mellown And Feta Salad',
    description: 'Juicy watermelon cubes, crumbled feta, fresh mint, and balsamic glaze.',
    price: 299,
    category: 'Salad',
    isVegetarian: true,
    image: '/watermelon-feta-salad.jpg',
    isCustomizable: false
  },
  // --- ALL DAY BREAKFAST ---
  {
    id: 'adb1',
    name: 'Istanbul Poached Eggs',
    description: 'Tzatziki, Chili Oil, Chimichurri, Pinenuts',
    price: 379,
    category: 'All Day Breakfast',
    isVegetarian: false,
    image: '/istanbul-poached-eggs.png',
    isCustomizable: false
  },
  {
    id: 'adb2',
    name: '3 Egg Scramble',
    description: 'Mixed Mushrooms And Thyme',
    price: 379,
    category: 'All Day Breakfast',
    isVegetarian: false,
    image: '/3-egg-scramble.png',
    isCustomizable: false
  },
  {
    id: 'adb3',
    name: 'Skillet Arabic Shakshuka',
    description: '[Chicken Preparation] Ras El Hanout Spice, Fried Eggs, Toast',
    price: 379,
    category: 'All Day Breakfast',
    isVegetarian: false,
    image: '/skillet-arabic-shakshuka.jpg',
    isCustomizable: false
  },
  {
    id: 'adb4',
    name: 'Step Oven Italian Fritata',
    description: 'Potatoes, Onion, Tomato, Peppers, Spinach',
    price: 379,
    category: 'All Day Breakfast',
    isVegetarian: false,
    image: '/step-oven-italian-frittata.jpg',
    isCustomizable: false
  },
  {
    id: 'adb5',
    name: 'Egg White Omlette',
    description: '3 Eggs Folded, Toast',
    price: 349,
    category: 'All Day Breakfast',
    isVegetarian: false,
    image: '/egg-white-omelette.jpg',
    isCustomizable: false
  },
  {
    id: 'adb6',
    name: 'Masala French Fold Omlette',
    description: 'Spiced 3 egg fold, Served with Toast',
    price: 349,
    category: 'All Day Breakfast',
    isVegetarian: false,
    image: '/masala-french-fold-omelette.jpg',
    isCustomizable: false
  },
  // --- KAFA RECOMMENDED BREAKFAST ---
  {
    id: 'krb1',
    name: 'Breakfast Egg Burrito',
    description: 'Scrambled Egg, Hash Brown, Salsa, Arugula, Cheese, Baked Beans',
    price: 389,
    category: 'Kafa Recommended Breakfast',
    isVegetarian: false,
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=800&q=80',
    isCustomizable: false
  },
  {
    id: 'krb2',
    name: 'Kejriwal Eggs Bennedict',
    description: 'Toasted Buns, Spiced Fried Eggs, Hollandaise, Spicy Cheese, Chimichurri',
    price: 399,
    category: 'Kafa Recommended Breakfast',
    isVegetarian: false,
    image: 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?auto=format&fit=crop&w=800&q=80',
    isCustomizable: false
  },
  {
    id: 'krb3',
    name: 'Everything Waffle',
    description: 'Scrambled Eggs, Chicken Sausage, Chicken Ham, Crispy Bacon, Hash Brown, American Corn, Hot Sauce, Toast, Guacamole, Tomato Salsa, Cheddar Cheese And Jalapeno',
    price: 449,
    category: 'Kafa Recommended Breakfast',
    isVegetarian: false,
    image: 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&w=800&q=80',
    isCustomizable: false
  },
  {
    id: 'krb4',
    name: 'Breakfast For Champions',
    description: 'Eggs Of Your Choice, Hash Brown, Baked Beans, Sauted Mushrooms, Grilled Chicken Sausages, Ham And Toast',
    price: 449,
    category: 'Kafa Recommended Breakfast',
    isVegetarian: false,
    image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=800&q=80',
    isCustomizable: true,
    customizationOptions: [
      {
        name: 'Breakfast For Champions',
        choices: ['Boiled Eggs', 'Omlette', 'Fried Eggs'],
        defaultChoice: 'Boiled Eggs'
      }
    ]
  },
  // --- WAFFLES ---
  {
    id: 'wf1',
    name: 'Classsic Fruit Waffles',
    description: 'Fresh Fruit, Melted Butter, Pancake Syrup',
    price: 249,
    category: 'Waffles',
    isVegetarian: true,
    image: '/classic-fruit-waffle.jpg',
    isCustomizable: false
  },
  {
    id: 'wf2',
    name: 'Chicken And Waffle',
    description: 'Hot Gochugaru Honey',
    price: 289,
    category: 'Waffles',
    isVegetarian: false,
    image: '/chicken-and-waffle.jpg',
    isCustomizable: false
  },
  // --- QUICK BITES ---
  {
    id: 'qb1',
    name: 'Salted French Fries',
    description: 'Classic salted crispy French fries',
    price: 225,
    category: 'Quick Bites',
    isVegetarian: true,
    image: '/salted-french-fries.png',
    isCustomizable: false
  },
  {
    id: 'qb2',
    name: 'Peri Peri French Fries',
    description: 'Crispy French fries tossed in zesty peri peri spice mix',
    price: 245,
    category: 'Quick Bites',
    isVegetarian: true,
    image: '/peri-peri-french-fries.png',
    isCustomizable: false
  },
  {
    id: 'qb3',
    name: 'Garlic Bread Toasted',
    description: 'Crispy toasted baguette brushed with garlic herb butter',
    price: 225,
    category: 'Quick Bites',
    isVegetarian: true,
    image: '/garlic-bread-toasted.jpg',
    isCustomizable: false
  },
  {
    id: 'qb4',
    name: 'Garlic Bread With Cheese',
    description: 'Toasted garlic bread topped with rich melted cheese',
    price: 275,
    category: 'Quick Bites',
    isVegetarian: true,
    image: '/garlic-bread-with-cheese.jpg',
    isCustomizable: false
  },
  // --- SMALL PLATES - KAFA RECOMENDS ---
  {
    id: 'spk1',
    name: 'Korean Cheese Buns',
    description: 'Cream Cheese Filling, Garlic Butter, Baked',
    price: 399,
    category: 'Small Plates - Kafa Recomends',
    isVegetarian: true,
    image: '/korean-cheese-buns.png',
    isCustomizable: false
  },
  {
    id: 'spk2',
    name: 'Cheese Fully Loaded Fries',
    description: 'Crispy fries smothered in rich warm cheese sauce',
    price: 319,
    category: 'Small Plates - Kafa Recomends',
    isVegetarian: true,
    image: '/cheese-fully-loaded-fries.jpg',
    isCustomizable: false
  },
  {
    id: 'spk3',
    name: 'Cheese And Peri-Peri Fully Loaded Fries',
    description: 'Crispy fries loaded with cheese and spicy peri-peri seasoning',
    price: 349,
    category: 'Small Plates - Kafa Recomends',
    isVegetarian: true,
    image: '/cheese-and-peri-peri-fully-loaded-fries.png',
    isCustomizable: false
  },
  {
    id: 'spk4',
    name: 'Chicken And Cheese Fully Loaded Fries',
    description: 'Crispy fries topped with seasoned chicken and melted cheese',
    price: 399,
    category: 'Small Plates - Kafa Recomends',
    isVegetarian: false,
    image: '/chicken-and-cheese-fully-loaded-fries.png',
    isCustomizable: false
  },
  {
    id: 'spk5',
    name: 'Sri Lankan Curried Cottage Cheese',
    description: 'Tamil Curry Powder, Lemongrass, Curry Leaves, Piquant Coconut-Peanut Butter Sauce',
    price: 429,
    category: 'Small Plates - Kafa Recomends',
    isVegetarian: true,
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80',
    isCustomizable: false
  },
  {
    id: 'spk6',
    name: 'Veg Baked Nachos',
    description: 'Beans, Corn, Jalapeno, Salsa, Sour Cream And Cheese Sauce',
    price: 379,
    category: 'Small Plates - Kafa Recomends',
    isVegetarian: true,
    image: '/veg-baked-nachos.png',
    isCustomizable: false
  },
  {
    id: 'spk7',
    name: 'Chicken Baked Nachos',
    description: 'Beans, Corn, Jalapeno, Salsa, Sour Cream And Cheese Sauce',
    price: 399,
    category: 'Small Plates - Kafa Recomends',
    isVegetarian: false,
    image: '/chicken-baked-nachos.jpg',
    isCustomizable: false
  },
  {
    id: 'spk8',
    name: 'Grilled Chipotle Paneer Mexican Tacos',
    description: 'Enchilada Sauce, Sour Cream, Fresh Salsa',
    price: 389,
    category: 'Small Plates - Kafa Recomends',
    isVegetarian: true,
    image: '/grilled-chipotle-paneer-mexican-tacos.png',
    isCustomizable: false
  },
  {
    id: 'spk9',
    name: 'Chicken And Cheese Mexican Tacos',
    description: 'Enchilada Sauce, Sour Cream, Fresh Salsa',
    price: 409,
    category: 'Small Plates - Kafa Recomends',
    isVegetarian: false,
    image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=800&q=80',
    isCustomizable: false
  },
  {
    id: 'spk10',
    name: 'Fajita Vegetables And Salsa Quesados',
    description: 'Chili Cheese, Mexican Bean, And Sour Cream',
    price: 389,
    category: 'Small Plates - Kafa Recomends',
    isVegetarian: true,
    image: 'https://images.unsplash.com/photo-1618040996337-56904b7850b9?auto=format&fit=crop&w=800&q=80',
    isCustomizable: false
  },
  {
    id: 'spk11',
    name: 'Pulled Chicken And Jalapeno Quesados',
    description: 'Chili Cheese, Mexican Bean, And Sour Cream',
    price: 419,
    category: 'Small Plates - Kafa Recomends',
    isVegetarian: false,
    image: 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?auto=format&fit=crop&w=800&q=80',
    isCustomizable: false
  },
  {
    id: 'spk12',
    name: 'French Chicken Croquettes',
    description: 'Pulled Chicken, Fine Herbs, Cheese, 3 Mustard Dip',
    price: 429,
    category: 'Small Plates - Kafa Recomends',
    isVegetarian: false,
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80',
    isCustomizable: false
  },
  {
    id: 'spk13',
    name: 'Crispy Peri-Peri Wings',
    description: 'Breaded Chicken, African Chillispice Mix, Ranch Dressing',
    price: 449,
    category: 'Small Plates - Kafa Recomends',
    isVegetarian: false,
    image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=800&q=80',
    isCustomizable: false
  },
  {
    id: 'spk14',
    name: 'Tokyo Street Okonomiyaki',
    description: 'Japanese Chicken And Shitake Pancake, Kewpie Mayo And Asian Barbeque Ketchup',
    price: 449,
    category: 'Small Plates - Kafa Recomends',
    isVegetarian: false,
    image: '/tokyo-street-okonomiyaki.jpg',
    isCustomizable: false
  },
  {
    id: 'spk15',
    name: 'Fish And Chips',
    description: 'Fried Basa, Panko Crumbs, Tartare Sauce',
    price: 479,
    category: 'Small Plates - Kafa Recomends',
    isVegetarian: false,
    image: '/fish-and-chips.jpg',
    isCustomizable: false
  },
  {
    id: 'spk16',
    name: 'Blackened Fish',
    description: 'Cajun Spiced, Garlic Lemon Butter Sauce',
    price: 479,
    category: 'Small Plates - Kafa Recomends',
    isVegetarian: false,
    image: '/blackened-fish.jpg',
    isCustomizable: false
  },
  // --- SUSHI ---
  {
    id: 'su1',
    name: 'Avocado And Cheese Uramaki',
    description: 'Cream Cheese',
    price: 549,
    category: 'Sushi',
    isVegetarian: true,
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80',
    isCustomizable: false
  },
  {
    id: 'su2',
    name: 'Pistachio - Honey Roll',
    description: 'Hot Honey, Pistachio Crust',
    price: 579,
    category: 'Sushi',
    isVegetarian: true,
    image: '/pistachio-honey-roll.png',
    isCustomizable: false
  },
  {
    id: 'su3',
    name: 'Mushroom Maki',
    description: 'Mixed Mushrooms, Teriyaki Sauce',
    price: 549,
    category: 'Sushi',
    isVegetarian: true,
    image: '/mushroom-maki.png',
    isCustomizable: false
  },
  {
    id: 'su4',
    name: 'Tempura Roll',
    description: 'Sriracha Mayo, Hot Sauce, Tanuki',
    price: 549,
    category: 'Sushi',
    isVegetarian: true,
    image: '/tempura-roll.jpg',
    isCustomizable: false
  },
  {
    id: 'su5',
    name: 'Chicken Salad Uramaki',
    description: 'Jalapeno, Pulled Chicken, Kewpie Mayo',
    price: 579,
    category: 'Sushi',
    isVegetarian: false,
    image: '/chicken-salad-uramaki.jpg',
    isCustomizable: false
  },
  {
    id: 'su6',
    name: 'Crispy Chicken Roll Sushi',
    description: 'Fried Chicken, Hot Sauce, Mayo, Oyster-Sesame Sauce',
    price: 579,
    category: 'Sushi',
    isVegetarian: false,
    image: '/crispy-chicken-roll-sushi.jpg',
    isCustomizable: false
  },
  {
    id: 'su7',
    name: 'Prawn Tempura Roll',
    description: 'Smashed Avocado Guacamole',
    price: 599,
    category: 'Sushi',
    isVegetarian: false,
    image: '/prawn-tempura-roll.jpg',
    isCustomizable: false
  },
  {
    id: 'su8',
    name: 'Creamy Tuna Roll',
    description: 'Tuna-Mayo Salad, Pickled Cucumber',
    price: 599,
    category: 'Sushi',
    isVegetarian: false,
    image: '/creamy-tuna-roll.jpg',
    isCustomizable: false
  },
  // --- MOMO AND DIMSUM ---
  {
    id: 'md1',
    name: 'Vegetable Momos,',
    description: '[6 Pieces] Steamed Or Pan Seared',
    price: 549,
    category: 'Momo And Dimsum',
    isVegetarian: true,
    image: '/vegetable-momos.jpg',
    isCustomizable: false
  },
  {
    id: 'md2',
    name: 'Spicy Crystal Dumpling',
    description: '[6 Pieces]',
    price: 589,
    category: 'Momo And Dimsum',
    isVegetarian: true,
    image: '/spicy-crystal-dumpling.jpg',
    isCustomizable: false
  },
  {
    id: 'md3',
    name: 'Truffled Cream Cheese Dimsum',
    description: '[6 Pieces]',
    price: 609,
    category: 'Momo And Dimsum',
    isVegetarian: true,
    image: '/truffled-cream-cheese-dimsum.png',
    isCustomizable: false
  },
  {
    id: 'md4',
    name: 'Chicken And Coriander Momo',
    description: '[6 Pieces] Steamed Or Pan Seared',
    price: 609,
    category: 'Momo And Dimsum',
    isVegetarian: false,
    image: '/chicken-and-coriander-momo.jpg',
    isCustomizable: false
  },
  {
    id: 'md5',
    name: 'Chicken Sui Mai',
    description: '[6 Pieces]',
    price: 609,
    category: 'Momo And Dimsum',
    isVegetarian: false,
    image: '/chicken-sui-mai.png',
    isCustomizable: false
  },
  {
    id: 'md6',
    name: 'Wasabi Chicken Dumpling',
    description: '[6 Pieces]',
    price: 619,
    category: 'Momo And Dimsum',
    isVegetarian: false,
    image: '/wasabi-chicken-dumpling.png',
    isCustomizable: false
  },
  {
    id: 'md7',
    name: 'Prawn Hargao',
    description: '[6 Pieces]',
    price: 649,
    category: 'Momo And Dimsum',
    isVegetarian: false,
    image: '/prawn-hargao.png',
    isCustomizable: false
  },
  // --- WOOD FIRED PIZZA, 12" THIN CRUST ---
  {
    id: 'pz1',
    name: "Kafa's Pineapple Cheese Pizza",
    description: 'Pineapple, Cheese, San Marzano Sauce',
    price: 579,
    category: 'Wood Fired Pizza, 12" Thin Crust',
    isVegetarian: true,
    image: '/pineapple-cheese-pizza.jpg',
    isCustomizable: false
  },
  {
    id: 'pz2',
    name: 'Margherita',
    description: 'San Marzano Tomato, Cheese, Basil, Olive Oil',
    price: 579,
    category: 'Wood Fired Pizza, 12" Thin Crust',
    isVegetarian: true,
    image: '/margherita.png',
    isCustomizable: false
  },
  {
    id: 'pz3',
    name: 'Pesto Pomodoro',
    description: 'Home Made Tomato Sauce, Cherry Tomatoes, Pesto, Parmesan',
    price: 599,
    category: 'Wood Fired Pizza, 12" Thin Crust',
    isVegetarian: true,
    image: '/pesto-pomodoro.jpg',
    isCustomizable: false
  },
  {
    id: 'pz4',
    name: 'Tuffled Mushrooms',
    description: 'Creamy Mushroom Sauce, Mixed Mushrooms, White Truffle Oil, Arugula And Feta',
    price: 629,
    category: 'Wood Fired Pizza, 12" Thin Crust',
    isVegetarian: true,
    image: '/stuffed-mushrooms.jpg',
    isCustomizable: false
  },
  {
    id: 'pz5',
    name: 'Pepperonata',
    description: 'Roasted Sweet Peppers, Garlic, Sun Dried Tomatoes, Feta, Thyme, Capers And Balsamic',
    price: 599,
    category: 'Wood Fired Pizza, 12" Thin Crust',
    isVegetarian: true,
    image: '/pepperonata-pizza.png',
    isCustomizable: false
  },
  {
    id: 'pz6',
    name: 'Paneer Tikka On Pizza',
    description: 'Onion, Tomato, Paneer, Mint Chutney And Jalapeno',
    price: 629,
    category: 'Wood Fired Pizza, 12" Thin Crust',
    isVegetarian: true,
    image: '/paneer-tikka-on-pizza.png',
    isCustomizable: false
  },
  {
    id: 'pz7',
    name: 'Asian Chili Paneer',
    description: 'Diced Paneer, Sweet Pepper, Onion, Scallion',
    price: 629,
    category: 'Wood Fired Pizza, 12" Thin Crust',
    isVegetarian: true,
    image: '/asian-chili-paneer-pizza.png',
    isCustomizable: false
  },
  {
    id: 'pz8',
    name: 'Veggie Farmhouse',
    description: 'American Corn, Broccoli, Olives, Sweet Peppers, Baby Tomato, Onion And Asparagus',
    price: 649,
    category: 'Wood Fired Pizza, 12" Thin Crust',
    isVegetarian: true,
    image: '/veggie-farmhouse-pizza.png',
    isCustomizable: false
  },
  {
    id: 'pz9',
    name: 'Chicken And Cheese Pizza',
    description: 'Grilled Chicken, San Marzano Tomato Sauce, Cheese',
    price: 649,
    category: 'Wood Fired Pizza, 12" Thin Crust',
    isVegetarian: false,
    image: '/chicken-and-cheese-pizza.jpg',
    isCustomizable: false
  },
  {
    id: 'pz10',
    name: 'Karam-Podi Chicken',
    description: 'Spicy Andhra Chicken, Curry Leaves And Coriander',
    price: 669,
    category: 'Wood Fired Pizza, 12" Thin Crust',
    isVegetarian: false,
    image: '/karam-podi-chicken-pizza.png',
    isCustomizable: false
  },
  {
    id: 'pz11',
    name: 'Mama Mia',
    description: 'Pesto Chicken, Onion, Olives, Sundried Tomatoes, Parmesan',
    price: 669,
    category: 'Wood Fired Pizza, 12" Thin Crust',
    isVegetarian: false,
    image: '/mama-mia-pizza.jpg',
    isCustomizable: false
  },
  {
    id: 'pz12',
    name: 'Chicken Tikka Pizza',
    description: 'Chicken Tikka, Onion, Tomatoes, Mint Chutney, Coriander, Jalapeno',
    price: 635,
    category: 'Wood Fired Pizza, 12" Thin Crust',
    isVegetarian: false,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
    isCustomizable: false
  },
  {
    id: 'pz13',
    name: 'Chicken Mafia',
    description: 'Lebanese Sumac Chicken, Chicken Ham, Chicken Sausage, Olives, Jalapeno',
    price: 699,
    category: 'Wood Fired Pizza, 12" Thin Crust',
    isVegetarian: false,
    image: '/chicken-mafia-pizza.png',
    isCustomizable: false
  },
  {
    id: 'pz14',
    name: 'Porkie',
    description: 'Grilled Pork Bacon And Pulled Chicken, Olives And Caramelized Onion',
    price: 699,
    category: 'Wood Fired Pizza, 12" Thin Crust',
    isVegetarian: false,
    image: '/porkie-pizza.png',
    isCustomizable: false
  },
  {
    id: 'pz15',
    name: 'Bbq Chicken Pizza',
    description: 'BBQ Glazed Chicken, Red Onion, Cilantro, Mozzarella & Smokey BBQ Sauce',
    price: 649,
    category: 'Wood Fired Pizza, 12" Thin Crust',
    isVegetarian: false,
    image: '/bbq-chicken-pizza.jpg',
    isCustomizable: false
  },
  // --- SANDWICHES, WRAPS, BURGER AND KLUB ---
  {
    id: 'swb1',
    name: 'Canteen Aloo Tikki Burger',
    description: 'Spicy Potato Tikki, Ketchup, Pickles',
    price: 379,
    category: 'Sandwiches, Wraps, Burger And Klub',
    isVegetarian: true,
    image: '/canteen-aloo-tikki-burger.jpg',
    isCustomizable: false
  },
  {
    id: 'swb2',
    name: 'Nasvhille Chicken Burger',
    description: 'Breaded Chicken, Hot Texas Sauce, Pickles',
    price: 399,
    category: 'Sandwiches, Wraps, Burger And Klub',
    isVegetarian: false,
    image: '/nashville-chicken-burger.png',
    isCustomizable: false
  },
  {
    id: 'swb3',
    name: 'Mushroom Cheese Melt',
    description: 'Mixed Mushroom, Spicy Cheddar Cheese',
    price: 379,
    category: 'Sandwiches, Wraps, Burger And Klub',
    isVegetarian: true,
    image: '/mushroom-cheese-melt.png',
    isCustomizable: false
  },
  {
    id: 'swb4',
    name: 'Focaccia Veg Klub',
    description: 'Roasted Peppers, Sundried Tomato, Feta Cheese And Slaw',
    price: 399,
    category: 'Sandwiches, Wraps, Burger And Klub',
    isVegetarian: true,
    image: '/focaccia-veg-klub.png',
    isCustomizable: false
  },
  {
    id: 'swb5',
    name: 'Focaccia Pesto Chicken',
    description: 'Pesto Grilled Chicken, Spicy Cheese Mix, Roma Tomatoes, Italian Focaccia',
    price: 399,
    category: 'Sandwiches, Wraps, Burger And Klub',
    isVegetarian: false,
    image: '/focaccia-pesto-chicken.png',
    isCustomizable: false
  },
  {
    id: 'swb6',
    name: 'Caesar Focaccia Klub Chicken',
    description: 'Caesar Chicken Salad, Caesar Dressing, Egg, Chicken Ham And Slaw',
    price: 409,
    category: 'Sandwiches, Wraps, Burger And Klub',
    isVegetarian: false,
    image: '/caesar-focaccia-klub-chicken.jpg',
    isCustomizable: false
  },
  {
    id: 'swb7',
    name: 'Chili-Bean Burrito',
    description: 'Fajita Vegetables, Spicy Herb Rice, Mexican Beans, Tomato Salsa, Sour Cream',
    price: 379,
    category: 'Sandwiches, Wraps, Burger And Klub',
    isVegetarian: true,
    image: '/chili-bean-burrito.png',
    isCustomizable: false
  },
  {
    id: 'swb8',
    name: 'Mexi-Chicken Burrito',
    description: 'Pulled Chicken, Fajita Vegetables, Spicy Herb Rice, Mexican Beans, Tomato Salsa, Sour Cream',
    price: 399,
    category: 'Sandwiches, Wraps, Burger And Klub',
    isVegetarian: false,
    image: '/mexi-chicken-burrito.png',
    isCustomizable: false
  },
  {
    id: 'swb9',
    name: 'Zinger Chicken Burger',
    description: 'Crispy Zinger Chicken, Lettuce, Mayo, Pickle & Brioche Bun',
    price: 349,
    category: 'Sandwiches, Wraps, Burger And Klub',
    isVegetarian: false,
    image: '/zinger-chicken-burger.jpg',
    isCustomizable: false
  },
  {
    id: 'swb10',
    name: 'Crunchy Chicken Burger',
    description: 'Crunchy Fried Chicken, Spicy Mayo, Coleslaw & Toasted Bun',
    price: 369,
    category: 'Sandwiches, Wraps, Burger And Klub',
    isVegetarian: false,
    image: '/crunchy-chicken-burger.png',
    isCustomizable: false
  },
  {
    id: 'swb11',
    name: 'Olive Focaccia',
    description: 'Fresh Focaccia Bread with Black Olives, Rosemary & Extra Virgin Olive Oil',
    price: 299,
    category: 'Sandwiches, Wraps, Burger And Klub',
    isVegetarian: true,
    image: '/olive-focaccia.jpg',
    isCustomizable: false
  },
  {
    id: 'swb12',
    name: 'Crispy Chicken Sandwich',
    description: 'Crispy Fried Chicken Fillet, Garlic Mayo & Fresh Lettuce in Toasted Bread',
    price: 349,
    category: 'Sandwiches, Wraps, Burger And Klub',
    isVegetarian: false,
    image: '/crispy-chicken-sandwich.jpg',
    isCustomizable: false
  },
  {
    id: 'swb13',
    name: 'Grilled Chicken & Cheese Sandwich',
    description: 'Herb Grilled Chicken, Melted Cheddar & Mozzarella on Toasted Bread',
    price: 349,
    category: 'Sandwiches, Wraps, Burger And Klub',
    isVegetarian: false,
    image: '/grilled-chicken-cheese-sandwich.jpg',
    isCustomizable: false
  },
  // --- PASTA ---
  {
    id: 'pst1',
    name: 'Chicken Penne Arrabiatta',
    description: 'Penne pasta tossed in spicy tomato arrabbiata sauce with grilled chicken',
    price: 449,
    category: 'Pasta',
    isVegetarian: false,
    image: '/chicken-penne-arrabiatta.jpg',
    isCustomizable: false
  },
  {
    id: 'pst2',
    name: 'Sicilian Pesto - Pasta Bowl',
    description: 'Basil Pesto, Sundried Tomatoes, Olives, Parmesan',
    price: 459,
    category: 'Pasta',
    isVegetarian: true,
    image: '/sicilian-pesto-pasta-bowl.jpg',
    isCustomizable: false
  },
  {
    id: 'pst3',
    name: 'Cheese Cornball Pasta Bowl',
    description: 'American Corn And Cheese Balls, Fine Herbs, Cheddar And Parmesan',
    price: 459,
    category: 'Pasta',
    isVegetarian: true,
    image: '/cheese-cornball-pasta-bowl.png',
    isCustomizable: false
  },
  {
    id: 'pst4',
    name: 'Penne Arrabiatta',
    description: 'Pomodoro Sauce, Crushed Chilies, Parmesan And Basil',
    price: 399,
    category: 'Pasta',
    isVegetarian: true,
    image: '/penne-arrabiatta.png',
    isCustomizable: false
  },
  {
    id: 'pst5',
    name: 'Rose Veg Pasta',
    description: 'Creamy Tomato Sauce, Crushed Chilies, Garlic, Herbs',
    price: 449,
    category: 'Pasta',
    isVegetarian: true,
    image: '/rose-veg-pasta.jpg',
    isCustomizable: false
  },
  {
    id: 'pst6',
    name: 'Chicken And Cheese Pasta',
    description: 'Penne, Grilled Chicken, Parmesan And Cheddar',
    price: 489,
    category: 'Pasta',
    isVegetarian: false,
    image: '/chicken-and-cheese-pasta.jpg',
    isCustomizable: false
  },
  {
    id: 'pst7',
    name: 'Italian Carbonra',
    description: 'Pork Bacon And Chicken Ham, Egg Yolk And Cream, Cracked Pepper, Parmesan',
    price: 489,
    category: 'Pasta',
    isVegetarian: false,
    image: '/italian-carbonara.png',
    isCustomizable: false
  },
  {
    id: 'pst8',
    name: 'Mixed Vegetables And Spinach Royal Lasagne',
    description: 'Layers of lasagne sheets, fresh spinach, mixed vegetables, ricotta and mozzarella',
    price: 499,
    category: 'Pasta',
    isVegetarian: true,
    image: '/mixed-vegetables-and-spinach-royal-lasagne.jpg',
    isCustomizable: false
  },
  {
    id: 'pst9',
    name: 'Spicy Chicken And Cheese Royal Lasagne',
    description: 'Layers of lasagne sheets, spicy chicken ragu, rich cheese and béchamel',
    price: 529,
    category: 'Pasta',
    isVegetarian: false,
    image: '/spicy-chicken-and-cheese-royal-lasagne.png',
    isCustomizable: false
  },
  {
    id: 'pst10',
    name: 'Rose Chicken Pasta',
    description: 'Creamy pink rose sauce tossed with penne pasta and tender chicken',
    price: 479,
    category: 'Pasta',
    isVegetarian: false,
    image: '/rose-chicken-pasta.jpg',
    isCustomizable: false
  },
  {
    id: 'pst11',
    name: 'Rose Shrimp Pasta',
    description: 'Creamy pink rose sauce tossed with penne pasta and juicy shrimp',
    price: 479,
    category: 'Pasta',
    isVegetarian: false,
    image: '/rose-shrimp-pasta.jpg',
    isCustomizable: false
  },
  {
    id: 'pst12',
    name: 'Veg Mac & Cheese',
    description: 'Classic macaroni smothered in rich, creamy cheddar cheese sauce',
    price: 329,
    category: 'Pasta',
    isVegetarian: true,
    image: '/veg-mac-and-cheese.jpg',
    isCustomizable: false
  },
  {
    id: 'pst13',
    name: 'Chicken Mac & Cheese',
    description: 'Creamy cheddar macaroni baked with seasoned diced chicken',
    price: 359,
    category: 'Pasta',
    isVegetarian: false,
    image: '/chicken-mac-and-cheese.png',
    isCustomizable: false
  },
  {
    id: 'pst14',
    name: 'Shrimp Mac & Cheese',
    description: 'Creamy cheddar macaroni baked with succulent sauteed shrimp',
    price: 389,
    category: 'Pasta',
    isVegetarian: false,
    image: '/shrimp-mac-and-cheese.png',
    isCustomizable: false
  },
  {
    id: 'pst15',
    name: 'Veg Mushroom Alfredo Pasta',
    description: 'Fettuccine pasta in rich mushroom cream Alfredo sauce',
    price: 329,
    category: 'Pasta',
    isVegetarian: true,
    image: '/veg-mushroom-alfredo-pasta.jpg',
    isCustomizable: false
  },
  {
    id: 'pst16',
    name: 'Chicken Mushroom Alfredo Pasta',
    description: 'Fettuccine pasta with grilled chicken and mushrooms in rich Alfredo cream sauce',
    price: 359,
    category: 'Pasta',
    isVegetarian: false,
    image: '/chicken-mushroom-alfredo-pasta.png',
    isCustomizable: false
  },
  {
    id: 'pst17',
    name: 'Shrimp Mushroom Alfredo Pasta',
    description: 'Fettuccine pasta with sauteed shrimp and mushrooms in rich Alfredo cream sauce',
    price: 389,
    category: 'Pasta',
    isVegetarian: false,
    image: '/shrimp-mushroom-alfredo-pasta.png',
    isCustomizable: false
  },
  // --- LARGE PLATES AND BOWLS ---
  {
    id: 'lpb1',
    name: 'Veggie Chowmein',
    description: 'Pan Fried Noodles, Mildly Spiced Vegetable Curry And Soya Sauce',
    price: 459,
    category: 'Large Plates And Bowls',
    isVegetarian: true,
    image: '/veggie-chowmein.jpg',
    isCustomizable: false
  },
  {
    id: 'lpb2',
    name: 'Classic Vegetables Green Thai Curry And Jasmine Rice',
    description: 'Classic green Thai coconut curry with garden vegetables served with jasmine rice',
    price: 479,
    category: 'Large Plates And Bowls',
    isVegetarian: true,
    image: '/classic-vegetables-green-thai-curry-and-jasmine-rice.png',
    isCustomizable: false
  },
  {
    id: 'lpb3',
    name: 'Diced Chicken Green Thai Curry And Jasmine Rice',
    description: 'Diced chicken in green Thai coconut curry served with jasmine rice',
    price: 509,
    category: 'Large Plates And Bowls',
    isVegetarian: false,
    image: '/diced-chicken-green-thai-curry-and-jasmine-rice.jpg',
    isCustomizable: false
  },
  {
    id: 'lpb4',
    name: 'Prawn Green Thai Curry And Jasmine Rice',
    description: 'Succulent prawns in green Thai coconut curry served with jasmine rice',
    price: 539,
    category: 'Large Plates And Bowls',
    isVegetarian: false,
    image: '/prawn-green-thai-curry-and-jasmine-rice.jpg',
    isCustomizable: false
  },
  {
    id: 'lpb5',
    name: 'Classic Vegetables Red Thai Curry And Jasmine Rice',
    description: 'Classic red Thai coconut curry with garden vegetables served with jasmine rice',
    price: 479,
    category: 'Large Plates And Bowls',
    isVegetarian: true,
    image: '/classic-vegetables-red-thai-curry-and-jasmine-rice.png',
    isCustomizable: false
  },
  {
    id: 'lpb6',
    name: 'Diced Chicken Red Thai Curry And Jasmine Rice',
    description: 'Diced chicken in red Thai coconut curry served with jasmine rice',
    price: 509,
    category: 'Large Plates And Bowls',
    isVegetarian: false,
    image: '/diced-chicken-red-thai-curry-and-jasmine-rice.png',
    isCustomizable: false
  },
  {
    id: 'lpb7',
    name: 'Prawn Red Thai Curry And Jasmine Rice',
    description: 'Succulent prawns in red Thai coconut curry served with jasmine rice',
    price: 539,
    category: 'Large Plates And Bowls',
    isVegetarian: false,
    image: '/prawn-red-thai-curry-and-jasmine-rice.png',
    isCustomizable: false
  },
  {
    id: 'lpb8',
    name: 'Malaysian Rendang Vegetable And Potato Curry',
    description: '[Veg Preparation] Spicy Malaysian Spice, Jasmine Rice',
    price: 479,
    category: 'Large Plates And Bowls',
    isVegetarian: true,
    image: '/malaysian-rendang-vegetable-and-potato-curry.png',
    isCustomizable: false
  },
  {
    id: 'lpb9',
    name: 'Malaysian Rendang Chicken And Potato Curry',
    description: 'Spicy Malaysian Spice, Jasmine Rice',
    price: 509,
    category: 'Large Plates And Bowls',
    isVegetarian: false,
    image: '/malaysian-rendang-chicken-and-potato-curry.png',
    isCustomizable: false
  },
  {
    id: 'lpb10',
    name: 'Mushroom Hot 65 Noodle Bowl',
    description: 'Spicy 65 Sauce, Curry Leaves, Coriander, Lemon',
    price: 479,
    category: 'Large Plates And Bowls',
    isVegetarian: true,
    image: '/mushroom-hot-65-noodle-bowl.jpg',
    isCustomizable: false
  },
  {
    id: 'lpb11',
    name: 'Chicken And Egg Hot 65 Noodle Bowl',
    description: 'Spicy 65 Sauce, Curry Leaves, Coriander, Lemon',
    price: 509,
    category: 'Large Plates And Bowls',
    isVegetarian: false,
    image: '/chicken-and-egg-hot-65-noodle-bowl.png',
    isCustomizable: false
  },
  {
    id: 'lpb12',
    name: 'Fried Noodles, Sweet And Sour Vegetable Sauce',
    description: 'Crispy fried noodles served with sweet and sour vegetable gravy',
    price: 479,
    category: 'Large Plates And Bowls',
    isVegetarian: true,
    image: '/fried-noodles-sweet-and-sour-vegetable-sauce.jpg',
    isCustomizable: false
  },
  {
    id: 'lpb13',
    name: 'Paneer And Vegetables Asian Rice Bowls',
    description: 'Paneer and fresh vegetables served with choice of Asian sauce over steamed rice',
    price: 479,
    category: 'Large Plates And Bowls',
    isVegetarian: true,
    image: '/paneer-and-vegetables-asian-rice-bowls.png',
    isCustomizable: true,
    customizationOptions: [
      {
        name: 'Choice Of Sauce',
        choices: ['Black Pepper Sauce', 'Schezwan Sauce', 'Chilly Sauce'],
        defaultChoice: 'Black Pepper Sauce'
      }
    ]
  },
  {
    id: 'lpb14',
    name: 'Chicken And Egg Asian Rice Bowls',
    description: 'Tender chicken and fried egg served with choice of Asian sauce over steamed rice',
    price: 509,
    category: 'Large Plates And Bowls',
    isVegetarian: false,
    image: '/chicken-and-egg-asian-rice-bowls.jpg',
    isCustomizable: true,
    customizationOptions: [
      {
        name: 'Choice Of Sauce',
        choices: ['Black Pepper Sauce', 'Schezwan Sauce', 'Chilly Sauce'],
        defaultChoice: 'Black Pepper Sauce'
      }
    ]
  },
  {
    id: 'lpb15',
    name: "'Karanga' Egg Noodles",
    description: 'Curry Leaves, Lemon, Coriander, Soya, Oyster Sauce',
    price: 479,
    category: 'Large Plates And Bowls',
    isVegetarian: false,
    image: '/karanga-egg-noodles.jpg',
    isCustomizable: false
  },
  {
    id: 'lpb16',
    name: 'Pad Kra Pao',
    description: 'Minced Chicken, Thai Chilies And Basil, Rice And Fried Egg',
    price: 489,
    category: 'Large Plates And Bowls',
    isVegetarian: false,
    image: '/pad-kra-pao.jpg',
    isCustomizable: false
  },
  {
    id: 'lpb17',
    name: 'Indonesian Nasi Goreng',
    description: 'Spicy Prawn Jasmine Rice, Fried Egg, Chicken Satay, Peanut Sauce, Prawn Cracker, Kimchi',
    price: 489,
    category: 'Large Plates And Bowls',
    isVegetarian: false,
    image: '/indonesian-nasi-goreng.jpg',
    isCustomizable: false
  },
  {
    id: 'lpb18',
    name: 'Chicken, Mash And Gravy',
    description: 'Grilled Chicken, Mashed Potatoes, Seasonal Vegetables, 6 Hour Demi Glaze, Pepper Sauce Or Mushroom Sauce',
    price: 489,
    category: 'Large Plates And Bowls',
    isVegetarian: false,
    image: '/chicken-mash-and-gravy.png',
    isCustomizable: false
  },
  // --- KID'S MENU ---
  {
    id: 'km1',
    name: 'Corn And Cheese Balls',
    description: 'Crispy fried sweet corn and melted cheese balls served with dip',
    price: 299,
    category: "Kid's Menu",
    isVegetarian: true,
    image: '/corn-and-cheese-balls.jpg',
    isCustomizable: false
  },
  {
    id: 'km2',
    name: 'Chicken Nuggets',
    description: 'Golden crispy breaded chicken nuggets served with ketchup',
    price: 299,
    category: "Kid's Menu",
    isVegetarian: false,
    image: '/chicken-nuggets.png',
    isCustomizable: false
  },
  {
    id: 'km3',
    name: 'Chicken Tenders',
    description: 'Tender crispy fried chicken strips served with honey mustard dip',
    price: 299,
    category: "Kid's Menu",
    isVegetarian: false,
    image: '/chicken-tenders.jpg',
    isCustomizable: false
  },
  // --- APPETIZER ---
  {
    id: 'app1',
    name: 'Chicken Ala Kiev',
    description: 'Breaded chicken breast stuffed with cold herb garlic butter, crispy fried',
    price: 419,
    category: 'Appetizer',
    isVegetarian: false,
    image: '/chicken-ala-kiev.jpg',
    isCustomizable: false
  },
  {
    id: 'app2',
    name: 'Veg Fully Loaded Fries',
    description: 'Crispy fries loaded with cheese, jalapenos, salsa and herbs',
    price: 279,
    category: 'Appetizer',
    isVegetarian: true,
    image: '/veg-fully-loaded-fries.jpg',
    isCustomizable: false
  },
  {
    id: 'app3',
    name: 'Chicken Fully Loaded Fries',
    description: 'Crispy fries topped with seasoned chicken, cheese sauce and herbs',
    price: 379,
    category: 'Appetizer',
    isVegetarian: false,
    image: '/chicken-fully-loaded-fries.png',
    isCustomizable: false
  },
  // --- MINI CHINESE ---
  {
    id: 'mnc1',
    name: 'Chicken Lollipop',
    description: 'Crispy Indo-Chinese chicken lollipops tossed in spicy schezwan sauce',
    price: 399,
    category: 'Mini Chinese',
    isVegetarian: false,
    image: '/chicken-lollipop.jpg',
    isCustomizable: false
  },
  {
    id: 'mnc2',
    name: 'Honey Chlli Potato',
    description: 'Crispy potato fries tossed in sweet and spicy honey chili sauce',
    price: 349,
    category: 'Mini Chinese',
    isVegetarian: true,
    image: '/honey-chilli-potato.jpg',
    isCustomizable: false
  },
  // --- OFF THE GRILL ---
  {
    id: 'otg1',
    name: 'Grill Chicken With Smash Potato',
    description: 'Smashed Potato, Sauteed Veggies, Grilled Chicken',
    price: 449,
    category: 'Off The Grill',
    isVegetarian: false,
    image: '/grill-chicken-with-smash-potato.jpg',
    isCustomizable: false
  },
  {
    id: 'otg2',
    name: 'Bbq Grill Chicken With Smash Potato',
    description: 'Msashed Potato,Shoted Veggies,Bbq Chicken',
    price: 449,
    category: 'Off The Grill',
    isVegetarian: false,
    image: '/bbq-grill-chicken-with-smash-potato.png',
    isCustomizable: false
  },
  {
    id: 'otg3',
    name: 'Fillet Of Fish',
    description: 'Butter Rice,Shoted Veggies,Grill Fish',
    price: 469,
    category: 'Off The Grill',
    isVegetarian: false,
    image: '/fillet-of-fish.png',
    isCustomizable: false
  },
  // --- CONTINENTAL RICE BOWL ---
  {
    id: 'crb1',
    name: 'Mexican Rice Bowl Chicken',
    description: 'Spicy Mexican rice served with grilled chicken, black beans, corn salsa and sour cream',
    price: 389,
    category: 'Continental Rice Bowl',
    isVegetarian: false,
    image: '/mexican-rice-bowl-chicken.png',
    isCustomizable: false
  },
  {
    id: 'crb2',
    name: 'Creamy Garlic Mushroom Rice Bowl',
    description: 'Sauteed mushrooms in rich garlic cream sauce served over buttered rice',
    price: 369,
    category: 'Continental Rice Bowl',
    isVegetarian: true,
    image: '/creamy-garlic-mushroom-rice-bowl.png',
    isCustomizable: false
  },
  {
    id: 'crb3',
    name: 'Creamy Garlic Chicken Rice Bowl',
    description: 'Tender chicken strips in creamy garlic sauce served over herbs butter rice',
    price: 399,
    category: 'Continental Rice Bowl',
    isVegetarian: false,
    image: '/creamy-garlic-chicken-rice-bowl.png',
    isCustomizable: false
  },
  {
    id: 'crb4',
    name: 'Straganoff Chicken',
    description: 'Classic chicken stroganoff cooked with mushrooms & sour cream served over rice',
    price: 399,
    category: 'Continental Rice Bowl',
    isVegetarian: false,
    image: '/stroganoff-chicken.jpg',
    isCustomizable: false
  },
  // --- ORIENTAL RICE BOWL ---
  {
    id: 'orb1',
    name: 'Mixed Rice Bowl - Non Veg',
    description: '[Chicken Preparation]',
    price: 399,
    category: 'Oriental Rice Bowl',
    isVegetarian: false,
    image: '/mixed-rice-bowl-non-veg.jpg',
    isCustomizable: false
  },
  // --- PANCAKES ---
  {
    id: 'pk1',
    name: 'Seasonal Fruit Pancakes',
    description: 'Fresh Fruit, Melted Butter, Pancake Syrup, Vanilla Cream',
    price: 249,
    category: 'Pancakes',
    isVegetarian: true,
    image: '/seasonal-fruit-pancakes.png',
    isCustomizable: false
  },
  {
    id: 'pk2',
    name: 'Dora-Tella Cakes',
    description: 'Stuffed Nutella Pancakes',
    price: 269,
    category: 'Pancakes',
    isVegetarian: true,
    image: '/dora-tella-cakes.jpg',
    isCustomizable: false
  },
  // --- BROWNIE ---
  {
    id: 'br1',
    name: 'Brownie',
    description: 'Warm fudge chocolate brownie with rich cocoa',
    price: 249,
    category: 'Brownie',
    isVegetarian: true,
    image: '/brownie.jpg',
    isCustomizable: false
  },
  {
    id: 'br2',
    name: 'Brownie With Ice Cream',
    description: 'Warm fudge chocolate brownie served with a scoop of vanilla ice cream',
    price: 299,
    category: 'Brownie',
    isVegetarian: true,
    image: '/brownie-with-ice-cream.png',
    isCustomizable: false
  },
  // --- ADD ON ---
  {
    id: 'ao1',
    name: 'Add On Espresso Shot',
    description: 'Extra shot of rich dark espresso coffee',
    price: 60,
    category: 'Add On',
    isVegetarian: true,
    image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=800&q=80',
    isCustomizable: false
  },
  {
    id: 'ao2',
    name: 'Oat Milk',
    description: 'Creamy dairy-free oat milk add-on',
    price: 60,
    category: 'Add On',
    isVegetarian: true,
    image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=800&q=80',
    isCustomizable: false
  },
  {
    id: 'ao3',
    name: 'Floor Charges',
    description: 'Private floor / venue space booking charges',
    price: 5000,
    category: 'Add On',
    isVegetarian: true,
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    isCustomizable: false
  },
  // --- DESSERTS ---
  {
    id: 'ds1',
    name: 'Biscoff Tress Leches',
    description: 'Soft sponge soaked in three milks topped with Lotus Biscoff spread and cookie crumbs',
    price: 289,
    category: 'Desserts',
    isVegetarian: true,
    image: '/biscoff-tres-leches.jpg',
    isCustomizable: false
  },
  {
    id: 'ds2',
    name: 'Hazelnut Chocolate Tres Lehes',
    description: 'Rich chocolate tres leches soaked in hazelnut infused milk topped with chocolate cream',
    price: 279,
    category: 'Desserts',
    isVegetarian: true,
    image: '/hazelnut-chocolate-tres-leches.jpg',
    isCustomizable: false
  },
  {
    id: 'ds3',
    name: 'Milk Cake Tres Leche',
    description: 'Classic milk cake tres leches sponge soaked in saffron milk and condensed cream',
    price: 289,
    category: 'Desserts',
    isVegetarian: true,
    image: '/milk-cake-tres-leches.jpg',
    isCustomizable: false
  },
  // --- AVOCADO LOVER'S ---
  {
    id: 'av1',
    name: 'Avocado & Feta On Toast',
    description: 'Guacamole, Garden Fresh Tomato, Lettuce & Feta',
    price: 550,
    category: "Avocado Lover's",
    isVegetarian: true,
    image: '/avocado-and-feta-on-toast.jpg',
    isCustomizable: false
  },
  {
    id: 'av2',
    name: 'Avocado & Tomato On The Toast',
    description: 'Guacamole, Garden Fresh Tomato, Lettuce',
    price: 550,
    category: "Avocado Lover's",
    isVegetarian: true,
    image: '/avocado-and-tomato-on-the-toast.jpg',
    isCustomizable: false
  },
  {
    id: 'av3',
    name: 'Avocado Sandwich',
    description: 'Avocado, Onion, Lettuce, Tomato, Cucumber & Guacamole Served In Brown Bread',
    price: 550,
    category: "Avocado Lover's",
    isVegetarian: true,
    image: '/avocado-sandwich.png',
    isCustomizable: false
  },
  {
    id: 'av4',
    name: 'Avocado Bruschetta',
    description: 'Served With Sundried Tomato Pesto',
    price: 550,
    category: "Avocado Lover's",
    isVegetarian: true,
    image: '/avocado-bruschetta.png',
    isCustomizable: false
  },
  {
    id: 'av5',
    name: 'Avocado Spinach & Mushroom On The Toast',
    description: 'Guacamole, sauteed spinach, mushrooms, served on toasted sourdough.',
    price: 550,
    category: "Avocado Lover's",
    isVegetarian: true,
    image: '/avocado-spinach-mushroom-on-the-toast.png',
    isCustomizable: false
  },
  // --- SOUP ---
  {
    id: 'sp1',
    name: 'Miso Dumpling Broth',
    description: 'Corn And Cheese Wonton, Home Made Crispy Chili Oil',
    price: 279,
    category: 'Soup',
    isVegetarian: true,
    image: '/miso-dumpling-broth.jpg',
    isCustomizable: true,
    customizationOptions: [
      {
        name: 'Soup Portion',
        choices: ['Regular', 'Soup 1/2'],
        defaultChoice: 'Regular'
      }
    ]
  },
  {
    id: 'sp2',
    name: 'Hot & Sour Chicken',
    description: 'Aromatic spicy and sour shredded chicken soup broth with bamboo shoots and mushrooms.',
    price: 299,
    category: 'Soup',
    isVegetarian: false,
    image: '/hot-and-sour-chicken.png',
    isCustomizable: true,
    customizationOptions: [
      {
        name: 'Soup Portion',
        choices: ['Regular', 'Soup 1/2'],
        defaultChoice: 'Regular'
      }
    ]
  },
  {
    id: 'sp3',
    name: 'Farm Cultivated Mushroom Puree',
    description: 'Mixed Mushrooms, White Truffle Oil, Parmesan',
    price: 279,
    category: 'Soup',
    isVegetarian: true,
    image: '/farm-cultivated-mushroom-puree.jpg',
    isCustomizable: true,
    customizationOptions: [
      {
        name: 'Soup Portion',
        choices: ['Regular', 'Soup 1/2'],
        defaultChoice: 'Regular'
      }
    ]
  },
  {
    id: 'sp4',
    name: 'Hot And Sour',
    description: 'Shitake Mushrooms, Cottage Cheese, Pickled Scallion',
    price: 279,
    category: 'Soup',
    isVegetarian: true,
    image: '/hot-and-sour-soup.jpg',
    isCustomizable: true,
    customizationOptions: [
      {
        name: 'Soup Portion',
        choices: ['Regular', 'Soup 1/2'],
        defaultChoice: 'Regular'
      }
    ]
  },
  {
    id: 'sp5',
    name: "Lorenzo's Meatball Minestroni",
    description: 'Tomato Broth, Crushed Pasta, Basil Pesto',
    price: 289,
    category: 'Soup',
    isVegetarian: false,
    image: '/lorenzos-meatball-minestroni.jpg',
    isCustomizable: true,
    customizationOptions: [
      {
        name: 'Soup Portion',
        choices: ['Regular', 'Soup 1/2'],
        defaultChoice: 'Regular'
      }
    ]
  },
  {
    id: 'sp6',
    name: 'Singapore Maggi Laksa',
    description: 'Curried Noodles, Prawns, Coconut Cream',
    price: 289,
    category: 'Soup',
    isVegetarian: false,
    image: '/singapore-maggi-laksa.png',
    isCustomizable: true,
    customizationOptions: [
      {
        name: 'Soup Portion',
        choices: ['Regular', 'Soup 1/2'],
        defaultChoice: 'Regular'
      }
    ]
  },
  {
    id: 'sp7',
    name: 'Chicken Soup A La Senegal',
    description: 'Peanut Butter, Coconut, Potatoes',
    price: 299,
    category: 'Soup',
    isVegetarian: false,
    image: '/chicken-soup-a-la-senegal.jpg',
    isCustomizable: true,
    customizationOptions: [
      {
        name: 'Soup Portion',
        choices: ['Regular', 'Soup 1/2'],
        defaultChoice: 'Regular'
      }
    ]
  },
  {
    id: 'sp8',
    name: 'Cream Of Chicken Soup',
    description: 'Smooth velvety shredded chicken cream soup garnished with fresh herbs.',
    price: 279,
    category: 'Soup',
    isVegetarian: false,
    image: '/cream-of-chicken-soup.jpg',
    isCustomizable: true,
    customizationOptions: [
      {
        name: 'Soup Portion',
        choices: ['Regular', 'Soup 1/2'],
        defaultChoice: 'Regular'
      }
    ]
  },
  {
    id: 'sp9',
    name: 'Veg Manchow Soup',
    description: 'Indo-Chinese spicy vegetable soup served with crispy fried noodles.',
    price: 189,
    category: 'Soup',
    isVegetarian: true,
    image: '/veg-manchow-soup.jpg',
    isCustomizable: true,
    customizationOptions: [
      {
        name: 'Soup Portion',
        choices: ['Regular', 'Soup 1/2'],
        defaultChoice: 'Regular'
      }
    ]
  },
  {
    id: 'sp10',
    name: 'Chicken Manchow Soup',
    description: 'Spicy chicken broth infused with garlic, ginger, and crispy noodle topping.',
    price: 219,
    category: 'Soup',
    isVegetarian: false,
    image: '/chicken-manchow-soup.jpg',
    isCustomizable: true,
    customizationOptions: [
      {
        name: 'Soup Portion',
        choices: ['Regular', 'Soup 1/2'],
        defaultChoice: 'Regular'
      }
    ]
  },
  // --- SPECIAL MENU ---
  {
    id: 'sm1',
    name: 'Spicy Chicken Korean Wings',
    description: 'Crispy fried chicken wings tossed in sticky spicy-sweet Korean gochujang glaze and sesame.',
    price: 449,
    category: 'Special Menu',
    isVegetarian: false,
    image: '/spicy-chicken-korean-wings.png',
    isCustomizable: false
  },
  {
    id: 'sm2',
    name: 'Cottage Cheese Burger',
    description: 'Grilled spiced cottage cheese paneer patty with lettuce, tomatoes, and house special sauce in brioche bun.',
    price: 399,
    category: 'Special Menu',
    isVegetarian: true,
    image: '/cottage-cheese-burger.png',
    isCustomizable: false
  },
  // --- AFFOGATO ---
  {
    id: 'af1',
    name: 'Single Affagato',
    description: 'A scoop of gourmet vanilla bean ice cream drowned in a hot shot of single espresso.',
    price: 229,
    category: 'Affogato',
    isVegetarian: true,
    image: '/single-affagato.png',
    isCustomizable: false
  },
  {
    id: 'af2',
    name: 'Double Shot Affagato',
    description: 'Double scoops of vanilla ice cream drowned in a rich double shot of dark espresso.',
    price: 239,
    category: 'Affogato',
    isVegetarian: true,
    image: '/double-shot-affagato.png',
    isCustomizable: false
  },
  {
    id: 'af3',
    name: 'Biscoff Affagato',
    description: 'Vanilla ice cream topped with espresso, Lotus Biscoff cookie spread, and speculoos biscuit crumble.',
    price: 299,
    category: 'Affogato',
    isVegetarian: true,
    image: '/biscoff-affagato.jpg',
    isCustomizable: false
  },
  // --- THICK SHAKES ---
  {
    id: 'ts1',
    name: 'Brownie Overload',
    description: 'Dense Milk Chocolate Shake With Vanilla Ice Cream, Chocolate Brownie And Thick Chocolate Sauce',
    price: 299,
    category: 'Thick Shakes',
    isVegetarian: true,
    image: '/brownie-overload.jpg',
    isCustomizable: false
  },
  {
    id: 'ts2',
    name: 'Biscoff Shake',
    description: 'Lotus Biscoff Paste, Vanilla Ice Cream And Crushed Lotus Biscuits',
    price: 299,
    category: 'Thick Shakes',
    isVegetarian: true,
    image: '/biscoff-shake.png',
    isCustomizable: false
  },
  {
    id: 'ts3',
    name: 'Oreo Cookie Monster',
    description: 'Classic Combinatio Of Creamy Oreos With Vanilla Ice Cream And Milk',
    price: 299,
    category: 'Thick Shakes',
    isVegetarian: true,
    image: '/oreo-cookie-monster.png',
    isCustomizable: false
  },
  {
    id: 'ts4',
    name: 'Nutty Nutella',
    description: 'Classic Hazlenut And Chocolate Paste With Vanilla Ice Cream',
    price: 299,
    category: 'Thick Shakes',
    isVegetarian: true,
    image: '/nutty-nutella.png',
    isCustomizable: false
  },
  {
    id: 'ts5',
    name: 'Kitkat',
    description: 'Churned Kit Kat Chocolate And Vanilla Ice Cream',
    price: 299,
    category: 'Thick Shakes',
    isVegetarian: true,
    image: '/kitkat-shake.png',
    isCustomizable: false
  },
  {
    id: 'ts6',
    name: 'Ferrero Rocher',
    description: 'Crushed Hazlenuts And Ferrero Rocher With Vanilla Ice Cream',
    price: 299,
    category: 'Thick Shakes',
    isVegetarian: true,
    image: '/ferrero-rocher.png',
    isCustomizable: false
  },
  // --- SHAKES ---
  {
    id: 'sh1',
    name: 'Tripical Trio Shake',
    description: 'Cobination Of Tree Fruit Mix Pulps Maskmelon,Strawberry And Mango',
    price: 229,
    category: 'Shakes',
    isVegetarian: true,
    image: '/tripical-trio-shake.png',
    isCustomizable: false
  },
  {
    id: 'sh2',
    name: 'Banana Blue Berry',
    description: 'Banana Berry Crush With Vanilla Ice Cream And Milk',
    price: 229,
    category: 'Shakes',
    isVegetarian: true,
    image: '/banana-blueberry-shake.png',
    isCustomizable: false
  },
  {
    id: 'sh3',
    name: 'Simply Vanilla',
    description: 'Vanilla Ice Cream Churned With Vanilla Syrup And Milk',
    price: 229,
    category: 'Shakes',
    isVegetarian: true,
    image: '/simply-vanilla-shake.png',
    isCustomizable: false
  },
  {
    id: 'sh4',
    name: 'Chocolate',
    description: 'Milk Chocolate, Vanilla Ice Cream, Chocolate Sauce',
    price: 229,
    category: 'Shakes',
    isVegetarian: true,
    image: '/chocolate-shake.jpg',
    isCustomizable: false
  },
  {
    id: 'sh5',
    name: 'Very Berry Strawbery',
    description: 'Strawberry Crush With Vanilla Ice Cream And Milk',
    price: 229,
    category: 'Shakes',
    isVegetarian: true,
    image: '/very-berry-strawberry.png',
    isCustomizable: false
  },
  // --- MOJITO & ICED TEA ---
  {
    id: 'mit1',
    name: 'Mojito',
    description: 'Refreshing sparkling mojito infused with fresh lime, mint leaves, and your choice of gourmet fruit flavor.',
    price: 219,
    category: 'Mojito & Iced Tea',
    isVegetarian: true,
    image: '/mojito.png',
    isCustomizable: true,
    customizationOptions: [
      {
        name: 'Flavor Choice',
        choices: [
          'Classic (+₹40)',
          'Strawberry (+₹40)',
          'Raspberry (+₹40)',
          'Watermelon (+₹40)',
          'Cranberry (+₹40)',
          'Blue Curaco (+₹40)',
          'Green Apple (+₹40)'
        ],
        defaultChoice: 'Classic (+₹40)',
        extraPriceMap: {
          'Classic (+₹40)': 40,
          'Strawberry (+₹40)': 40,
          'Raspberry (+₹40)': 40,
          'Watermelon (+₹40)': 40,
          'Cranberry (+₹40)': 40,
          'Blue Curaco (+₹40)': 40,
          'Green Apple (+₹40)': 40
        }
      }
    ]
  },
  {
    id: 'mit2',
    name: 'Iced Tea',
    description: 'Chilled steeped house tea served over crystal ice with your choice of natural fruit infusion.',
    price: 219,
    category: 'Mojito & Iced Tea',
    isVegetarian: true,
    image: '/iced-tea.png',
    isCustomizable: true,
    customizationOptions: [
      {
        name: 'Flavor Choice',
        choices: [
          'Classic',
          'Peach',
          'Black Magic',
          'Long Island',
          'Watermelon',
          'Raspberry',
          'Ramavara'
        ],
        defaultChoice: 'Classic'
      }
    ]
  },
  // --- SIGNATURE FRAPPUCINO ---
  {
    id: 'sf1',
    name: 'Belgian Chocolate Frappuccino',
    description: 'Blended Belgian dark chocolate frappe crowned with whipped cream and cocoa shavings.',
    price: 339,
    category: 'Signature Frappucino',
    isVegetarian: true,
    image: '/belgian-chocolate-frappuccino.png',
    isCustomizable: false
  },
  {
    id: 'sf2',
    name: 'Salted Caramel Frappuccino',
    description: 'Rich espresso shake blended with buttery caramel crunch and drizzle.',
    price: 339,
    category: 'Signature Frappucino',
    isVegetarian: true,
    image: '/salted-caramel-frappuccino.png',
    isCustomizable: false
  },
  {
    id: 'sf3',
    name: 'Matcha Frappuccino',
    description: 'Ceremonial Japanese Uji matcha blended cold with sweet milk and ice.',
    price: 339,
    category: 'Signature Frappucino',
    isVegetarian: true,
    image: '/matcha-frappuccino.png',
    isCustomizable: false
  },
  {
    id: 'sf4',
    name: 'Blue Pea Frappuccino',
    description: 'Butterfly pea flower tea blended into a velvety blue iced frappe.',
    price: 339,
    category: 'Signature Frappucino',
    isVegetarian: true,
    image: '/blue-pea-frappuccino.png',
    isCustomizable: false
  },
  // --- ICED SIGNATURE COFFEE ---
  {
    id: 'is1',
    name: 'Tonic Espresso',
    description: 'Chilled effervescent tonic water over ice topped with a rich single shot of espresso.',
    price: 299,
    category: 'Iced Signature Coffee',
    isVegetarian: true,
    image: '/tonic-espresso.png',
    isCustomizable: false
  },
  {
    id: 'is2',
    name: 'Iced Spanish Latte',
    description: 'Signature iced latte sweetened with rich condensed milk and chilled whole milk.',
    price: 339,
    category: 'Iced Signature Coffee',
    isVegetarian: true,
    image: '/iced-spanish-latte.png',
    isCustomizable: false
  },
  {
    id: 'is3',
    name: 'Iced Matcha Late',
    description: 'Ceremonial grade Japanese Uji matcha whisked and served iced with cold milk.',
    price: 329,
    category: 'Iced Signature Coffee',
    isVegetarian: true,
    image: '/iced-matcha-latte.png',
    isCustomizable: false
  },
  {
    id: 'is4',
    name: 'Iced Blue Pea Late',
    description: 'Butterfly pea flower tea layered with chilled milk and a shot of espresso.',
    price: 329,
    category: 'Iced Signature Coffee',
    isVegetarian: true,
    image: '/iced-blue-pea-latte.jpg',
    isCustomizable: false
  },
  {
    id: 'is5',
    name: 'Iced Biscoff Late',
    description: 'Iced espresso latte infused with creamy Lotus Biscoff cookie butter spread.',
    price: 339,
    category: 'Iced Signature Coffee',
    isVegetarian: true,
    image: '/iced-biscoff-latte.png',
    isCustomizable: false
  },
  {
    id: 'is6',
    name: 'Vietnamese Iced Coffee',
    description: 'Traditional slow-drip dark roast coffee sweetened with rich condensed milk over crushed ice.',
    price: 299,
    category: 'Iced Signature Coffee',
    isVegetarian: true,
    image: '/vietnamese-iced-coffee.png',
    isCustomizable: false
  },
  {
    id: 'is7',
    name: 'Single Shot Cranberry Espresso',
    description: 'Refreshing tart cranberry juice layered with a single shot of rich espresso on ice.',
    price: 299,
    category: 'Iced Signature Coffee',
    isVegetarian: true,
    image: '/single-shot-cranberry-espresso.png',
    isCustomizable: false
  },
  {
    id: 'is8',
    name: 'Double Shot Cranberry Espresso',
    description: 'Intense double shot of dark roast espresso layered over chilled cranberry juice.',
    price: 349,
    category: 'Iced Signature Coffee',
    isVegetarian: true,
    image: '/double-shot-cranberry-espresso.jpg',
    isCustomizable: false
  },
  // --- NITRO COLD BREW ---
  {
    id: 'ncb1',
    name: 'Classic Cold Nitro Brew',
    description: 'Cold brew infused with nitrogen for a velvety stout-like head and naturally sweet creaminess.',
    price: 299,
    category: 'Nitro Cold Brew',
    isVegetarian: true,
    image: '/classic-cold-nitro-brew.png',
    isCustomizable: false
  },
  {
    id: 'ncb2',
    name: 'Vanilla Sweet Cream Nitro Brew',
    description: 'Velvety nitrogen cold brew topped with house Madagascar vanilla sweet cream foam.',
    price: 349,
    category: 'Nitro Cold Brew',
    isVegetarian: true,
    image: '/vanilla-sweet-cream-nitro-brew.png',
    isCustomizable: false
  },
  // --- MANUAL BREW ---
  {
    id: 'mb1',
    name: 'Pour Over (Serves 1)',
    description: 'Precision hand-poured V60 drip coffee highlighting clean floral and fruit notes.',
    price: 219,
    category: 'Manual Brew',
    isVegetarian: true,
    image: '/pour-over-serves-1.png',
    isCustomizable: false
  },
  {
    id: 'mb2',
    name: 'Pour Over (Serves 2)',
    description: 'Generous Chemex style slow drip manual brew designed for sharing.',
    price: 299,
    category: 'Manual Brew',
    isVegetarian: true,
    image: '/pour-over-serves-2.png',
    isCustomizable: false
  },
  {
    id: 'mb3',
    name: 'French Press (Serves 2)',
    description: 'Classic full-immersion French press steep delivering a full body and rich aromatic oils.',
    price: 299,
    category: 'Manual Brew',
    isVegetarian: true,
    image: '/french-press-serves-2.png',
    isCustomizable: false
  },
  // --- DIP TEAS ---
  {
    id: 'dt1',
    name: 'Moroccan Mint',
    description: 'Spearmint and green tea leaves steeped into a refreshing hot infusion.',
    price: 199,
    category: 'Dip Teas',
    isVegetarian: true,
    image: '/moroccan-mint.png',
    isCustomizable: false
  },
  {
    id: 'dt2',
    name: 'Green Tea',
    description: 'Classic steamed green tea dip bag for a clean and antioxidant-rich taste.',
    price: 189,
    category: 'Dip Teas',
    isVegetarian: true,
    image: '/green-tea.jpg',
    isCustomizable: false
  },
  {
    id: 'dt3',
    name: 'Lemon Green Tea',
    description: 'Green tea infused with natural citrus lemon notes.',
    price: 199,
    category: 'Dip Teas',
    isVegetarian: true,
    image: '/lemon-green-tea.png',
    isCustomizable: false
  },
  {
    id: 'dt4',
    name: 'Hibiscus',
    description: 'Caffeine-free tart herbal tea brewed from dried hibiscus flowers.',
    price: 189,
    category: 'Dip Teas',
    isVegetarian: true,
    image: '/hibiscus-tea.png',
    isCustomizable: false
  },
  // --- HOT SIGNATURE COFFEE ---
  {
    id: 'hs1',
    name: 'Blue Pea Latte',
    description: 'Vibrant butterfly pea flower infused steamed milk layered with single-origin espresso.',
    price: 259,
    category: 'Hot Signature Coffee',
    isVegetarian: true,
    image: '/blue-pea-latte.png',
    isCustomizable: true,
    customizationOptions: [
      {
        name: 'Milk Choice',
        choices: ['Whole Milk', 'Oat Milk (+₹35)', 'Almond Milk (+₹35)'],
        defaultChoice: 'Whole Milk',
        extraPriceMap: { 'Whole Milk': 0, 'Oat Milk (+₹35)': 35, 'Almond Milk (+₹35)': 35 }
      }
    ]
  },
  {
    id: 'hs2',
    name: 'Matcha Latte',
    description: 'Ceremonial Grade Uji Matcha whisked into creamy velvet steamed milk.',
    price: 269,
    category: 'Hot Signature Coffee',
    isVegetarian: true,
    image: '/matcha-latte.png',
    isCustomizable: true,
    customizationOptions: [
      {
        name: 'Sweetness',
        choices: ['Standard', 'Less Sweet', 'No Added Sugar'],
        defaultChoice: 'Standard'
      }
    ]
  },
  {
    id: 'hs3',
    name: 'Irish Coffee',
    description: 'Espresso with Irish syrup flavor and optional topping of whipped cream.',
    price: 259,
    category: 'Hot Signature Coffee',
    isVegetarian: true,
    image: '/irish-coffee.png',
    isCustomizable: true,
    customizationOptions: [
      {
        name: 'Toppings',
        choices: ['Standard', 'Add Whipping Cream (+₹30)'],
        defaultChoice: 'Standard',
        extraPriceMap: { 'Standard': 0, 'Add Whipping Cream (+₹30)': 30 }
      }
    ]
  },
  {
    id: 'hs4',
    name: 'Cinnamon Americano',
    description: 'Rich double espresso poured over hot water and infused with aromatic Ceylon cinnamon stick.',
    price: 239,
    category: 'Hot Signature Coffee',
    isVegetarian: true,
    image: '/cinnamon-americano.png',
    isCustomizable: true
  },
  {
    id: 'hs5',
    name: 'Spanish Latte',
    description: 'Bold double espresso balanced with velvety steamed milk and sweet condensed milk.',
    price: 259,
    category: 'Hot Signature Coffee',
    isVegetarian: true,
    image: '/spanish-latte.png',
    isCustomizable: true,
    customizationOptions: [
      {
        name: 'Milk Choice',
        choices: ['Whole Milk', 'Oat Milk (+₹35)'],
        defaultChoice: 'Whole Milk',
        extraPriceMap: { 'Whole Milk': 0, 'Oat Milk (+₹35)': 35 }
      }
    ]
  },
  {
    id: 'hs6',
    name: 'Mint Mocha',
    description: 'Dark Belgian chocolate melted into espresso and fresh mint infused microfoam.',
    price: 239,
    category: 'Hot Signature Coffee',
    isVegetarian: true,
    image: '/mint-mocha.png',
    isCustomizable: true
  },
  {
    id: 'hs7',
    name: 'Mochachino',
    description: 'Equal parts dark chocolate espresso, steamed milk, and dense velvety cocoa-dusted cappuccino foam.',
    price: 249,
    category: 'Hot Signature Coffee',
    isVegetarian: true,
    image: '/mochaccino.png',
    isCustomizable: true
  },
  {
    id: 'hs8',
    name: 'Tripple Layer Marble Mocha',
    description: 'Decadent triple layered drink with white chocolate ganache, dark mocha, and espresso microfoam.',
    price: 279,
    category: 'Hot Signature Coffee',
    isVegetarian: true,
    image: '/triple-layer-marble-mocha.png',
    isCustomizable: true
  },
  {
    id: 'hs9',
    name: 'Caramel Machiato',
    description: 'Freshly steamed milk marked with espresso and finished with signature salted caramel drizzle.',
    price: 279,
    category: 'Hot Signature Coffee',
    isVegetarian: true,
    image: '/caramel-macchiato.png',
    isCustomizable: true
  },
  {
    id: 'hs10',
    name: 'Biscoff Late',
    description: 'Creamy steamed milk and espresso infused with real melted Lotus Biscoff speculoos cookie butter.',
    price: 309,
    category: 'Hot Signature Coffee',
    isVegetarian: true,
    image: '/biscoff-latte.png',
    isCustomizable: true
  },

  // --- USUAL SUSPECTS ---
  {
    id: 'us1',
    name: 'Steamed Milk With Flavour',
    description: 'Warm steamed milk delicately infused with your choice of gourmet flavor.',
    price: 99,
    category: 'Usual Suspects',
    isVegetarian: true,
    image: '/steamed-milk-with-flavour.png',
    isCustomizable: true,
    customizationOptions: [
      {
        name: 'Flavor Choice',
        choices: ['Vanilla', 'Caramel', 'Hazelnut', 'Belgian Chocolate'],
        defaultChoice: 'Vanilla'
      }
    ]
  },
  {
    id: 'us2',
    name: 'Kinley Plus Water Bottle',
    description: 'Packaged natural mineral drinking water.',
    price: 30,
    category: 'Usual Suspects',
    isVegetarian: true,
    image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=800&q=80',
    isCustomizable: false
  },
  {
    id: 'us3',
    name: 'Fresh Lime Soda',
    description: 'Refreshing sparkling soda with fresh squeezed lime juice and choice of sweet or salted preparation.',
    price: 159,
    category: 'Usual Suspects',
    isVegetarian: true,
    image: '/fresh-lime-soda.png',
    isCustomizable: true,
    customizationOptions: [
      {
        name: 'Preparation',
        choices: ['Sweet', 'Salted', 'Sweet & Salted Mix'],
        defaultChoice: 'Sweet'
      }
    ]
  },
  {
    id: 'us4',
    name: 'Fresh Lime Water',
    description: 'Classic chilled still water infused with fresh squeezed lime juice.',
    price: 159,
    category: 'Usual Suspects',
    isVegetarian: true,
    image: '/fresh-lime-water.jpg',
    isCustomizable: true,
    customizationOptions: [
      {
        name: 'Preparation',
        choices: ['Sweet', 'Salted', 'Sweet & Salted Mix'],
        defaultChoice: 'Sweet'
      }
    ]
  },
  {
    id: 'us5',
    name: 'Hot Chocolate',
    description: 'Rich, thick dark chocolate melted into warm velvet milk.',
    price: 279,
    category: 'Usual Suspects',
    isVegetarian: true,
    image: '/hot-chocolate.png',
    isCustomizable: true,
    customizationOptions: [
      {
        name: 'Toppings',
        choices: ['Standard', 'With Marshmallows (+₹30)', 'Extra Cocoa Dust'],
        defaultChoice: 'Standard',
        extraPriceMap: { 'Standard': 0, 'With Marshmallows (+₹30)': 30, 'Extra Cocoa Dust': 0 }
      }
    ]
  },
  // --- COFFEE ---
  {
    id: 'c1',
    name: 'Cafe Mocha',
    description: 'Rich espresso with Belgian chocolate and smooth steamed milk, topped with a dusting of cocoa.',
    price: 219,
    category: 'Coffee',
    isVegetarian: true,
    image: '/cafe-mocha.png',
    isCustomizable: true,
    customizationOptions: [
      {
        name: 'Size',
        choices: ['Regular (250ml)', 'Large (350ml)'],
        defaultChoice: 'Regular (250ml)',
        extraPriceMap: { 'Regular (250ml)': 0, 'Large (350ml)': 40 }
      },
      {
        name: 'Milk Choice',
        choices: ['Whole Milk', 'Oat Milk', 'Almond Milk', 'Skimmed Milk'],
        defaultChoice: 'Whole Milk',
        extraPriceMap: { 'Whole Milk': 0, 'Oat Milk': 35, 'Almond Milk': 35, 'Skimmed Milk': 0 }
      },
      {
        name: 'Sweetness',
        choices: ['Normal Sweet', 'Less Sweet', 'No Added Sugar'],
        defaultChoice: 'Normal Sweet'
      }
    ]
  },
  {
    id: 'c2',
    name: 'Signature Latte',
    description: 'Double shot of single-origin espresso blended with silky micro-foam milk.',
    price: 199,
    category: 'Coffee',
    isVegetarian: true,
    image: '/signature-latte.png',
    isCustomizable: true,
    customizationOptions: [
      {
        name: 'Size',
        choices: ['Regular (250ml)', 'Large (350ml)'],
        defaultChoice: 'Regular (250ml)',
        extraPriceMap: { 'Regular (250ml)': 0, 'Large (350ml)': 40 }
      },
      {
        name: 'Milk Choice',
        choices: ['Whole Milk', 'Oat Milk', 'Almond Milk'],
        defaultChoice: 'Whole Milk',
        extraPriceMap: { 'Whole Milk': 0, 'Oat Milk': 35, 'Almond Milk': 35 }
      }
    ]
  },
  {
    id: 'c3',
    name: 'Velvet Cappuccino',
    description: 'Dark roasted espresso topped with a generous layer of velvety warm milk foam.',
    price: 189,
    category: 'Coffee',
    isVegetarian: true,
    image: '/velvet-cappuccino.png',
    isCustomizable: true,
    customizationOptions: [
      {
        name: 'Size',
        choices: ['Regular', 'Large'],
        defaultChoice: 'Regular',
        extraPriceMap: { 'Regular': 0, 'Large': 35 }
      }
    ]
  },
  {
    id: 'c4',
    name: 'Flat White',
    description: 'Ristretto shot folded into smooth, velvety textured whole milk.',
    price: 209,
    category: 'Coffee',
    isVegetarian: true,
    image: '/flat-white.jpg',
    isCustomizable: true
  },
  {
    id: 'c5',
    name: 'Classic Americano',
    description: 'Double espresso poured over crisp hot water for a bold and clean aromatic flavor.',
    price: 169,
    category: 'Coffee',
    isVegetarian: true,
    image: '/classic-americano.png',
    isCustomizable: false
  },
  {
    id: 'c6',
    name: 'Single Shot Espresso',
    description: 'A concentrated shot of single-origin Arabica espresso brewed under high pressure for rich crema and intense aroma.',
    price: 149,
    category: 'Coffee',
    isVegetarian: true,
    image: '/single-shot-espresso.png',
    isCustomizable: true,
    customizationOptions: [
      {
        name: 'Roast Preference',
        choices: ['Signature Dark Roast', 'Medium Single Origin Blend'],
        defaultChoice: 'Signature Dark Roast'
      }
    ]
  },
  {
    id: 'c7',
    name: 'Dopio',
    description: 'A double shot of intense espresso extracting pure coffee oils, body, and balanced acidity.',
    price: 179,
    category: 'Coffee',
    isVegetarian: true,
    image: '/dopio.png',
    isCustomizable: true,
    customizationOptions: [
      {
        name: 'Roast Preference',
        choices: ['Signature Dark Roast', 'Medium Single Origin Blend'],
        defaultChoice: 'Signature Dark Roast'
      }
    ]
  },

  // --- COLD BREW ---
  {
    id: 'cb1',
    name: 'Classic Cold Brew',
    description: 'Full-Bodied Smooth & Aromatic , Steeped For 12 - 24 H',
    price: 249,
    category: 'Cold Brew',
    isVegetarian: true,
    image: '/classic-cold-brew.png',
    isCustomizable: false
  },
  {
    id: 'cb2',
    name: 'Honey Blended Cold Brew',
    description: 'Slow steeped cold brew blended with wild organic wildflower honey.',
    price: 259,
    category: 'Cold Brew',
    isVegetarian: true,
    image: '/honey-blended-cold-brew.png',
    isCustomizable: false
  },
  {
    id: 'cb3',
    name: 'Honey Cinamon Cold Brew',
    description: 'Signature cold brew infused with natural honey and ground Ceylon cinnamon.',
    price: 269,
    category: 'Cold Brew',
    isVegetarian: true,
    image: '/honey-cinnamon-cold-brew.png',
    isCustomizable: false
  },

  // --- ICED COFFEE ---
  {
    id: 'ic1',
    name: 'Iced Americano',
    description: 'Chilled espresso poured over ice and cold water for a crisp aromatic flavor.',
    price: 229,
    category: 'Iced Coffee',
    isVegetarian: true,
    image: '/iced-americano.png',
    isCustomizable: false
  },
  {
    id: 'ic2',
    name: 'Iced Late',
    description: 'Double espresso poured over fresh milk, ice, and smooth microfoam.',
    price: 279,
    category: 'Iced Coffee',
    isVegetarian: true,
    image: '/iced-latte.png',
    isCustomizable: true,
    customizationOptions: [
      {
        name: 'Milk Choice',
        choices: ['Whole Milk', 'Oat Milk (+₹35)', 'Almond Milk (+₹35)'],
        defaultChoice: 'Whole Milk',
        extraPriceMap: { 'Whole Milk': 0, 'Oat Milk (+₹35)': 35, 'Almond Milk (+₹35)': 35 }
      }
    ]
  },
  {
    id: 'ic3',
    name: 'Iced Mocha',
    description: 'Espresso blended with rich chocolate syrup, chilled milk, and ice.',
    price: 339,
    category: 'Iced Coffee',
    isVegetarian: true,
    image: '/iced-mocha.png',
    isCustomizable: false
  },
  {
    id: 'ic4',
    name: 'Iced Cinamon Americano',
    description: 'Chilled Americano infused with natural Ceylon cinnamon syrup over ice.',
    price: 259,
    category: 'Iced Coffee',
    isVegetarian: true,
    image: '/iced-cinamon-americano.png',
    isCustomizable: false
  },

  // --- FRAPPUCINO ---
  {
    id: 'f1',
    name: 'Coffee Frappuccino',
    description: 'Blended espresso shake poured over ice and crowned with whipped cream.',
    price: 339,
    category: 'Frappucino',
    isVegetarian: true,
    image: '/coffee-frappuccino.png',
    isCustomizable: true,
    customizationOptions: [
      {
        name: 'Milk Choice',
        choices: ['Whole Milk', 'Oat Milk (+₹35)', 'Almond Milk (+₹35)'],
        defaultChoice: 'Whole Milk',
        extraPriceMap: { 'Whole Milk': 0, 'Oat Milk (+₹35)': 35, 'Almond Milk (+₹35)': 35 }
      }
    ]
  },
  {
    id: 'f2',
    name: 'Mocha Frappuccino',
    description: 'Rich dark chocolate melted with espresso and ice, blended smooth with whipped cream.',
    price: 339,
    category: 'Frappucino',
    isVegetarian: true,
    image: '/mocha-frappuccino.png',
    isCustomizable: false
  },
  {
    id: 'f3',
    name: 'Java Chip Frappuccino',
    description: 'Blended espresso frappe with crunchy dark chocolate java chips and cocoa drizzle.',
    price: 339,
    category: 'Frappucino',
    isVegetarian: true,
    image: '/java-chip-frappuccino.png',
    isCustomizable: false
  },

  // --- TEA ---
  {
    id: 't1',
    name: 'Imperial Matcha Latte',
    description: 'Premium ceremonial grade Uji matcha whisked with warm milk and a touch of wild wildflower honey.',
    price: 249,
    category: 'Tea',
    isVegetarian: true,
    image: '/imperial-matcha-latte.png',
    isCustomizable: true
  },
  {
    id: 't2',
    name: 'Masala Chai Supreme',
    description: 'Traditional Assam black tea brewed with fresh ginger, green cardamom, cloves, and steamed milk.',
    price: 159,
    category: 'Tea',
    isVegetarian: true,
    image: '/masala-chai-supreme.jpg',
    isCustomizable: true
  },
  {
    id: 't3',
    name: 'Earl Grey Reserve',
    description: 'Full leaf Ceylon tea scented with organic oil of bergamot and dried cornflower petals.',
    price: 179,
    category: 'Tea',
    isVegetarian: true,
    image: '/earl-grey-reserve.png',
    isCustomizable: false
  },

  // --- MOCKTAILS ---
  {
    id: 'mc1',
    name: 'Yuzu Lemon Grass Martini',
    description: 'Japanese Lemon Crush Muddles With Lemongrass, Fresh Lime And Sprite',
    price: 279,
    category: 'Mocktails',
    isVegetarian: true,
    image: '/yuzu-lemon-grass-martini.png',
    isCustomizable: false
  },
  {
    id: 'mc2',
    name: 'Blood Orange Fizz',
    description: 'Muddled Rosemary, Ginger Ale And Blood Orange Syrup',
    price: 279,
    category: 'Mocktails',
    isVegetarian: true,
    image: '/blood-orange-fizz.png',
    isCustomizable: false
  },
  {
    id: 'mc3',
    name: 'Apple Caramel Pie',
    description: 'Refreshing Apple Juice With Caramel Sauce And Cinnamon',
    price: 279,
    category: 'Mocktails',
    isVegetarian: true,
    image: '/apple-caramel-pie.png',
    isCustomizable: false
  },
  {
    id: 'mc4',
    name: 'Sex On The Beach',
    description: 'Peach syrup, cranberry juice, and orange juice served over ice.',
    price: 279,
    category: 'Mocktails',
    isVegetarian: true,
    image: '/sex-on-the-beach.png',
    isCustomizable: false
  },
  {
    id: 'mc5',
    name: 'Blue Moon',
    description: 'Blue Curacao syrup, sparkling sprite, and fresh lime.',
    price: 279,
    category: 'Mocktails',
    isVegetarian: true,
    image: '/blue-moon.png',
    isCustomizable: false
  },
  {
    id: 'mc6',
    name: 'Citrus Sin',
    description: 'Blend of fresh citrus juices, passion fruit, and soda.',
    price: 279,
    category: 'Mocktails',
    isVegetarian: true,
    image: '/citrus-sin.png',
    isCustomizable: false
  },
  {
    id: 'mc7',
    name: 'Strong Currant',
    description: 'Black Currant, Lychee Juice And Ginger Ale',
    price: 279,
    category: 'Mocktails',
    isVegetarian: true,
    image: '/strong-currant.png',
    isCustomizable: false
  },
  {
    id: 'mc8',
    name: 'Pack - A - Punch',
    description: 'Muddled Orange, Kaffir Lime Leaves, Fresh Mint Leaves And Lime Juice Topped With Sprite',
    price: 279,
    category: 'Mocktails',
    isVegetarian: true,
    image: '/pack-a-punch.png',
    isCustomizable: false
  },
  {
    id: 'mc9',
    name: "Bartender's Passion",
    description: 'Passion Fruit And Fresh Watermelon, Pomegranate Syrup, Lime And Mint',
    price: 279,
    category: 'Mocktails',
    isVegetarian: true,
    image: '/bartenders-passion.png',
    isCustomizable: false
  },
  {
    id: 'mc10',
    name: 'Caribbean Pina Colada',
    description: 'Classic Pineapple, Coconut And Vanilla',
    price: 279,
    category: 'Mocktails',
    isVegetarian: true,
    image: '/caribbean-pina-colada.png',
    isCustomizable: false
  },
  {
    id: 'mc11',
    name: 'Lychee Colada',
    description: 'Vanilla Ice Cream Blended With Lychee Puree And Coconut Cream',
    price: 279,
    category: 'Mocktails',
    isVegetarian: true,
    image: '/lychee-colada.png',
    isCustomizable: false
  },
  {
    id: 'mc12',
    name: 'Mango - Passion Kiss',
    description: 'Creamy Mango And Passion Fruit Shaken Together',
    price: 279,
    category: 'Mocktails',
    isVegetarian: true,
    image: '/mango-passion-kiss.png',
    isCustomizable: false
  },

  // --- BAKERY & PASTRIES ---
  {
    id: 'b1',
    name: 'Artisanal Butter Croissant',
    description: 'Flaky, multi-layered French pastry baked fresh daily with pure Normandy butter.',
    price: 149,
    category: 'Bakery & Pastries',
    isVegetarian: true,
    image: '/artisanal-butter-croissant.jpg',
    isCustomizable: false
  },
  {
    id: 'b2',
    name: 'Almond Flaked Croissant',
    description: 'Golden croissant filled with rich almond cream and topped with toasted sliced almonds.',
    price: 189,
    category: 'Bakery & Pastries',
    isVegetarian: true,
    image: '/almond-flaked-croissant.jpg',
    isCustomizable: false
  },
  {
    id: 'b3',
    name: 'Pain au Chocolat',
    description: 'Butter croissant stuffed with two batons of 70% dark Belgian chocolate.',
    price: 179,
    category: 'Bakery & Pastries',
    isVegetarian: true,
    image: '/pain-au-chocolat.png',
    isCustomizable: false
  },

  // --- SAVORY BITES ---
  {
    id: 's1',
    name: 'Avocado Toast on Sourdough',
    description: 'Smashed Hass avocado on toasted sourdough, cherry tomatoes, microgreens, and chili flakes.',
    price: 299,
    category: 'Savory Bites',
    isVegetarian: true,
    image: 'https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?auto=format&fit=crop&w=800&q=80',
    isCustomizable: true,
    customizationOptions: [
      {
        name: 'Add-ons',
        choices: ['No Extra', 'Add Poached Egg (+₹45)', 'Add Feta Cheese (+₹40)'],
        defaultChoice: 'No Extra'
      }
    ]
  },
  {
    id: 's2',
    name: 'Truffle Mushroom Panini',
    description: 'Wild roasted mushrooms, fontina cheese, and black truffle pesto pressed between sourdough focaccia.',
    price: 329,
    category: 'Savory Bites',
    isVegetarian: true,
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80',
    isCustomizable: false
  }
];
