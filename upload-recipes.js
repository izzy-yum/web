const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing environment variables!');
  console.error('Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Recipe data
const recipes = {
  sesameShrimp: {
    name: 'Sesame Shrimp Sushi Bowls',
    slug: 'sesame-shrimp-sushi-bowls',
    description: 'Beautifully assembled bowls featuring umeboshi sushi rice, loads of fresh veggies, grilled sesame shrimp skewers and a miso tahini dressing. An impressive meal for date-night in.',
    protein: 'shrimp',
    cuisine: 'japanese',
    image: 'recipes/japanese_shrimp_bowl.jpg',
    prep_time_min: 60,
    cook_time_min: 20,
    total_time_min: 80,
    difficulty: 'Medium',
    default_servings: 2,

    equipment: [
      { equipment: 'Medium bowl', category: 'Prep', sort_order: 1 },
      { equipment: 'Small bowl', category: 'Prep', sort_order: 2 },
      { equipment: 'Rice cooker or saucepan', category: 'Cooking', sort_order: 3 },
      { equipment: 'Large bowl or rimmed baking pan', category: 'Prep', sort_order: 4 },
      { equipment: 'Small saucepan', category: 'Cooking', sort_order: 5 },
      { equipment: 'Grill pan', category: 'Cooking', sort_order: 6 },
      { equipment: 'Skewers', category: 'Cooking', sort_order: 7 },
      { equipment: 'Chef knife', category: 'Prep', sort_order: 8 },
      { equipment: 'Cutting board', category: 'Prep', sort_order: 9 },
      { equipment: 'Whisk', category: 'Prep', sort_order: 10 }
    ],

    ingredients: [
      // Shrimp (divide by 2 for 2 servings)
      { ingredient: 'uncooked tail-on shrimp', amount: 0.375, unit: 'lb', category: 'Proteins', notes: '31-40 count', sort_order: 1 },
      { ingredient: 'sesame oil', amount: 0.5, unit: 'tsp', category: 'Pantry', notes: 'for shrimp', sort_order: 2 },
      { ingredient: 'pink sea salt', amount: 0.25, unit: 'tsp', category: 'Pantry', notes: '', sort_order: 3 },
      { ingredient: 'black pepper', amount: null, unit: 'pinch', category: 'Pantry', notes: '', sort_order: 4 },

      // Pickled Cabbage
      { ingredient: 'red cabbage', amount: 0.125, unit: 'head', category: 'Produce', notes: 'very thinly sliced/shredded', sort_order: 5 },
      { ingredient: 'ume vinegar', amount: 1, unit: 'tbsp', category: 'Pantry', notes: 'for pickled cabbage', sort_order: 6 },

      // Rice
      { ingredient: 'short grain white rice', amount: 0.75, unit: 'cup', category: 'Pantry', notes: '', sort_order: 7 },
      { ingredient: 'ume vinegar', amount: 2.67, unit: 'tbsp', category: 'Pantry', notes: 'for rice', sort_order: 8 },
      { ingredient: 'sugar', amount: 1.5, unit: 'tbsp', category: 'Pantry', notes: '', sort_order: 9 },
      { ingredient: 'shiso fumi furikake', amount: null, unit: 'to taste', category: 'Pantry', notes: 'pickled plum rice seasoning', sort_order: 10 },

      // Toppings
      { ingredient: 'nori sheets', amount: 2.5, unit: 'sheets', category: 'Pantry', notes: '', sort_order: 11 },
      { ingredient: 'pickled ginger', amount: null, unit: 'to taste', category: 'Pantry', notes: '', sort_order: 12 },
      { ingredient: 'french breakfast radishes', amount: null, unit: 'to taste', category: 'Produce', notes: 'thinly sliced', sort_order: 13 },
      { ingredient: 'watermelon radishes', amount: null, unit: 'to taste', category: 'Produce', notes: 'thinly sliced', sort_order: 14 },
      { ingredient: 'roasted beets', amount: null, unit: 'to taste', category: 'Produce', notes: 'diced', sort_order: 15 },
      { ingredient: 'colorful carrots', amount: null, unit: 'to taste', category: 'Produce', notes: 'thinly sliced or peeled into strips', sort_order: 16 },
      { ingredient: 'avocado', amount: 0.5, unit: '', category: 'Produce', notes: 'sliced or diced', sort_order: 17 },
      { ingredient: 'scallions', amount: null, unit: 'to taste', category: 'Produce', notes: 'thinly sliced', sort_order: 18 },

      // Dressing
      { ingredient: 'mellow white miso paste', amount: 1, unit: 'tbsp', category: 'Pantry', notes: 'heaping', sort_order: 19 },
      { ingredient: 'tahini', amount: 1, unit: 'tbsp', category: 'Pantry', notes: 'heaping', sort_order: 20 },
      { ingredient: 'hot water', amount: 2, unit: 'tbsp', category: 'Pantry', notes: 'plus more if needed', sort_order: 21 }
    ],

    secondary_ingredients: [
      { ingredient: 'Sesame', slug: 'sesame' },
      { ingredient: 'Miso', slug: 'miso' },
      { ingredient: 'Avocado', slug: 'avocado' },
      { ingredient: 'Nori', slug: 'nori' }
    ],

    instructions: [
      // Mise en place
      { phase: 'mise_en_place', step_number: 1, instruction: 'Combine shrimp, sesame oil, pink salt and a few grinds black pepper in a medium bowl. Toss to combine and allow to marinate for one hour.', has_quantity: true },
      { phase: 'mise_en_place', step_number: 2, instruction: 'While shrimp marinates, make the Pickled Cabbage. Combine shredded red cabbage and ume vinegar in a small bowl. Stir to combine thoroughly. Allow to marinate until ready to serve (or covered in the fridge for up to 3 days).', has_quantity: true },
      { phase: 'mise_en_place', step_number: 3, instruction: 'While shrimp marinates, prepare the Umeboshi Rice. Cook short-grain rice in a rice cooker or following package instructions. In a small saucepan, heat ume vinegar and sugar until sugar is just dissolved. When rice is finished cooking, turn out into a large bowl or rimmed baking pan, spread out as much as possible, and drizzle ume vinegar mixture over. Gently fold vinegar into hot rice.', has_quantity: true },
      { phase: 'mise_en_place', step_number: 4, instruction: 'Sprinkle rice generously with Shiso Fumi Furikake (or your favorite furikake blend); then gently fold into rice again. Spread rice out again to cool slightly while you prepare remaining ingredients.', has_quantity: false },
      { phase: 'mise_en_place', step_number: 5, instruction: 'Thinly slice and chop vegetables to top the bowls. Set aside.', has_quantity: false },
      { phase: 'mise_en_place', step_number: 6, instruction: 'Whisk together miso tahini dressing ingredients, adding a little more water if needed to achieve a drizzleable consistency.', has_quantity: true, clean_as_you_go: 'Wash whisk and small bowl' },

      // Cooking
      { phase: 'cooking', step_number: 1, instruction: 'Heat grill pan over a med-high flame. Thread shrimp onto skewers (about 4 shrimp per skewer). Place shrimp skewers directly onto grill pan and sear for about 1 minute per side. Set aside to cool slightly.', has_quantity: false, clean_as_you_go: 'Turn off heat after cooking' },

      // Plating
      { phase: 'plating', step_number: 1, instruction: 'Load up bowls with Umeboshi Rice, pickled cabbage, pickled ginger, thinly sliced veggies, avocado and sliced scallions. Top with shrimp skewers (2-3 per person). Serve Miso Tahini Dressing over the top, along with a sprinkle of furikake if desired. Enjoy!', has_quantity: false }
    ]
  },

  vietnameseChicken: {
    name: 'Vietnamese Chicken Rice Noodle Bowl',
    slug: 'vietnamese-chicken-rice-noodle-bowl',
    description: 'Fresh and flavorful Vietnamese rice noodle bowl with lemongrass marinated chicken, fresh herbs, and nuoc cham dipping sauce. Mix and match with what you like and what you have.',
    protein: 'chicken',
    cuisine: 'vietnamese',
    image: 'recipes/vietnamese-chicken-rice-noodle-bowl.jpg',
    prep_time_min: 30,
    cook_time_min: 15,
    total_time_min: 75,
    difficulty: 'Medium',
    default_servings: 4,

    equipment: [
      { equipment: 'Large measuring cup or Mason jar', category: 'Prep', sort_order: 1 },
      { equipment: 'Large bowl', category: 'Prep', sort_order: 2 },
      { equipment: 'Medium bowls for marinating', category: 'Prep', sort_order: 3 },
      { equipment: 'Barbecue or grill pan', category: 'Cooking', sort_order: 4 },
      { equipment: 'Chef knife', category: 'Prep', sort_order: 5 },
      { equipment: 'Cutting board', category: 'Prep', sort_order: 6 },
      { equipment: 'Measuring cups', category: 'Measuring', sort_order: 7 },
      { equipment: 'Measuring spoons', category: 'Measuring', sort_order: 8 }
    ],

    ingredients: [
      // Lemongrass Marinade
      { ingredient: 'lemon juice', amount: 6, unit: 'tbsp', category: 'Produce', notes: 'from 2 large lemons', sort_order: 1 },
      { ingredient: 'fish sauce', amount: 0.25, unit: 'cup', category: 'Pantry', notes: '', sort_order: 2 },
      { ingredient: 'sugar', amount: 3, unit: 'tbsp', category: 'Pantry', notes: '', sort_order: 3 },
      { ingredient: 'gluten-free soy sauce', amount: 2, unit: 'tbsp', category: 'Pantry', notes: '', sort_order: 4 },
      { ingredient: 'chile sauce', amount: 1, unit: 'tsp', category: 'Pantry', notes: 'Sambal oelek', sort_order: 5 },
      { ingredient: 'black pepper', amount: 0.5, unit: 'tsp', category: 'Pantry', notes: '', sort_order: 6 },
      { ingredient: 'garlic cloves', amount: 3, unit: '', category: 'Produce', notes: 'finely minced', sort_order: 7 },
      { ingredient: 'ginger', amount: 3, unit: 'tbsp', category: 'Produce', notes: 'chopped', sort_order: 8 },
      { ingredient: 'lemongrass', amount: 2, unit: 'tbsp', category: 'Produce', notes: 'frozen, chopped (or 4 fresh stalks)', sort_order: 9 },

      // Chicken
      { ingredient: 'chicken breast halves', amount: 2, unit: '', category: 'Proteins', notes: 'or 8 oz chicken filets', sort_order: 10 },

      // Noodle Bowl
      { ingredient: 'thin rice vermicelli noodles', amount: 250, unit: 'g', category: 'Pantry', notes: 'rice sticks', sort_order: 11 },
      { ingredient: 'carrot', amount: 1, unit: 'cup', category: 'Produce', notes: 'sliced thin or julienned', sort_order: 12 },
      { ingredient: 'cucumber', amount: 1, unit: 'cup', category: 'Produce', notes: 'finely julienned', sort_order: 13 },
      { ingredient: 'lettuce', amount: 1, unit: 'cup', category: 'Produce', notes: 'finely sliced', sort_order: 14 },
      { ingredient: 'cilantro, mint and/or Thai basil', amount: 1, unit: 'cup', category: 'Produce', notes: 'chopped', sort_order: 15 },
      { ingredient: 'chopped salted peanuts', amount: 0.5, unit: 'cup', category: 'Pantry', notes: '', sort_order: 16 },

      // Nuoc Cham Dipping Sauce
      { ingredient: 'crushed red chile flakes', amount: 0.5, unit: 'tsp', category: 'Pantry', notes: '', sort_order: 17 },
      { ingredient: 'rice vinegar', amount: 0.5, unit: 'tbsp', category: 'Pantry', notes: '', sort_order: 18 },
      { ingredient: 'fish sauce', amount: 0.5, unit: 'cup', category: 'Pantry', notes: 'for sauce', sort_order: 19 },
      { ingredient: 'lime juice', amount: 0.25, unit: 'cup', category: 'Produce', notes: '', sort_order: 20 },
      { ingredient: 'warm water', amount: 0.75, unit: 'cup', category: 'Pantry', notes: '', sort_order: 21 },
      { ingredient: 'garlic cloves', amount: 2, unit: '', category: 'Produce', notes: 'minced, for sauce', sort_order: 22 },
      { ingredient: 'sugar', amount: 0.5, unit: 'cup', category: 'Pantry', notes: 'for sauce', sort_order: 23 }
    ],

    secondary_ingredients: [
      { ingredient: 'Lemongrass', slug: 'lemongrass' },
      { ingredient: 'Rice Noodles', slug: 'rice-noodles' },
      { ingredient: 'Peanuts', slug: 'peanuts' },
      { ingredient: 'Lime', slug: 'lime' }
    ],

    instructions: [
      // Mise en place
      { phase: 'mise_en_place', step_number: 1, instruction: 'Make Lemongrass Marinade: Combine lemon juice, fish sauce, sugar, soy sauce, chile sauce, black pepper, garlic, ginger, and lemongrass in a large measuring cup. Stir until sugar is dissolved.', has_quantity: true },
      { phase: 'mise_en_place', step_number: 2, instruction: 'Pour marinade over chicken in a bowl. Marinate at least 30 minutes or overnight. (Advance prep tip: Meat can be frozen in the marinade.)', has_quantity: false },
      { phase: 'mise_en_place', step_number: 3, instruction: 'Make Nuoc Cham Dipping Sauce: Combine chile flakes, rice vinegar, fish sauce, lime juice, warm water, garlic, and sugar in a large measuring cup or Mason jar. Stir until sugar is dissolved. Set aside. (Advance prep tip: Make the whole recipe, label the jar and get it in the fridge. Keeps indefinitely.)', has_quantity: true },
      { phase: 'mise_en_place', step_number: 4, instruction: 'Place rice noodles in large bowl. Cover with boiling water and let sit for 5 minutes. Drain, rinse briefly and set aside. Can be prepared a day in advance.', has_quantity: true },
      { phase: 'mise_en_place', step_number: 5, instruction: 'Organize all toppings (carrot, cucumber, lettuce, herbs) for quick assembly.', has_quantity: false, clean_as_you_go: 'Wash cutting board and knife' },

      // Cooking
      { phase: 'cooking', step_number: 1, instruction: 'Preheat barbecue then cook chicken breast 6 minutes per side. Alternately cook using a broiler, sauté pan or barbecue.', has_quantity: false, clean_as_you_go: 'Turn off heat after cooking' },

      // Plating
      { phase: 'plating', step_number: 1, instruction: 'Divide ingredients into 4 bowls as follows: Noodles, carrot, cucumber, lettuce, fresh herbs.', has_quantity: true },
      { phase: 'plating', step_number: 2, instruction: 'Top with cooked chicken. Sprinkle with peanuts and serve with individual dishes of nuoc cham on the side.', has_quantity: false },
      { phase: 'plating', step_number: 3, instruction: 'Pour sauce over the whole bowl and enjoy!', has_quantity: false }
    ]
  }
};

// Copy for pork and shrimp variants
recipes.vietnamesePork = {
  ...recipes.vietnameseChicken,
  name: 'Vietnamese Pork Rice Noodle Bowl',
  slug: 'vietnamese-pork-rice-noodle-bowl',
  description: 'Fresh and flavorful Vietnamese rice noodle bowl with lemongrass marinated pork, fresh herbs, and nuoc cham dipping sauce. Mix and match with what you like and what you have.',
  protein: 'pork',
  ingredients: recipes.vietnameseChicken.ingredients.map(ing => {
    if (ing.ingredient === 'chicken breast halves') {
      return { ...ing, ingredient: 'pork chop', notes: 'or 6 oz pork tenderloin, cubed or sliced thin' };
    }
    return ing;
  })
};

recipes.vietnameseShrimp = {
  ...recipes.vietnameseChicken,
  name: 'Vietnamese Shrimp Rice Noodle Bowl',
  slug: 'vietnamese-shrimp-rice-noodle-bowl',
  description: 'Fresh and flavorful Vietnamese rice noodle bowl with lemongrass marinated shrimp, fresh herbs, and nuoc cham dipping sauce. Mix and match with what you like and what you have.',
  protein: 'shrimp',
  ingredients: recipes.vietnameseChicken.ingredients.map(ing => {
    if (ing.ingredient === 'chicken breast halves') {
      return { ...ing, ingredient: 'large shrimp', amount: 12, notes: '16-20 count' };
    }
    return ing;
  }),
  instructions: recipes.vietnameseChicken.instructions.map(inst => {
    if (inst.instruction.includes('chicken breast 6 minutes')) {
      return { ...inst, instruction: 'Preheat barbecue then cook shrimp on skewers 2 minutes per side. Alternately cook using a broiler, sauté pan or barbecue.' };
    }
    if (inst.instruction.includes('cooked chicken')) {
      return { ...inst, instruction: 'Top with cooked shrimp. Sprinkle with peanuts and serve with individual dishes of nuoc cham on the side.' };
    }
    return inst;
  })
};

async function uploadImage(localPath, storagePath) {
  console.log(`📤 Uploading ${localPath}...`);
  const fileBuffer = fs.readFileSync(localPath);
  const { data, error } = await supabase.storage
    .from('images')
    .upload('recipes/' + storagePath, fileBuffer, {
      contentType: 'image/jpeg',
      upsert: true
    });

  if (error) {
    console.error(`❌ Error uploading ${storagePath}:`, error);
    throw error;
  }

  const { data: publicUrl } = supabase.storage
    .from('images')
    .getPublicUrl('recipes/' + storagePath);

  console.log(`✅ Uploaded to: ${publicUrl.publicUrl}`);
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
  console.log(`\n🍳 Uploading: ${recipe.name}`);

  // Get protein and cuisine IDs
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
      image_url: recipe.imageUrl, // Will be set after upload
      prep_time_min: recipe.prep_time_min,
      cook_time_min: recipe.cook_time_min,
      total_time_min: recipe.total_time_min,
      difficulty: recipe.difficulty,
      default_servings: recipe.default_servings
    })
    .select()
    .single();

  if (recipeError) {
    console.error('❌ Error inserting recipe:', recipeError);
    throw recipeError;
  }

  const recipeId = recipeData.id;
  console.log(`   ✅ Recipe created: ${recipeId}`);

  // Insert equipment
  const equipmentData = recipe.equipment.map(eq => ({
    recipe_id: recipeId,
    ...eq
  }));

  const { error: equipmentError } = await supabase
    .from('recipe_equipment')
    .insert(equipmentData);

  if (equipmentError) {
    console.error('❌ Error inserting equipment:', equipmentError);
    throw equipmentError;
  }
  console.log(`   ✅ Inserted ${recipe.equipment.length} equipment items`);

  // Insert ingredients
  const ingredientsData = recipe.ingredients.map(ing => ({
    recipe_id: recipeId,
    ...ing
  }));

  const { error: ingredientsError } = await supabase
    .from('recipe_ingredients')
    .insert(ingredientsData);

  if (ingredientsError) {
    console.error('❌ Error inserting ingredients:', ingredientsError);
    throw ingredientsError;
  }
  console.log(`   ✅ Inserted ${recipe.ingredients.length} ingredients`);

  // Insert instructions
  const instructionsData = recipe.instructions.map(inst => ({
    recipe_id: recipeId,
    ...inst
  }));

  const { error: instructionsError } = await supabase
    .from('recipe_instructions')
    .insert(instructionsData);

  if (instructionsError) {
    console.error('❌ Error inserting instructions:', instructionsError);
    throw instructionsError;
  }
  console.log(`   ✅ Inserted ${recipe.instructions.length} instructions`);

  // Insert secondary ingredients
  const secondaryData = recipe.secondary_ingredients.map(sec => ({
    recipe_id: recipeId,
    ...sec
  }));

  const { error: secondaryError } = await supabase
    .from('secondary_ingredients')
    .insert(secondaryData);

  if (secondaryError) {
    console.error('❌ Error inserting secondary ingredients:', secondaryError);
    throw secondaryError;
  }
  console.log(`   ✅ Inserted ${recipe.secondary_ingredients.length} secondary ingredients`);

  console.log(`✅ ${recipe.name} uploaded successfully!\n`);
}

