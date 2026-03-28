const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing environment variables!');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const recipe = {
  name: 'Gluten Free Fried Shrimp',
  slug: 'gluten-free-fried-shrimp',
  description: 'Delivers all the crunch and flavor you love about regular fried shrimp but without any gluten. These shrimp are coated in a perfectly seasoned, gluten-free batter that fries up light and crispy.',
  protein: 'shrimp',
  cuisine: 'american',
  imageFile: 'GlutenFreeFriedShrimp.jpg',
  prep_time_min: 5,
  cook_time_min: 10,
  total_time_min: 15,
  difficulty: 'Easy',
  default_servings: 4,

  equipment: [
    { equipment: 'Large mixing bowl', category: 'Prep', sort_order: 1 },
    { equipment: 'Large skillet', category: 'Cooking', sort_order: 2 },
    { equipment: 'Tongs', category: 'Cooking', sort_order: 3 },
    { equipment: 'Whisk', category: 'Prep', sort_order: 4 },
    { equipment: 'Measuring cups', category: 'Measuring', sort_order: 5 },
    { equipment: 'Measuring spoons', category: 'Measuring', sort_order: 6 }
  ],

  ingredients: [
    { ingredient: 'shrimp', amount: 1, unit: 'lb', category: 'Proteins', notes: 'peeled and deveined', sort_order: 1 },
    { ingredient: 'gluten-free flour', amount: 0.33, unit: 'cup', category: 'Pantry', notes: '', sort_order: 2 },
    { ingredient: 'egg', amount: 1, unit: '', category: 'Dairy', notes: '', sort_order: 3 },
    { ingredient: 'dairy free milk', amount: 2, unit: 'tbsp', category: 'Dairy', notes: '', sort_order: 4 },
    { ingredient: 'garlic powder', amount: 0.5, unit: 'tsp', category: 'Pantry', notes: '', sort_order: 5 },
    { ingredient: 'paprika', amount: 0.25, unit: 'tsp', category: 'Pantry', notes: '', sort_order: 6 },
    { ingredient: 'salt', amount: 0.25, unit: 'tsp', category: 'Pantry', notes: '', sort_order: 7 },
    { ingredient: 'pepper', amount: 0.25, unit: 'tsp', category: 'Pantry', notes: '', sort_order: 8 },
    { ingredient: 'avocado oil or olive oil', amount: null, unit: 'as needed', category: 'Pantry', notes: 'for frying', sort_order: 9 }
  ],

  secondary_ingredients: [
    { ingredient: 'Gluten-Free Flour', slug: 'gluten-free-flour' },
    { ingredient: 'Paprika', slug: 'paprika' },
    { ingredient: 'Garlic', slug: 'garlic' }
  ],

  instructions: [
    // Mise en place
    { phase: 'mise_en_place', step_number: 1, instruction: 'Whisk the egg in a large mixing bowl.', has_quantity: true },
    { phase: 'mise_en_place', step_number: 2, instruction: 'Add the gluten-free flour to the egg and whisk together. This should be a thick paste.', has_quantity: true },
    { phase: 'mise_en_place', step_number: 3, instruction: 'Whisk in the milk and the seasonings (garlic powder, paprika, salt, pepper). If the batter is still thick you can add another tablespoon of milk. It should be the consistency of pancake batter.', has_quantity: true },
    { phase: 'mise_en_place', step_number: 4, instruction: 'Add the shrimp to the bowl and stir to coat all the shrimp in the batter.', has_quantity: false },

    // Cooking
    { phase: 'cooking', step_number: 1, instruction: 'Add enough cooking oil to coat the bottom of a large skillet and heat to medium heat.', has_quantity: false },
    { phase: 'cooking', step_number: 2, instruction: 'Place the shrimp in an even layer trying not to overcrowd them. The batter will stick together if the shrimp are overcrowded.', has_quantity: false },
    { phase: 'cooking', step_number: 3, instruction: 'Cook for 4 minutes then using tongs flip the shrimp and cook for another 4 minutes or until the batter is golden brown.', has_quantity: true, clean_as_you_go: 'Turn off heat' },

    // Plating
    { phase: 'plating', step_number: 1, instruction: 'Serve immediately and enjoy!', has_quantity: false }
  ]
};

async function uploadImage(localPath, storagePath) {
  console.log(`📤 Uploading ${storagePath}...`);
  const fileBuffer = fs.readFileSync(localPath);

  const { data, error } = await supabase.storage
    .from('images')
    .upload('recipes/' + storagePath, fileBuffer, {
      contentType: 'image/jpeg',
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

async function uploadRecipe() {
  try {
    console.log(`🍳 Uploading: ${recipe.name}\n`);

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

    console.log(`\n🎉 ${recipe.name} uploaded successfully!`);

  } catch (error) {
    console.error(`❌ Error uploading ${recipe.name}:`, error);
    process.exit(1);
  }
}

uploadRecipe();
