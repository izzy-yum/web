const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing environment variables!');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const recipes = {
  chickenTacos: {
    name: 'Gluten Free Chicken Tacos',
    slug: 'gluten-free-chicken-tacos',
    description: 'Easy recipe for gluten free tacos made with perfectly seasoned chicken, tomatoes, simple cole slaw, cheese, and spicy sour cream.',
    protein: 'chicken',
    cuisine: 'mexican',
    imageFile: 'chicken-tacos.jpg',
    prep_time_min: 15,
    cook_time_min: 12,
    total_time_min: 60,
    difficulty: 'Easy',
    default_servings: 5,

    equipment: [
      { equipment: 'Small bowl', category: 'Prep', sort_order: 1 },
      { equipment: 'Medium mixing bowl', category: 'Prep', sort_order: 2 },
      { equipment: 'Nonstick wok or large skillet', category: 'Cooking', sort_order: 3 },
      { equipment: 'Chef knife', category: 'Prep', sort_order: 4 },
      { equipment: 'Cutting board', category: 'Prep', sort_order: 5 },
      { equipment: 'Whisk', category: 'Prep', sort_order: 6 },
      { equipment: 'Measuring spoons', category: 'Measuring', sort_order: 7 },
      { equipment: 'Instant read thermometer', category: 'Cooking', sort_order: 8 }
    ],

    ingredients: [
      // Taco seasoning
      { ingredient: 'chipotle chili pepper', amount: 1, unit: 'tsp', category: 'Pantry', notes: 'or more to taste', sort_order: 1 },
      { ingredient: 'kosher salt', amount: 1, unit: 'tsp', category: 'Pantry', notes: '', sort_order: 2 },
      { ingredient: 'smoked Spanish paprika', amount: 1, unit: 'tsp', category: 'Pantry', notes: '', sort_order: 3 },
      { ingredient: 'onion powder', amount: 0.5, unit: 'tsp', category: 'Pantry', notes: '', sort_order: 4 },
      { ingredient: 'garlic powder', amount: 1, unit: 'tsp', category: 'Pantry', notes: '', sort_order: 5 },
      { ingredient: 'ground cumin', amount: 1, unit: 'tsp', category: 'Pantry', notes: '', sort_order: 6 },
      { ingredient: 'dried oregano', amount: 0.5, unit: 'tsp', category: 'Pantry', notes: '', sort_order: 7 },
      { ingredient: 'cornstarch', amount: 2, unit: 'tbsp', category: 'Pantry', notes: '', sort_order: 8 },

      // Chicken
      { ingredient: 'skinless boneless chicken breast', amount: 1.25, unit: 'lb', category: 'Proteins', notes: '', sort_order: 9 },
      { ingredient: 'grapeseed oil', amount: 2, unit: 'tbsp', category: 'Pantry', notes: 'or canola, vegetable, peanut oil', sort_order: 10 },

      // Cole slaw
      { ingredient: 'mayonnaise', amount: 2, unit: 'tbsp', category: 'Pantry', notes: '', sort_order: 11 },
      { ingredient: 'white wine vinegar', amount: 1, unit: 'tsp', category: 'Pantry', notes: '', sort_order: 12 },
      { ingredient: 'kosher salt', amount: 0.125, unit: 'tsp', category: 'Pantry', notes: 'for slaw', sort_order: 13 },
      { ingredient: 'shredded red cabbage', amount: 4, unit: 'oz', category: 'Produce', notes: '', sort_order: 14 },

      // Spicy sour cream
      { ingredient: 'sour cream', amount: 0.5, unit: 'cup', category: 'Dairy', notes: '', sort_order: 15 },
      { ingredient: 'Sriracha', amount: 1, unit: 'tbsp', category: 'Pantry', notes: '', sort_order: 16 },

      // Serving
      { ingredient: 'small gluten-free corn tortillas', amount: 15, unit: '', category: 'Pantry', notes: '', sort_order: 17 },
      { ingredient: 'large tomato', amount: 1, unit: '', category: 'Produce', notes: 'chopped and seeded, optional', sort_order: 18 },
      { ingredient: 'Cotija cheese', amount: 2, unit: 'oz', category: 'Dairy', notes: 'crumbled, optional', sort_order: 19 },
      { ingredient: 'lime', amount: 1, unit: '', category: 'Produce', notes: 'sliced into wedges, optional', sort_order: 20 }
    ],

    secondary_ingredients: [
      { ingredient: 'Corn Tortillas', slug: 'corn-tortillas' },
      { ingredient: 'Chipotle', slug: 'chipotle' },
      { ingredient: 'Lime', slug: 'lime' },
      { ingredient: 'Cotija Cheese', slug: 'cotija-cheese' }
    ],

    instructions: [
      // Mise en place
      { phase: 'mise_en_place', step_number: 1, instruction: 'Make taco seasoning: In a small bowl, place chipotle chili pepper, kosher salt, smoked paprika, onion powder, garlic powder, ground cumin, dried oregano, and cornstarch. Whisk to combine. Set aside.', has_quantity: true },
      { phase: 'mise_en_place', step_number: 2, instruction: 'Trim the chicken breasts of any fat. Slice the breasts into thin slivers, each about 1/8 inch thick and 1 to 2 inches long, and set aside.', has_quantity: false },
      { phase: 'mise_en_place', step_number: 3, instruction: 'In a medium-size mixing bowl, place two tablespoons of the taco seasoning. Add the sliced chicken breasts and toss to combine. Add the remaining taco seasoning mixture and toss again to combine.', has_quantity: true },
      { phase: 'mise_en_place', step_number: 4, instruction: 'Let the chicken rest at room temperature for about 30 minutes while you make the cole slaw.', has_quantity: false },
      { phase: 'mise_en_place', step_number: 5, instruction: 'Make cole slaw: In a medium-size mixing bowl, place the mayonnaise, vinegar, and salt. Whisk to combine well. Add the shredded red cabbage and toss to coat completely in the dressing. Place the cole slaw in the refrigerator to chill.', has_quantity: true },
      { phase: 'mise_en_place', step_number: 6, instruction: 'Make spicy sour cream: In a small bowl, place the sour cream and Sriracha. Whisk until smooth.', has_quantity: true, clean_as_you_go: 'Wash whisk and small bowl' },

      // Cooking
      { phase: 'cooking', step_number: 1, instruction: 'Drizzle the grapeseed oil into a nonstick wok or other large skillet, and turn the heat on to medium. Add the prepared chicken pieces to the pan and separate them from one another a bit.', has_quantity: true },
      { phase: 'cooking', step_number: 2, instruction: 'Cover the pan and allow the chicken to cook, undisturbed, for 2 minutes. Uncover the pan, stir the chicken around, flipping the pieces over as best you can.', has_quantity: false },
      { phase: 'cooking', step_number: 3, instruction: 'Replace the cover and continue to cook for another 3 minutes. Uncover the pan, add more taco seasoning by the quarter teaspoonful if you like, and stir the chicken briefly.', has_quantity: false },
      { phase: 'cooking', step_number: 4, instruction: 'Allow the chicken to finish cooking, mostly undisturbed, until it darkens in color and registers at least 165°F on an instant read thermometer.', has_quantity: false, clean_as_you_go: 'Turn off heat' },

      // Plating
      { phase: 'plating', step_number: 1, instruction: 'Warm the corn tortillas in a 300°F oven on a baking sheet for about 5 minutes, or wrap in a moistened paper towel and microwave on high for 20-30 seconds.', has_quantity: false },
      { phase: 'plating', step_number: 2, instruction: 'To assemble each taco, hold a warmed corn tortilla in the palm of one hand. Remove the cole slaw from the refrigerator and place about 1 tablespoon of it in a single line down the center.', has_quantity: true },
      { phase: 'plating', step_number: 3, instruction: 'Top the slaw with about 1 1/2 tablespoons of the cooked chicken, then with some chopped tomatoes and crumbled cheese. Finish with some spicy sour cream.', has_quantity: true },
      { phase: 'plating', step_number: 4, instruction: 'Repeat with the remaining corn tortillas and fillings. Drizzle the filled tacos with some extra Sriracha and serve immediately with the lime wedges.', has_quantity: false }
    ]
  },

  mexicanChickenVeggieBake: {
    name: 'Mexican Chicken Vegetable Bake',
    slug: 'mexican-chicken-vegetable-bake',
    description: 'High protein and high fiber all-in-one flavor explosion. Baked chicken with cauliflower, black beans, corn, and a creamy chipotle sauce.',
    protein: 'chicken',
    cuisine: 'mexican',
    imageFile: 'mexican chicken vegetable bake.jpg',
    prep_time_min: 15,
    cook_time_min: 40,
    total_time_min: 55,
    difficulty: 'Easy',
    default_servings: 6,

    equipment: [
      { equipment: 'Large mixing bowl', category: 'Prep', sort_order: 1 },
      { equipment: 'Mini food processor', category: 'Prep', sort_order: 2 },
      { equipment: '12 inch skillet', category: 'Cooking', sort_order: 3 },
      { equipment: '9x13 inch baking dish', category: 'Cooking', sort_order: 4 },
      { equipment: 'Chef knife', category: 'Prep', sort_order: 5 },
      { equipment: 'Cutting board', category: 'Prep', sort_order: 6 }
    ],

    ingredients: [
      // Sauce
      { ingredient: 'eggs', amount: 2, unit: '', category: 'Dairy', notes: '', sort_order: 1 },
      { ingredient: 'cottage cheese', amount: 1, unit: 'cup', category: 'Dairy', notes: 'heaping, 210g', sort_order: 2 },
      { ingredient: 'chipotles in adobo sauce', amount: 1.5, unit: '', category: 'Pantry', notes: '1-2 chipotles', sort_order: 3 },
      { ingredient: 'lime', amount: 0.5, unit: '', category: 'Produce', notes: 'large, juiced', sort_order: 4 },
      { ingredient: 'honey', amount: 1, unit: 'tsp', category: 'Pantry', notes: '', sort_order: 5 },

      // Base
      { ingredient: 'olive oil', amount: 2, unit: 'tbsp', category: 'Pantry', notes: 'divided', sort_order: 6 },
      { ingredient: 'cauliflower', amount: 1, unit: 'head', category: 'Produce', notes: 'large, cut into small florets', sort_order: 7 },
      { ingredient: 'chicken breasts', amount: 1.5, unit: 'lb', category: 'Proteins', notes: 'cubed', sort_order: 8 },
      { ingredient: 'garlic powder', amount: null, unit: 'to taste', category: 'Pantry', notes: '', sort_order: 9 },
      { ingredient: 'onion powder', amount: null, unit: 'to taste', category: 'Pantry', notes: '', sort_order: 10 },
      { ingredient: 'salt', amount: null, unit: 'to taste', category: 'Pantry', notes: '', sort_order: 11 },

      // Add ins
      { ingredient: 'black beans', amount: 15, unit: 'oz', category: 'Pantry', notes: 'rinsed and drained', sort_order: 12 },
      { ingredient: 'cherry tomatoes', amount: 1, unit: 'pint', category: 'Produce', notes: '', sort_order: 13 },
      { ingredient: 'corn', amount: 1, unit: 'cup', category: 'Produce', notes: '', sort_order: 14 },
      { ingredient: 'shredded cheddar cheese', amount: 8, unit: 'oz', category: 'Dairy', notes: '', sort_order: 15 },

      // Toppings
      { ingredient: 'jalapeño', amount: 1, unit: '', category: 'Produce', notes: 'sliced', sort_order: 16 },
      { ingredient: 'shredded colby jack cheese', amount: 5, unit: 'oz', category: 'Dairy', notes: '', sort_order: 17 },
      { ingredient: 'avocado', amount: null, unit: 'to taste', category: 'Produce', notes: 'for garnish', sort_order: 18 },
      { ingredient: 'fresh cilantro', amount: null, unit: 'to taste', category: 'Produce', notes: 'for garnish', sort_order: 19 },
      { ingredient: 'chili pepper flakes', amount: null, unit: 'to taste', category: 'Pantry', notes: 'for garnish', sort_order: 20 }
    ],

    secondary_ingredients: [
      { ingredient: 'Chipotle', slug: 'chipotle' },
      { ingredient: 'Black Beans', slug: 'black-beans' },
      { ingredient: 'Corn', slug: 'corn' },
      { ingredient: 'Cilantro', slug: 'cilantro' }
    ],

    instructions: [
      // Mise en place
      { phase: 'mise_en_place', step_number: 1, instruction: 'Make sauce: To a mini food processor, add the eggs, cottage cheese, chipotle peppers, lime juice and honey. Pulse until smooth. Set aside.', has_quantity: true },
      { phase: 'mise_en_place', step_number: 2, instruction: 'Preheat oven to 375°F.', has_quantity: false },
      { phase: 'mise_en_place', step_number: 3, instruction: 'Season chicken cubes generously with salt, garlic powder and onion powder.', has_quantity: false },

      // Cooking
      { phase: 'cooking', step_number: 1, instruction: 'In a large skillet, heat 1 tbsp olive oil on medium high. Add in small cauliflower florets and sear for 4 minutes flipping halfway through. Season with salt and pepper to taste. Set aside when done.', has_quantity: true },
      { phase: 'cooking', step_number: 2, instruction: 'Add the remaining tbsp olive oil and chicken pieces to your pan. Cook until golden brown on all sides, about 5-6 minutes.', has_quantity: true, clean_as_you_go: 'Turn off heat' },
      { phase: 'cooking', step_number: 3, instruction: 'To a large bowl, add in the chicken, cauliflower, sauce, black beans, corn, cherry tomatoes, and 8 oz shredded cheddar cheese. Stir to combine all.', has_quantity: true },
      { phase: 'cooking', step_number: 4, instruction: 'Transfer this mixture to a 9x13 inch baking dish and spread out evenly. Top with 5 ounces shredded colby jack cheese and sliced jalapeños.', has_quantity: true },
      { phase: 'cooking', step_number: 5, instruction: 'Bake for 35 minutes.', has_quantity: false },

      // Plating
      { phase: 'plating', step_number: 1, instruction: 'Garnish with chopped fresh cilantro and chili pepper flakes. Serve with sliced avocado.', has_quantity: false }
    ]
  },

  mexicanStreetCornChickenBake: {
    name: 'Mexican Street Corn Chicken Bake',
    slug: 'mexican-street-corn-chicken-bake',
    description: 'High protein, creamy and satisfying dinner. The flavors and spices will have you coming back for more! Gluten-free and packed with sweet corn.',
    protein: 'chicken',
    cuisine: 'mexican',
    imageFile: 'mexican-chicken-street-corn-bake-recipe.jpg',
    prep_time_min: 15,
    cook_time_min: 45,
    total_time_min: 60,
    difficulty: 'Easy',
    default_servings: 8,

    equipment: [
      { equipment: 'Large skillet', category: 'Cooking', sort_order: 1 },
      { equipment: 'Mini food processor', category: 'Prep', sort_order: 2 },
      { equipment: '9x13 inch baking dish', category: 'Cooking', sort_order: 3 },
      { equipment: 'Cutting board', category: 'Prep', sort_order: 4 },
      { equipment: 'Chef knife', category: 'Prep', sort_order: 5 }
    ],

    ingredients: [
      // Main
      { ingredient: 'olive oil', amount: 2, unit: 'tbsp', category: 'Pantry', notes: 'divided', sort_order: 1 },
      { ingredient: 'scallions', amount: 2, unit: '', category: 'Produce', notes: 'diced', sort_order: 2 },
      { ingredient: 'red bell pepper', amount: 1, unit: '', category: 'Produce', notes: 'medium, diced', sort_order: 3 },
      { ingredient: 'jalapeño', amount: 1, unit: '', category: 'Produce', notes: 'small, diced', sort_order: 4 },
      { ingredient: 'frozen sweet corn', amount: 3, unit: 'cup', category: 'Produce', notes: '', sort_order: 5 },
      { ingredient: 'salt', amount: null, unit: 'to taste', category: 'Pantry', notes: '', sort_order: 6 },
      { ingredient: 'boneless skinless chicken breasts', amount: 1.75, unit: 'lb', category: 'Proteins', notes: 'cubed small', sort_order: 7 },
      { ingredient: 'garlic powder', amount: null, unit: 'to taste', category: 'Pantry', notes: '', sort_order: 8 },
      { ingredient: 'onion powder', amount: null, unit: 'to taste', category: 'Pantry', notes: '', sort_order: 9 },
      { ingredient: 'chili powder', amount: null, unit: 'to taste', category: 'Pantry', notes: '', sort_order: 10 },
      { ingredient: 'shredded mexi blend cheese', amount: 1.5, unit: 'cup', category: 'Dairy', notes: '', sort_order: 11 },

      // Sauce
      { ingredient: 'eggs', amount: 2, unit: '', category: 'Dairy', notes: '', sort_order: 12 },
      { ingredient: 'cottage cheese', amount: 1, unit: 'cup', category: 'Dairy', notes: '210g', sort_order: 13 },
      { ingredient: 'kewpie mayo', amount: 0.25, unit: 'cup', category: 'Pantry', notes: '', sort_order: 14 },
      { ingredient: 'lime', amount: 0.5, unit: '', category: 'Produce', notes: 'juiced', sort_order: 15 },
      { ingredient: 'garlic cloves', amount: 2, unit: '', category: 'Produce', notes: '', sort_order: 16 },
      { ingredient: 'fresh cilantro', amount: 3, unit: 'tbsp', category: 'Produce', notes: '', sort_order: 17 },
      { ingredient: 'chili powder', amount: 0.5, unit: 'tsp', category: 'Pantry', notes: 'for sauce', sort_order: 18 },

      // Garnish
      { ingredient: 'fresh cilantro', amount: null, unit: 'to taste', category: 'Produce', notes: 'for garnish', sort_order: 19 },
      { ingredient: 'avocado', amount: null, unit: 'to taste', category: 'Produce', notes: 'for garnish', sort_order: 20 },
      { ingredient: 'cotija cheese', amount: null, unit: 'to taste', category: 'Dairy', notes: 'for garnish', sort_order: 21 }
    ],

    secondary_ingredients: [
      { ingredient: 'Sweet Corn', slug: 'sweet-corn' },
      { ingredient: 'Cilantro', slug: 'cilantro' },
      { ingredient: 'Lime', slug: 'lime' },
      { ingredient: 'Cotija Cheese', slug: 'cotija-cheese' }
    ],

    instructions: [
      // Mise en place
      { phase: 'mise_en_place', step_number: 1, instruction: 'Preheat oven to 350°F.', has_quantity: false },
      { phase: 'mise_en_place', step_number: 2, instruction: 'Season chicken cubes generously with salt, garlic powder, onion powder and chili powder.', has_quantity: false },
      { phase: 'mise_en_place', step_number: 3, instruction: 'Make sauce: In a mini food processor, add in the eggs, cottage cheese, mayo, lime juice, garlic, cilantro, chili powder and salt. Pulse together until smooth.', has_quantity: true, clean_as_you_go: 'Wash food processor' },

      // Cooking
      { phase: 'cooking', step_number: 1, instruction: 'Heat 1 tbsp of olive oil in a large skillet over medium-high heat. Add in the scallions, red bell pepper, jalapeño and sauté for 2 minutes. Next, add in the corn and sauté for 4 minutes. Transfer to a plate and set aside.', has_quantity: true },
      { phase: 'cooking', step_number: 2, instruction: 'Add the remaining 1 tbsp olive oil and chicken pieces to your pan. Cook until golden brown on all sides, for about 5-6 minutes. Set aside.', has_quantity: true },
      { phase: 'cooking', step_number: 3, instruction: 'In a 9x13 inch baking dish, add in the chicken pieces, 2/3 of the vegetable mixture, sauce, and 1 cup shredded mexi blend cheese. Stir to combine. Spread out evenly.', has_quantity: true },
      { phase: 'cooking', step_number: 4, instruction: 'Add the remaining corn mixture on top and add a little shredded cheese around its border.', has_quantity: false },
      { phase: 'cooking', step_number: 5, instruction: 'Bake for 35 minutes uncovered or until golden brown on top.', has_quantity: false },

      // Plating
      { phase: 'plating', step_number: 1, instruction: 'Garnish with cilantro, avocado and cotija cheese.', has_quantity: false }
    ]
  },

  sheetPanMediterraneanShrimp: {
    name: 'Sheet Pan Mediterranean Shrimp and Vegetables',
    slug: 'sheet-pan-mediterranean-shrimp-vegetables',
    description: 'Healthy, low carb, easy meal that cooks in just 15 minutes! Jumbo shrimp with roasted Mediterranean vegetables, artichokes, olives, and feta cheese.',
    protein: 'shrimp',
    cuisine: 'mediterranean',
    imageFile: 'Sheet-Pan-Mediterranean-Shrimp-and-Veggies.jpg.webp',
    prep_time_min: 15,
    cook_time_min: 15,
    total_time_min: 30,
    difficulty: 'Easy',
    default_servings: 5,

    equipment: [
      { equipment: 'Half sheet pan', category: 'Cooking', sort_order: 1 },
      { equipment: 'Aluminum foil', category: 'Prep', sort_order: 2 },
      { equipment: 'Mixing bowl', category: 'Prep', sort_order: 3 },
      { equipment: 'Chef knife', category: 'Prep', sort_order: 4 },
      { equipment: 'Cutting board', category: 'Prep', sort_order: 5 }
    ],

    ingredients: [
      // Vegetables
      { ingredient: 'red onion', amount: 1, unit: '', category: 'Produce', notes: 'small, sliced', sort_order: 1 },
      { ingredient: 'orange bell pepper', amount: 1, unit: '', category: 'Produce', notes: 'seeded then sliced', sort_order: 2 },
      { ingredient: 'asparagus', amount: 0.5, unit: 'bunch', category: 'Produce', notes: 'ends trimmed, cut into thirds', sort_order: 3 },
      { ingredient: 'grape or cherry tomatoes', amount: 10, unit: 'oz', category: 'Produce', notes: '', sort_order: 4 },
      { ingredient: 'grilled or marinated artichoke hearts', amount: 14, unit: 'oz', category: 'Pantry', notes: 'drained, Mezzetta brand recommended', sort_order: 5 },
      { ingredient: 'pitted kalamata olives', amount: 0.5, unit: 'cup', category: 'Pantry', notes: '', sort_order: 6 },
      { ingredient: 'extra virgin olive oil', amount: 3, unit: 'tbsp', category: 'Pantry', notes: 'divided', sort_order: 7 },
      { ingredient: 'Italian seasoning', amount: 2, unit: 'tsp', category: 'Pantry', notes: '', sort_order: 8 },
      { ingredient: 'garlic powder', amount: 0.5, unit: 'tsp', category: 'Pantry', notes: '', sort_order: 9 },
      { ingredient: 'salt and pepper', amount: null, unit: 'to taste', category: 'Pantry', notes: '', sort_order: 10 },

      // Shrimp
      { ingredient: 'jumbo shrimp', amount: 1, unit: 'lb', category: 'Proteins', notes: '16/20 count, peeled and deveined', sort_order: 11 },
      { ingredient: 'lemon', amount: 0.5, unit: '', category: 'Produce', notes: 'juiced', sort_order: 12 },

      // Toppings
      { ingredient: 'crumbled feta cheese', amount: 0.5, unit: 'cup', category: 'Dairy', notes: '', sort_order: 13 },
      { ingredient: 'chopped parsley', amount: null, unit: 'to taste', category: 'Produce', notes: 'for garnish, optional', sort_order: 14 }
    ],

    secondary_ingredients: [
      { ingredient: 'Artichoke', slug: 'artichoke' },
      { ingredient: 'Kalamata Olives', slug: 'kalamata-olives' },
      { ingredient: 'Feta Cheese', slug: 'feta-cheese' },
      { ingredient: 'Lemon', slug: 'lemon' }
    ],

    instructions: [
      // Mise en place
      { phase: 'mise_en_place', step_number: 1, instruction: 'Preheat oven to 450 degrees then line a half sheet pan with foil.', has_quantity: false },
      { phase: 'mise_en_place', step_number: 2, instruction: 'Add red onion, bell pepper, asparagus, tomatoes, artichoke hearts, and kalamata olives onto the sheet pan. Drizzle with 2 Tablespoons extra virgin olive oil, the Italian seasoning, garlic powder, salt, and pepper.', has_quantity: true },
      { phase: 'mise_en_place', step_number: 3, instruction: 'Use your fingertips to toss vegetables to evenly coat then spread into an even layer.', has_quantity: false },
      { phase: 'mise_en_place', step_number: 4, instruction: 'Pat shrimp very dry then add to a mixing bowl with remaining 1 Tablespoon extra virgin olive oil, the juice of 1/2 lemon, salt, and pepper. Toss with your fingertips to evenly coat.', has_quantity: true },

      // Cooking
      { phase: 'cooking', step_number: 1, instruction: 'Roast vegetables for 8 minutes.', has_quantity: false },
      { phase: 'cooking', step_number: 2, instruction: 'Stir vegetables then nestle shrimp onto the sheet pan and roast for an additional 6-7 minutes or until cooked through.', has_quantity: false },

      // Plating
      { phase: 'plating', step_number: 1, instruction: 'Top with feta cheese and chopped parsley if using, then scoop onto plates and serve.', has_quantity: false }
    ]
  }
};

