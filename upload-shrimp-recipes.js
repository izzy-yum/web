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
  goanShrimpCurry: {
    name: 'Goan Shrimp Curry',
    slug: 'goan-shrimp-curry',
    description: 'Quick and flavorful Indian shrimp curry with coconut milk, tomatoes, and aromatic spices. Ready in just 20 minutes!',
    protein: 'shrimp',
    cuisine: 'indian',
    imageFile: 'Goan-Shrimp.jpg',
    prep_time_min: 10,
    cook_time_min: 10,
    total_time_min: 20,
    difficulty: 'Easy',
    default_servings: 4,

    equipment: [
      { equipment: 'Large skillet', category: 'Cooking', sort_order: 1 },
      { equipment: 'Grater', category: 'Prep', sort_order: 2 },
      { equipment: 'Chef knife', category: 'Prep', sort_order: 3 },
      { equipment: 'Cutting board', category: 'Prep', sort_order: 4 },
      { equipment: 'Measuring spoons', category: 'Measuring', sort_order: 5 },
      { equipment: 'Measuring cups', category: 'Measuring', sort_order: 6 },
      { equipment: 'Wooden spoon', category: 'Cooking', sort_order: 7 }
    ],

    ingredients: [
      { ingredient: 'coconut oil', amount: 2, unit: 'tbsp', category: 'Pantry', notes: '', sort_order: 1 },
      { ingredient: 'red onion', amount: 1, unit: '', category: 'Produce', notes: 'medium, finely diced', sort_order: 2 },
      { ingredient: 'garlic cloves', amount: 3, unit: '', category: 'Produce', notes: 'grated', sort_order: 3 },
      { ingredient: 'ginger', amount: 1, unit: 'inch', category: 'Produce', notes: 'peeled and grated', sort_order: 4 },
      { ingredient: 'tomato puree', amount: 1, unit: 'cup', category: 'Pantry', notes: '', sort_order: 5 },
      { ingredient: 'curry powder', amount: 1, unit: 'tbsp', category: 'Pantry', notes: '', sort_order: 6 },
      { ingredient: 'paprika', amount: 1.5, unit: 'tsp', category: 'Pantry', notes: '', sort_order: 7 },
      { ingredient: 'kosher or fine sea salt', amount: 0.75, unit: 'tsp', category: 'Pantry', notes: '', sort_order: 8 },
      { ingredient: 'cayenne pepper', amount: 0.5, unit: 'tsp', category: 'Pantry', notes: '', sort_order: 9 },
      { ingredient: 'coconut milk', amount: 1.5, unit: 'cup', category: 'Pantry', notes: '', sort_order: 10 },
      { ingredient: 'tamarind concentrate', amount: 1, unit: 'tsp', category: 'Pantry', notes: '', sort_order: 11 },
      { ingredient: 'extra-large shrimp', amount: 1, unit: 'lb', category: 'Proteins', notes: 'peeled and deveined', sort_order: 12 },
      { ingredient: 'basmati rice or cauliflower rice', amount: null, unit: 'for serving', category: 'Pantry', notes: '', sort_order: 13 }
    ],

    secondary_ingredients: [
      { ingredient: 'Curry Powder', slug: 'curry-powder' },
      { ingredient: 'Coconut Milk', slug: 'coconut-milk' },
      { ingredient: 'Tamarind', slug: 'tamarind' },
      { ingredient: 'Ginger', slug: 'ginger' }
    ],

    instructions: [
      // Mise en place
      { phase: 'mise_en_place', step_number: 1, instruction: 'Finely dice the red onion. Grate the garlic cloves and ginger.', has_quantity: true },

      // Cooking
      { phase: 'cooking', step_number: 1, instruction: 'Heat the coconut oil in a large skillet over medium-high heat. Add the onion and sauté until it is tender and translucent, about 3-4 minutes.', has_quantity: true },
      { phase: 'cooking', step_number: 2, instruction: 'Stir in the grated garlic and ginger and cook until fragrant, about 30 seconds.', has_quantity: false },
      { phase: 'cooking', step_number: 3, instruction: 'Pour in the tomato puree, then stir in the curry powder, paprika, salt, and cayenne pepper. Cook until the mixture starts to thicken, about 2-3 minutes.', has_quantity: true },
      { phase: 'cooking', step_number: 4, instruction: 'Pour the coconut milk and tamarind concentrate into the skillet and stir well. Bring the sauce to a gentle simmer, then add the shrimp.', has_quantity: true },
      { phase: 'cooking', step_number: 5, instruction: 'Cook until the shrimp are opaque and cooked through, about 4-5 minutes.', has_quantity: false, clean_as_you_go: 'Turn off heat' },

      // Plating
      { phase: 'plating', step_number: 1, instruction: 'Serve over basmati rice or cauliflower rice.', has_quantity: false }
    ]
  },

  gochujangHoneyShrimp: {
    name: 'Gochujang Honey Shrimp',
    slug: 'gochujang-honey-shrimp',
    description: 'Sweet, spicy sesame shrimp dish with Korean flavors. Quick and easy shrimp recipe made in 30 minutes or less with crispy coating and gochujang sauce.',
    protein: 'shrimp',
    cuisine: 'korean',
    imageFile: 'Gochujang-Shrimp.jpg',
    prep_time_min: 10,
    cook_time_min: 20,
    total_time_min: 30,
    difficulty: 'Easy',
    default_servings: 4,

    equipment: [
      { equipment: 'Large mixing bowl', category: 'Prep', sort_order: 1 },
      { equipment: 'Small bowl', category: 'Prep', sort_order: 2 },
      { equipment: 'Large pan or skillet', category: 'Cooking', sort_order: 3 },
      { equipment: 'Whisk', category: 'Prep', sort_order: 4 },
      { equipment: 'Measuring spoons', category: 'Measuring', sort_order: 5 },
      { equipment: 'Measuring cups', category: 'Measuring', sort_order: 6 }
    ],

    ingredients: [
      // Shrimp
      { ingredient: 'jumbo shrimp', amount: 1, unit: 'lb', category: 'Proteins', notes: 'peeled and deveined', sort_order: 1 },
      { ingredient: 'cornstarch', amount: 0.33, unit: 'cup', category: 'Pantry', notes: 'or potato starch', sort_order: 2 },
      { ingredient: 'garlic powder', amount: 0.5, unit: 'tsp', category: 'Pantry', notes: '', sort_order: 3 },
      { ingredient: 'black pepper', amount: 0.125, unit: 'tsp', category: 'Pantry', notes: '', sort_order: 4 },
      { ingredient: 'vegetable oil', amount: 0.25, unit: 'cup', category: 'Pantry', notes: 'or any neutral oil', sort_order: 5 },

      // Gochujang Sauce
      { ingredient: 'gochujang', amount: 1, unit: 'tbsp', category: 'Pantry', notes: '', sort_order: 6 },
      { ingredient: 'honey', amount: 1, unit: 'tbsp', category: 'Pantry', notes: '', sort_order: 7 },
      { ingredient: 'sesame oil', amount: 0.5, unit: 'tbsp', category: 'Pantry', notes: '', sort_order: 8 },
      { ingredient: 'soy sauce', amount: 0.5, unit: 'tbsp', category: 'Pantry', notes: 'regular or gluten-free', sort_order: 9 },
      { ingredient: 'garlic', amount: 2, unit: 'clove', category: 'Produce', notes: 'minced', sort_order: 10 },
      { ingredient: 'cornstarch', amount: 1, unit: 'tbsp', category: 'Pantry', notes: 'for sauce', sort_order: 11 },
      { ingredient: 'water', amount: 0.5, unit: 'cup', category: 'Pantry', notes: 'cold', sort_order: 12 },

      // Garnish
      { ingredient: 'green onion', amount: 1, unit: '', category: 'Produce', notes: 'finely chopped, optional garnish', sort_order: 13 },
      { ingredient: 'sesame seeds', amount: 0.5, unit: 'tsp', category: 'Pantry', notes: 'optional garnish', sort_order: 14 }
    ],

    secondary_ingredients: [
      { ingredient: 'Gochujang', slug: 'gochujang' },
      { ingredient: 'Honey', slug: 'honey' },
      { ingredient: 'Sesame', slug: 'sesame' },
      { ingredient: 'Green Onion', slug: 'green-onion' }
    ],

    instructions: [
      // Mise en place
      { phase: 'mise_en_place', step_number: 1, instruction: 'In a large mixing bowl, add shrimp, cornstarch, garlic powder, and black pepper. Gently mix until each shrimp is well coated in the cornstarch seasoning.', has_quantity: true },
      { phase: 'mise_en_place', step_number: 2, instruction: 'In a small bowl, whisk together gochujang, honey, sesame oil, soy sauce, minced garlic, cornstarch, and cold water until well combined. Set aside.', has_quantity: true },

      // Cooking
      { phase: 'cooking', step_number: 1, instruction: 'Heat vegetable oil in a large pan on medium-high heat. Fry shrimp until they are crispy and golden on both sides.', has_quantity: true },
      { phase: 'cooking', step_number: 2, instruction: 'Reduce to low-medium heat. Mix sauce again to lift up the cornstarch at the bottom of the bowl and pour it over the shrimp.', has_quantity: false },
      { phase: 'cooking', step_number: 3, instruction: 'Gently toss shrimp with the sauce. Do not over toss or it can cause the coating to fall off the shrimp.', has_quantity: false, clean_as_you_go: 'Turn off heat' },

      // Plating
      { phase: 'plating', step_number: 1, instruction: 'Garnish with green onions and sesame seeds if desired and enjoy!', has_quantity: false }
    ]
  },

  saltPepperShrimp: {
    name: 'Salt & Pepper Shrimp',
    slug: 'salt-pepper-shrimp',
    description: 'Crispy shrimp tossed with garlic, jalapeños, and green onions. Classic Chinese-style salt and pepper shrimp that is gluten-free and paleo friendly.',
    protein: 'shrimp',
    cuisine: 'chinese',
    imageFile: 'Salt-Pepper-Shrimp.jpg',
    prep_time_min: 10,
    cook_time_min: 15,
    total_time_min: 25,
    difficulty: 'Easy',
    default_servings: 4,

    equipment: [
      { equipment: 'Large skillet', category: 'Cooking', sort_order: 1 },
      { equipment: 'Paper towel lined plate', category: 'Prep', sort_order: 2 },
      { equipment: 'Medium bowl', category: 'Prep', sort_order: 3 },
      { equipment: 'Chef knife', category: 'Prep', sort_order: 4 },
      { equipment: 'Cutting board', category: 'Prep', sort_order: 5 },
      { equipment: 'Measuring cups', category: 'Measuring', sort_order: 6 },
      { equipment: 'Measuring spoons', category: 'Measuring', sort_order: 7 }
    ],

    ingredients: [
      { ingredient: 'shrimp', amount: 1, unit: 'lb', category: 'Proteins', notes: 'deveined with tail on or keep shell on', sort_order: 1 },
      { ingredient: 'cornstarch', amount: 0.5, unit: 'cup', category: 'Pantry', notes: 'or potato starch or tapioca flour', sort_order: 2 },
      { ingredient: 'avocado oil', amount: null, unit: 'as needed', category: 'Pantry', notes: 'covering bottom ¼ inch high', sort_order: 3 },
      { ingredient: 'garlic cloves', amount: 6, unit: '', category: 'Produce', notes: 'roughly chopped', sort_order: 4 },
      { ingredient: 'jalapeños', amount: 2, unit: '', category: 'Produce', notes: 'sliced', sort_order: 5 },
      { ingredient: 'green onions', amount: 2, unit: '', category: 'Produce', notes: 'sliced', sort_order: 6 },
      { ingredient: 'kosher salt', amount: 1, unit: 'tsp', category: 'Pantry', notes: 'more to taste', sort_order: 7 },
      { ingredient: 'fresh ground black pepper', amount: 0.5, unit: 'tsp', category: 'Pantry', notes: '', sort_order: 8 },
      { ingredient: 'ground white pepper', amount: 0.5, unit: 'tsp', category: 'Pantry', notes: '', sort_order: 9 }
    ],

    secondary_ingredients: [
      { ingredient: 'Garlic', slug: 'garlic' },
      { ingredient: 'Jalapeño', slug: 'jalapeno' },
      { ingredient: 'White Pepper', slug: 'white-pepper' },
      { ingredient: 'Green Onion', slug: 'green-onion' }
    ],

    instructions: [
      // Mise en place
      { phase: 'mise_en_place', step_number: 1, instruction: 'Pat shrimp dry and then toss in cornstarch. Shake off excess and set aside.', has_quantity: true },
      { phase: 'mise_en_place', step_number: 2, instruction: 'Roughly chop garlic cloves. Slice jalapeños and green onions. Set aside.', has_quantity: false },

      // Cooking
      { phase: 'cooking', step_number: 1, instruction: 'Preheat a large skillet over medium heat with enough avocado oil covering the bottom and ¼ inch high.', has_quantity: true },
      { phase: 'cooking', step_number: 2, instruction: 'Once the oil is heated add the shrimp and cook on each side for 1-2 minutes or until shrimp is cooked through. Don\'t overcrowd the skillet. Cook in batches if you need to.', has_quantity: false },
      { phase: 'cooking', step_number: 3, instruction: 'Place shrimp on a paper towel lined plate and set aside.', has_quantity: false },
      { phase: 'cooking', step_number: 4, instruction: 'Remove the oil from the skillet leaving only 1-1½ tbsp of avocado oil.', has_quantity: true, clean_as_you_go: 'Discard excess oil' },
      { phase: 'cooking', step_number: 5, instruction: 'Add the chopped garlic, sliced jalapeños, and green onions to the skillet and stir fry for 2-3 minutes or until jalapeños soften.', has_quantity: false },
      { phase: 'cooking', step_number: 6, instruction: 'Mix in the kosher salt, fresh ground black pepper, and white pepper.', has_quantity: true },
      { phase: 'cooking', step_number: 7, instruction: 'Add in the shrimp and toss until shrimp is heated through and well combined with everything.', has_quantity: false, clean_as_you_go: 'Turn off heat' },

      // Plating
      { phase: 'plating', step_number: 1, instruction: 'Serve and enjoy!', has_quantity: false }
    ]
  }
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

    await uploadRecipe('goanShrimpCurry');
    await uploadRecipe('gochujangHoneyShrimp');
    await uploadRecipe('saltPepperShrimp');

    console.log('🎉 All 3 shrimp recipes uploaded successfully!');

  } catch (error) {
    console.error('❌ Upload failed:', error);
    process.exit(1);
  }
}

main();