async function main() {
  try {
    console.log('🚀 Starting recipe upload...\n');

    // Upload images
    console.log('📤 Uploading images...');
    const japaneseImageUrl = await uploadImage(
      '/Users/edwin/izzy_yum/recipes/japanese_shrimp_bowl.jpg',
      'japanese_shrimp_bowl.jpg'
    );

    const vietnameseImageUrl = await uploadImage(
      '/Users/edwin/izzy_yum/recipes/vietnamese-chicken-rice-noodle-bowl.jpg',
      'vietnamese-chicken-rice-noodle-bowl.jpg'
    );

    // Set image URLs
    recipes.sesameShrimp.imageUrl = japaneseImageUrl;
    recipes.vietnameseChicken.imageUrl = vietnameseImageUrl;
    recipes.vietnamesePork.imageUrl = vietnameseImageUrl;
    recipes.vietnameseShrimp.imageUrl = vietnameseImageUrl;

    // Upload recipes
    await uploadRecipe('sesameShrimp');
    await uploadRecipe('vietnameseChicken');
    await uploadRecipe('vietnamesePork');
    await uploadRecipe('vietnameseShrimp');

    console.log('🎉 All recipes uploaded successfully!');

  } catch (error) {
    console.error('❌ Upload failed:', error);
    process.exit(1);
  }
}

main();
