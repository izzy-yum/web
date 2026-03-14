const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing environment variables!');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const recipe = {
  name: 'Gluten Free Chicken Tikka Masala',
  slug: 'gluten-free-chicken-tikka-masala',
  description: 'Easy to make, packed with flavor and perfect for a family favorite dinner. This recipe is dairy free friendly, creamy and made with pantry staple ingredients.',
  protein: 'chicken',
  cuisine: 'indian',
  image_url: '/images/recipes/gluten-free-chicken-tikka-masala.jpg',
  prep_time_min: 20,
  cook_time_min: 30,
  total_time_min: 80,
  difficulty: 'Medium',
  default_servings: 4,

  equipment: [
    { equipment: 'Medium bowl', category: 'Prep', sort_order: 1 },
    { equipment: 'Large skillet', category: 'Cooking', sort_order: 2 },
    { equipment: 'Blender', category: 'Cooking', sort_order: 3 },
    { equipment: 'Chef knife', category: 'Prep', sort_order: 4 },
    { equipment: 'Cutting board', category: 'Prep', sort_order: 5 },
    { equipment: 'Measuring spoons', category: 'Measuring', sort_order: 6 },
    { equipment: 'Measuring cups', category: 'Measuring', sort_order: 7 },
    { equipment: 'Whisk', category: 'Prep', sort_order: 8 }
  ],

  ingredients: [
    // Chicken marinade (for 4 servings)
    { ingredient: 'boneless skinless chicken thighs', amount: 1.25, unit: 'lb', category: 'Proteins', notes: '', sort_order: 1 },
    { ingredient: 'plain yogurt', amount: 0.33, unit: 'cup', category: 'Dairy', notes: '', sort_order: 2 },
    { ingredient: 'minced garlic', amount: 1, unit: 'tsp', category: 'Produce', notes: 'for marinade', sort_order: 3 },
    { ingredient: 'fresh grated ginger', amount: 1, unit: 'tsp', category: 'Produce', notes: 'for marinade', sort_order: 4 },
    { ingredient: 'garam masala', amount: 1, unit: 'tsp', category: 'Pantry', notes: 'for marinade', sort_order: 5 },
    { ingredient: 'turmeric', amount: 0.5, unit: 'tsp', category: 'Pantry', notes: 'for marinade', sort_order: 6 },
    { ingredient: 'cumin', amount: 0.5, unit: 'tsp', category: 'Pantry', notes: 'for marinade', sort_order: 7 },
    { ingredient: 'salt', amount: 0.5, unit: 'tsp', category: 'Pantry', notes: 'for marinade', sort_order: 8 },
    { ingredient: 'butter', amount: 2, unit: 'tbsp', category: 'Dairy', notes: 'for cooking chicken', sort_order: 9 },

    // Sauce
    { ingredient: 'butter', amount: 2, unit: 'tbsp', category: 'Dairy', notes: 'for sauce', sort_order: 10 },
    { ingredient: 'yellow onion', amount: 1, unit: '', category: 'Produce', notes: 'diced', sort_order: 11 },
    { ingredient: 'minced garlic', amount: 1, unit: 'tbsp', category: 'Produce', notes: 'for sauce', sort_order: 12 },
    { ingredient: 'fresh grated ginger', amount: 2, unit: 'tsp', category: 'Produce', notes: 'for sauce', sort_order: 13 },
    { ingredient: 'brown sugar', amount: 1, unit: 'tsp', category: 'Pantry', notes: '', sort_order: 14 },
    { ingredient: 'garam masala', amount: 0.75, unit: 'tsp', category: 'Pantry', notes: 'for sauce', sort_order: 15 },
    { ingredient: 'cumin', amount: 0.75, unit: 'tsp', category: 'Pantry', notes: 'for sauce', sort_order: 16 },
    { ingredient: 'paprika', amount: 0.75, unit: 'tsp', category: 'Pantry', notes: '', sort_order: 17 },
    { ingredient: 'coriander', amount: 0.75, unit: 'tsp', category: 'Pantry', notes: '', sort_order: 18 },
    { ingredient: 'turmeric', amount: 0.5, unit: 'tsp', category: 'Pantry', notes: 'for sauce', sort_order: 19 },
    { ingredient: 'salt', amount: 0.5, unit: 'tsp', category: 'Pantry', notes: 'for sauce', sort_order: 20 },
    { ingredient: 'tomato puree', amount: 1, unit: 'cup', category: 'Pantry', notes: 'or strained tomatoes', sort_order: 21 },
    { ingredient: 'heavy cream', amount: 0.5, unit: 'cup', category: 'Dairy', notes: 'can substitute coconut cream', sort_order: 22 },
    { ingredient: 'water', amount: 3, unit: 'tbsp', category: 'Pantry', notes: 'as needed to thin sauce', sort_order: 23 },
    { ingredient: 'fresh cilantro', amount: null, unit: 'to taste', category: 'Produce', notes: 'for garnish', sort_order: 24 }
  ],

  secondary_ingredients: [
    { ingredient: 'Garam Masala', slug: 'garam-masala' },
    { ingredient: 'Turmeric', slug: 'turmeric' },
    { ingredient: 'Cilantro', slug: 'cilantro' },
    { ingredient: 'Tomato', slug: 'tomato' }
  ],

  instructions: [
    // Mise en place
    { phase: 'mise_en_place', step_number: 1, instruction: 'Cut the chicken into about 1 inch cubes.', has_quantity: true },
    { phase: 'mise_en_place', step_number: 2, instruction: 'Add chicken to a bowl with the yogurt, garlic, ginger, garam masala, turmeric, cumin and salt. Mix well to combine, then cover and let marinate for 30 minutes.', has_quantity: true },

    // Cooking
    { phase: 'cooking', step_number: 1, instruction: 'Add 2 tablespoons of butter to a skillet and melt over high heat.', has_quantity: true },
    { phase: 'cooking', step_number: 2, instruction: 'Add the chicken and cook on each side for about 2-3 minutes. You want it to get a nice char.', has_quantity: false },
    { phase: 'cooking', step_number: 3, instruction: 'Set aside and wipe the pan down.', has_quantity: false, clean_as_you_go: 'Wipe pan clean' },
    { phase: 'cooking', step_number: 4, instruction: 'Add the other 2 tablespoons of butter to the pan and melt. Add in the diced onion and sauté for about 5-7 minutes.', has_quantity: true },
    { phase: 'cooking', step_number: 5, instruction: 'Mix in the garlic and ginger and sauté 1 more minute.', has_quantity: false },
    { phase: 'cooking', step_number: 6, instruction: 'Add in brown sugar, garam masala, cumin, paprika, coriander, turmeric, salt, tomato puree, and heavy cream. Simmer for 5 minutes.', has_quantity: true },
    { phase: 'cooking', step_number: 7, instruction: 'Transfer sauce to a blender and blend until smooth. It helps to keep the lid slightly ajar so heat can escape and start the blender on very low speed.', has_quantity: false },
    { phase: 'cooking', step_number: 8, instruction: 'Add the sauce back to the pan. If it is too thick, whisk in a couple tablespoons of water as needed then add in the chicken.', has_quantity: true },
    { phase: 'cooking', step_number: 9, instruction: 'Let everything simmer together for about 10 minutes to allow the flavors to blend.', has_quantity: false },

    // Plating
    { phase: 'plating', step_number: 1, instruction: 'Garnish with fresh cilantro. Serve with rice. Enjoy!', has_quantity: false }
  ]
};

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