async function uploadImage(localPath, storagePath) {
  console.log(`📤 Uploading ${storagePath}...`);
  const fileBuffer = fs.readFileSync(localPath);

  const { data, error } = await supabase.storage
    .from('images')
    .upload('recipes/' + storagePath, fileBuffer, {
      contentType: storagePath.endsWith('.webp') ? 'image/webp' : 'image/jpeg',
      upsert: true
    });

  if (error) throw error;

  const { data: publicUrl } = supabase.storage
    .from('images')
    .getPublicUrl('recipes/' + storagePath);

  console.log(`   ✅ Uploaded to: ${publicUrl.publicUrl}`);
  return publicUrl.publicUrl;
}

async function getProteinId(slug) {
  const { data, error } = await supabase
    .from('proteins')
    .select('id')
    .eq('slug', slug)
    .single();
  if (error) throw error;
  return data.id;
}

async function getCuisineId(slug) {
  const { data, error } = await supabase
    .from('cuisines')
    .select('id')
    .eq('slug', slug)
    .single();
  if (error) throw error;
  return data.id;
}

async function uploadRecipe(recipeKey) {
  const recipe = recipes[recipeKey];

  try {
    console.log(`\n🍳 Uploading: ${recipe.name}`);

    // Upload image
    const imageUrl = await uploadImage(
      `/Users/edwin/izzy_yum/recipes/${recipe.imageFile}`,
      recipe.imageFile
    );

    // Get IDs
    const proteinId = await getProteinId(recipe.protein);
    const cuisineId = await getCuisineId(recipe.cuisine);

    console.log(`   Protein ID: ${proteinId}`);
    console.log(`   Cuisine ID: ${cuisineId}`);

    // Insert recipe
    const { data: recipeData, error: recipeError } = await supabase
      .from('recipes')
      .insert({
        name: recipe.name,
        slug: recipe.slug,
        description: recipe.description,
        protein_id: proteinId,
        cuisine_id: cuisineId,
        image_url: imageUrl,
        prep_time_min: recipe.prep_time_min,
        cook_time_min: recipe.cook_time_min,
        total_time_min: recipe.total_time_min,
        difficulty: recipe.difficulty,
        default_servings: recipe.default_servings
      })
      .select()
      .single();

    if (recipeError) throw recipeError;

    const recipeId = recipeData.id;
    console.log(`   ✅ Recipe created: ${recipeId}`);

    // Insert equipment
    const equipmentData = recipe.equipment.map(eq => ({ recipe_id: recipeId, ...eq }));
    await supabase.from('recipe_equipment').insert(equipmentData);
    console.log(`   ✅ Inserted ${recipe.equipment.length} equipment items`);

    // Insert ingredients
    const ingredientsData = recipe.ingredients.map(ing => ({ recipe_id: recipeId, ...ing }));
    await supabase.from('recipe_ingredients').insert(ingredientsData);
    console.log(`   ✅ Inserted ${recipe.ingredients.length} ingredients`);

    // Insert instructions
    const instructionsData = recipe.instructions.map(inst => ({ recipe_id: recipeId, ...inst }));
    await supabase.from('recipe_instructions').insert(instructionsData);
    console.log(`   ✅ Inserted ${recipe.instructions.length} instructions`);

    // Insert secondary ingredients
    const secondaryData = recipe.secondary_ingredients.map(sec => ({ recipe_id: recipeId, ...sec }));
    await supabase.from('secondary_ingredients').insert(secondaryData);
    console.log(`   ✅ Inserted ${recipe.secondary_ingredients.length} secondary ingredients`);

    console.log(`✅ ${recipe.name} uploaded successfully!\n`);

  } catch (error) {
    console.error(`❌ Error uploading ${recipe.name}:`, error);
    throw error;
  }
}

async function main() {
  try {
    console.log('🚀 Starting recipe uploads...\n');

    await uploadRecipe('chickenTacos');
    await uploadRecipe('mexicanChickenVeggieBake');
    await uploadRecipe('mexicanStreetCornChickenBake');
    await uploadRecipe('sheetPanMediterraneanShrimp');

    console.log('🎉 All recipes uploaded successfully!');

  } catch (error) {
    console.error('❌ Upload failed:', error);
    process.exit(1);
  }
}

main();
