const dishes = [
  // --- VEG STARTERS ---
  { id: 1, name: "Golden Paneer Tikka", category: "veg starters", price: 350, image: "/images/veg_starter.png", description: "Crispy paneer skewers charred to perfection with mint chutney.", isVeg: true, spicy: 2, glutenFree: true },
  { id: 2, name: "Truffle Fries", category: "veg starters", price: 250, image: "/images/burger.jpg", description: "Crispy fries tossed in truffle oil and parmesan dust.", isVeg: true, spicy: 0, glutenFree: true },
  { id: 101, name: "Crispy Lotus Stem", category: "veg starters", price: 280, image: "https://images.unsplash.com/photo-1600336153113-d66c79de3e91?auto=format&fit=crop&w=800&q=80", description: "Honey chili glazed lotus stem tossed with bell peppers.", isVeg: true, spicy: 1, glutenFree: true },
  { id: 102, name: "Hara Bhara Kebab", category: "veg starters", price: 300, image: "https://images.unsplash.com/photo-1599487405404-586b5b5c9077?auto=format&fit=crop&w=800&q=80", description: "Spinach and green pea patties stuffed with melting cheese.", isVeg: true, spicy: 0, glutenFree: false },

  // --- NON-VEG STARTERS ---
  { id: 3, name: "Sticky Glazed Wings", category: "non-veg starters", price: 450, image: "/images/non_veg_starter.png", description: "Spicy glazed chicken wings garnished with toasted sesame seeds.", isVeg: false, spicy: 1, glutenFree: false },
  { id: 103, name: "Dynamite Prawns", category: "non-veg starters", price: 550, image: "https://images.unsplash.com/photo-1559742811-822873691df8?auto=format&fit=crop&w=800&q=80", description: "Crispy fried prawns tossed in a fiery sriracha mayo.", isVeg: false, spicy: 3, glutenFree: false },
  { id: 104, name: "Mutton Seekh Kebab", category: "non-veg starters", price: 500, image: "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?auto=format&fit=crop&w=800&q=80", description: "Charcoal-grilled minced lamb skewers with robust spices.", isVeg: false, spicy: 2, glutenFree: true },

  // --- VEG MAIN COURSE ---
  { id: 4, name: "Decadent Paneer Butter Masala", category: "veg main", price: 480, image: "/images/veg_main.png", description: "Rich, creamy paneer butter masala served in a rustic clay pot.", isVeg: true, spicy: 1, glutenFree: true },
  { id: 105, name: "Smoked Dal Makhani", category: "veg main", price: 350, image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80", description: "Slow-cooked black lentils finished with fresh cream and butter.", isVeg: true, spicy: 0, glutenFree: true },
  { id: 106, name: "Mushroom Risotto", category: "veg main", price: 550, image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=800&q=80", description: "Creamy arborio rice with wild mushrooms and truffle essence.", isVeg: true, spicy: 0, glutenFree: true },

  // --- NON-VEG MAIN COURSE ---
  { id: 5, name: "Wood-Fired Ribeye Steak", category: "non-veg main", price: 1200, image: "/images/non_veg_main.png", description: "Juicy medium-rare steak with roasted garlic and rosemary.", isVeg: false, spicy: 0, glutenFree: true },
  { id: 107, name: "Grilled Atlantic Salmon", category: "non-veg main", price: 950, image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80", description: "Pan-seared salmon served on a bed of asparagus and lemon butter sauce.", isVeg: false, spicy: 0, glutenFree: true },
  { id: 108, name: "Chicken Chettinad", category: "non-veg main", price: 480, image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=800&q=80", description: "Fiercely spicy South Indian chicken curry with roasted coconut.", isVeg: false, spicy: 3, glutenFree: true },

  // --- ITALIAN ---
  { id: 6, name: "Truffle Parmesan Pasta", category: "italian", price: 650, image: "/images/italian_pasta.png", description: "Luxurious creamy truffle fettuccine pasta with fresh parmesan shavings.", isVeg: true, spicy: 0, glutenFree: false },
  { id: 7, name: "Margherita Neapolitan", category: "italian", price: 550, image: "/images/pizza.jpg", description: "Authentic wood-fired pizza with San Marzano tomatoes and fresh mozzarella.", isVeg: true, spicy: 0, glutenFree: false },
  { id: 109, name: "Burrata & Heirloom Tomato", category: "italian", price: 480, image: "https://images.unsplash.com/photo-1592415499556-74fcb7f18667?auto=format&fit=crop&w=800&q=80", description: "Fresh burrata cheese with heirloom tomatoes and basil pesto.", isVeg: true, spicy: 0, glutenFree: true },

  // --- FRENCH ---
  { id: 8, name: "Classic Ratatouille", category: "french", price: 500, image: "/images/french_dish.png", description: "Elegant French ratatouille beautifully plated with a herb garnish.", isVeg: true, spicy: 0, glutenFree: true },
  { id: 110, name: "French Onion Soup", category: "french", price: 400, image: "https://images.unsplash.com/photo-1548943487-a2e4e43b4859?auto=format&fit=crop&w=800&q=80", description: "Caramelized onion soup topped with melted gruyere crostini.", isVeg: true, spicy: 0, glutenFree: false },
  { id: 111, name: "Duck Confit", category: "french", price: 1100, image: "https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?auto=format&fit=crop&w=800&q=80", description: "Slow-cooked duck leg with potato puree and cherry gastrique.", isVeg: false, spicy: 0, glutenFree: true },

  // --- CHINESE ---
  { id: 9, name: "Steamed Dim Sum Basket", category: "chinese", price: 400, image: "/images/chinese_dimsum.png", description: "Delicate and juicy dim sum dumplings served in a steaming bamboo basket.", isVeg: true, spicy: 0, glutenFree: false },
  { id: 112, name: "Kung Pao Chicken", category: "chinese", price: 450, image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=800&q=80", description: "Spicy stir-fried chicken with peanuts and dry red chilies.", isVeg: false, spicy: 2, glutenFree: false },
  { id: 113, name: "Chili Garlic Noodles", category: "chinese", price: 350, image: "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=800&q=80", description: "Wok-tossed noodles in a fiery homemade chili garlic oil.", isVeg: true, spicy: 3, glutenFree: false },

  // --- SOUTH INDIAN ---
  { id: 10, name: "Golden Masala Dosa", category: "south indian", price: 250, image: "/images/south_indian_dosa.png", description: "Crispy South Indian dosa served on a banana leaf with vibrant chutneys.", isVeg: true, spicy: 1, glutenFree: true },
  { id: 114, name: "Mini Ghee Idlis", category: "south indian", price: 180, image: "https://images.unsplash.com/photo-1589301760014-d929f39ce9b1?auto=format&fit=crop&w=800&q=80", description: "Steamed rice cakes drenched in ghee and spicy podi.", isVeg: true, spicy: 0, glutenFree: true },
  { id: 115, name: "Malabar Fish Curry", category: "south indian", price: 550, image: "https://images.unsplash.com/photo-1626779848523-2895abecf8e5?auto=format&fit=crop&w=800&q=80", description: "Tangy and spicy coconut-based fish curry with curry leaves.", isVeg: false, spicy: 2, glutenFree: true },

  // --- NORTH INDIAN ---
  { id: 11, name: "Royal Butter Chicken", category: "north indian", price: 600, image: "/images/north_indian_curry.png", description: "Rich, creamy butter chicken curry served in a copper bowl with garlic naan.", isVeg: false, spicy: 1, glutenFree: true },
  { id: 12, name: "Hyderabadi Dum Biryani", category: "north indian", price: 550, image: "/images/biryani.jpg", description: "Fragrant basmati rice layered with slow-cooked marinated meat and spices.", isVeg: false, spicy: 2, glutenFree: true },
  { id: 116, name: "Amritsari Chole Kulche", category: "north indian", price: 300, image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80", description: "Spicy chickpea curry served with soft, fluffy kulchas.", isVeg: true, spicy: 2, glutenFree: false },

  // --- DESSERTS ---
  { id: 13, name: "Dark Chocolate Lava Cake", category: "desserts", price: 350, image: "/images/adventure_hero.png", description: "Gooey chocolate center with vanilla bean ice cream.", isVeg: true, spicy: 0, glutenFree: false },
  { id: 117, name: "Classic Tiramisu", category: "desserts", price: 400, image: "https://images.unsplash.com/photo-1571115177098-24c42d640a92?auto=format&fit=crop&w=800&q=80", description: "Espresso-soaked ladyfingers layered with mascarpone cream.", isVeg: true, spicy: 0, glutenFree: false },
  { id: 118, name: "Saffron Rasmalai", category: "desserts", price: 250, image: "https://images.unsplash.com/photo-1624300629298-e9ad39c59524?auto=format&fit=crop&w=800&q=80", description: "Soft cottage cheese dumplings soaked in saffron-infused sweet milk.", isVeg: true, spicy: 0, glutenFree: true },

  // --- DRINKS ---
  { id: 14, name: "Neon Cyber Cocktail", category: "drinks", price: 450, image: "/images/adventure_underwater.png", description: "Electric blue signature mocktail with dry ice smoke.", isVeg: true, spicy: 0, glutenFree: true },
  { id: 119, name: "Matcha Boba Tea", category: "drinks", price: 300, image: "https://images.unsplash.com/photo-1558138838-86aaa220bc0d?auto=format&fit=crop&w=800&q=80", description: "Iced premium matcha green tea with chewy tapioca pearls.", isVeg: true, spicy: 0, glutenFree: true },
  { id: 120, name: "Watermelon Sugar Refresher", category: "drinks", price: 220, image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=800&q=80", description: "Fresh watermelon juice shaken with mint and sparkling water.", isVeg: true, spicy: 0, glutenFree: true }
];

export default dishes;