async function uploadRecipe() {
  try {
    console.log('🍳 Uploading: Gluten Free Chicken Tikka Masala\n');

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
        image_url: recipe.image_url,
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

    if (equipmentError) throw equipmentError;
    console.log(`   ✅ Inserted ${recipe.equipment.length} equipment items`);

    // Insert ingredients
    const ingredientsData = recipe.ingredients.map(ing => ({
      recipe_id: recipeId,
      ...ing
    }));

    const { error: ingredientsError } = await supabase
      .from('recipe_ingredients')
      .insert(ingredientsData);

    if (ingredientsError) throw ingredientsError;
    console.log(`   ✅ Inserted ${recipe.ingredients.length} ingredients`);

    // Insert instructions
    const instructionsData = recipe.instructions.map(inst => ({
      recipe_id: recipeId,
      ...inst
    }));

    const { error: instructionsError } = await supabase
      .from('recipe_instructions')
      .insert(instructionsData);

    if (instructionsError) throw instructionsError;
    console.log(`   ✅ Inserted ${recipe.instructions.length} instructions`);

    // Insert secondary ingredients
    const secondaryData = recipe.secondary_ingredients.map(sec => ({
      recipe_id: recipeId,
      ...sec
    }));

    const { error: secondaryError } = await supabase
      .from('secondary_ingredients')
      .insert(secondaryData);

    if (secondaryError) throw secondaryError;
    console.log(`   ✅ Inserted ${recipe.secondary_ingredients.length} secondary ingredients`);

    console.log(`\n🎉 ${recipe.name} uploaded successfully!`);

  } catch (error) {
    console.error('❌ Upload failed:', error);
    process.exit(1);
  }
}

uploadRecipe();
