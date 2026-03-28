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
  mediterraneanChicken: {
    name: 'Mediterranean Chicken',
    slug: 'mediterranean-chicken',
    description: 'Easy Mediterranean chicken recipe requiring little prep and only 20 minutes to cook. Perfect one skillet meal loaded with Mediterranean flavors.',
    protein: 'chicken',
    cuisine: 'mediterranean',
    imageFile: 'Mediterranean-chicken-recipe.jpg',
    prep_time_min: 10,
    cook_time_min: 15,
    total_time_min: 25,
    difficulty: 'Easy',
    default_servings: 4,

    equipment: [
      { equipment: 'Large cast iron skillet', category: 'Cooking', sort_order: 1 },
      { equipment: 'Chef knife', category: 'Prep', sort_order: 2 },
      { equipment: 'Cutting board', category: 'Prep', sort_order: 3 },
      { equipment: 'Measuring spoons', category: 'Measuring', sort_order: 4 },
      { equipment: 'Measuring cups', category: 'Measuring', sort_order: 5 },
      { equipment: 'Lid or aluminum foil', category: 'Cooking', sort_order: 6 }
    ],

    ingredients: [
      { ingredient: 'boneless skinless chicken breasts', amount: 4, unit: '', category: 'Proteins', notes: '', sort_order: 1 },
      { ingredient: 'minced garlic or garlic paste', amount: 2, unit: 'tbsp', category: 'Produce', notes: '', sort_order: 2 },
      { ingredient: 'kosher salt', amount: null, unit: 'to taste', category: 'Pantry', notes: '', sort_order: 3 },
      { ingredient: 'black pepper', amount: null, unit: 'to taste', category: 'Pantry', notes: '', sort_order: 4 },
      { ingredient: 'dried oregano', amount: 1, unit: 'tbsp', category: 'Pantry', notes: 'divided', sort_order: 5 },
      { ingredient: 'extra virgin olive oil', amount: 2, unit: 'tbsp', category: 'Pantry', notes: '', sort_order: 6 },
      { ingredient: 'dry white wine', amount: 0.5, unit: 'cup', category: 'Pantry', notes: '', sort_order: 7 },
      { ingredient: 'lemon', amount: 1, unit: '', category: 'Produce', notes: 'large, juiced', sort_order: 8 },
      { ingredient: 'chicken broth', amount: 0.5, unit: 'cup', category: 'Pantry', notes: '', sort_order: 9 },
      { ingredient: 'red onion', amount: 1, unit: '', category: 'Produce', notes: 'medium, finely chopped', sort_order: 10 },
      { ingredient: 'small tomatoes', amount: 4, unit: '', category: 'Produce', notes: 'diced, about 1½ cups', sort_order: 11 },
      { ingredient: 'sliced green olives', amount: 0.25, unit: 'cup', category: 'Pantry', notes: '', sort_order: 12 },
      { ingredient: 'fresh parsley', amount: null, unit: 'handful', category: 'Produce', notes: 'stems removed, leaves chopped', sort_order: 13 },
      { ingredient: 'crumbled feta cheese', amount: null, unit: 'to taste', category: 'Dairy', notes: 'optional', sort_order: 14 }
    ],

    secondary_ingredients: [
      { ingredient: 'Lemon', slug: 'lemon' },
      { ingredient: 'Green Olives', slug: 'green-olives' },
      { ingredient: 'Feta Cheese', slug: 'feta-cheese' },
      { ingredient: 'Oregano', slug: 'oregano' }
    ],

    instructions: [
      // Mise en place
      { phase: 'mise_en_place', step_number: 1, instruction: 'Pat the chicken breasts dry. Make three shallow slits on each side of the chicken breast.', has_quantity: false },
      { phase: 'mise_en_place', step_number: 2, instruction: 'Rub the garlic on both sides of the chicken, pushing some garlic into the slits you made. Season the chicken breasts on both sides with salt, pepper and half of the dried oregano.', has_quantity: true },
      { phase: 'mise_en_place', step_number: 3, instruction: 'Finely chop red onion and dice tomatoes. Chop fresh parsley. Set aside.', has_quantity: false, clean_as_you_go: 'Wash cutting board and knife' },

      // Cooking
      { phase: 'cooking', step_number: 1, instruction: 'In a large cast iron skillet, heat the olive oil on medium-high. Sear the chicken on both sides, then add the white wine and reduce by half.', has_quantity: true },
      { phase: 'cooking', step_number: 2, instruction: 'Add the lemon juice and chicken broth. Sprinkle the remaining ½ tablespoon of oregano on top and turn the heat to medium.', has_quantity: true },
      { phase: 'cooking', step_number: 3, instruction: 'Cover with a lid or tightly with foil. Cook for about 5 to 6 minutes on one side, then turn the chicken over and cook for 5 to 6 additional minutes, or until the internal temperature of the chicken reaches 165°F.', has_quantity: false },
      { phase: 'cooking', step_number: 4, instruction: 'Uncover and top with chopped onions, tomatoes and olives. Cover again and cook for 3 minutes.', has_quantity: false, clean_as_you_go: 'Turn off heat' },

      // Plating
      { phase: 'plating', step_number: 1, instruction: 'Finish with the parsley and feta cheese if using. Enjoy!', has_quantity: false }
    ]
  },

  mediterraneanChickenStirFry: {
    name: 'Mediterranean Chicken Stir Fry with Vegetables',
    slug: 'mediterranean-chicken-stir-fry-vegetables',
    description: 'Easy one-pan Mediterranean chicken stir fry in just 30 minutes. Features tomatoes, spinach, lemon, oregano, smoked paprika, and feta cheese. Healthy, gluten-free, keto, low-carb, and rich in protein and fiber.',
    protein: 'chicken',
    cuisine: 'mediterranean',
    imageFile: 'Mediterranean-Chicken-Stir-Fry-with-Tomatoes-and-Spinach.jpg',
    prep_time_min: 10,
    cook_time_min: 20,
    total_time_min: 30,
    difficulty: 'Easy',
    default_servings: 4,

    equipment: [
      { equipment: 'Large high-sided skillet', category: 'Cooking', sort_order: 1 },
      { equipment: 'Chef knife', category: 'Prep', sort_order: 2 },
      { equipment: 'Cutting board', category: 'Prep', sort_order: 3 },
      { equipment: 'Measuring spoons', category: 'Measuring', sort_order: 4 }
    ],

    ingredients: [
      { ingredient: 'olive oil', amount: 2, unit: 'tbsp', category: 'Pantry', notes: '', sort_order: 1 },
      { ingredient: 'skinless boneless chicken thighs or breasts', amount: 1, unit: 'lb', category: 'Proteins', notes: '', sort_order: 2 },
      { ingredient: 'smoked paprika', amount: 0.5, unit: 'tsp', category: 'Pantry', notes: '', sort_order: 3 },
      { ingredient: 'dried oregano', amount: 0.5, unit: 'tsp', category: 'Pantry', notes: '', sort_order: 4 },
      { ingredient: 'salt', amount: 0.25, unit: 'tsp', category: 'Pantry', notes: '', sort_order: 5 },
      { ingredient: 'black pepper', amount: 0.25, unit: 'tsp', category: 'Pantry', notes: '', sort_order: 6 },
      { ingredient: 'fresh spinach', amount: 10, unit: 'oz', category: 'Produce', notes: '', sort_order: 7 },
      { ingredient: 'garlic', amount: 4, unit: 'clove', category: 'Produce', notes: 'minced', sort_order: 8 },
      { ingredient: 'cherry tomatoes', amount: 8, unit: 'oz', category: 'Produce', notes: 'halved', sort_order: 9 },
      { ingredient: 'crumbled feta cheese', amount: 6, unit: 'oz', category: 'Dairy', notes: '', sort_order: 10 },
      { ingredient: 'lemon juice', amount: 2, unit: 'tbsp', category: 'Produce', notes: 'freshly squeezed', sort_order: 11 }
    ],

    secondary_ingredients: [
      { ingredient: 'Spinach', slug: 'spinach' },
      { ingredient: 'Feta Cheese', slug: 'feta-cheese' },
      { ingredient: 'Lemon', slug: 'lemon' },
      { ingredient: 'Cherry Tomatoes', slug: 'cherry-tomatoes' }
    ],

    instructions: [
      // Mise en place
      { phase: 'mise_en_place', step_number: 1, instruction: 'Slice chicken thighs into smaller segments and season generously with smoked paprika, dried oregano, salt and pepper.', has_quantity: true },
      { phase: 'mise_en_place', step_number: 2, instruction: 'Halve cherry tomatoes and mince garlic. Set aside.', has_quantity: false, clean_as_you_go: 'Wash knife and cutting board' },

      // Cooking
      { phase: 'cooking', step_number: 1, instruction: 'In a large, high-sided skillet, heat 2 tablespoons of olive oil on medium heat. Add the chicken to the skillet and cook on both sides for about 10 or 15 minutes until the chicken is completely cooked.', has_quantity: true },
      { phase: 'cooking', step_number: 2, instruction: 'Remove chicken from the skillet.', has_quantity: false },
      { phase: 'cooking', step_number: 3, instruction: 'To the same skillet (with juices from chicken), add fresh spinach, half of the halved cherry tomatoes (saving the other half for later), and minced garlic. Cook the spinach on medium heat for about 5 or 10 minutes until it wilts.', has_quantity: true },
      { phase: 'cooking', step_number: 4, instruction: 'Add crumbled feta cheese, the remaining half of the cherry tomatoes, and 2 tablespoons of freshly squeezed lemon juice and mix to combine.', has_quantity: true },
      { phase: 'cooking', step_number: 5, instruction: 'Return cooked chicken back to the skillet and reheat gently.', has_quantity: false },
      { phase: 'cooking', step_number: 6, instruction: 'Season the veggie mixture with salt and pepper.', has_quantity: false, clean_as_you_go: 'Turn off heat' },

      // Plating
      { phase: 'plating', step_number: 1, instruction: 'Serve as is or with roasted spaghetti squash, rice, orzo pasta, or cauliflower rice.', has_quantity: false }
    ]
  },

  mediterraneanChickenBowls: {
    name: 'Mediterranean Chicken Bowls',
    slug: 'mediterranean-chicken-bowls',
    description: 'Great for meal prep! Seasoned chicken, rice, hummus and a tomato cucumber salad. Gluten-free with dairy-free option.',
    protein: 'chicken',
    cuisine: 'mediterranean',
    imageFile: 'Mediterranean-Chicken-Bowls.jpg',
    prep_time_min: 45,
    cook_time_min: 45,
    total_time_min: 90,
    difficulty: 'Medium',
    default_servings: 6,

    equipment: [
      { equipment: 'Large bowl', category: 'Prep', sort_order: 1 },
      { equipment: 'Large skillet', category: 'Cooking', sort_order: 2 },
      { equipment: 'Medium pot with lid', category: 'Cooking', sort_order: 3 },
      { equipment: 'Chef knife', category: 'Prep', sort_order: 4 },
      { equipment: 'Cutting board', category: 'Prep', sort_order: 5 },
      { equipment: 'Measuring spoons', category: 'Measuring', sort_order: 6 },
      { equipment: 'Measuring cups', category: 'Measuring', sort_order: 7 },
      { equipment: 'Fork', category: 'Prep', sort_order: 8 }
    ],

    ingredients: [
      // Chicken
      { ingredient: 'boneless skinless chicken breast', amount: 2, unit: 'lb', category: 'Proteins', notes: 'cubed', sort_order: 1 },
      { ingredient: 'olive oil', amount: 0.25, unit: 'cup', category: 'Pantry', notes: 'for chicken', sort_order: 2 },
      { ingredient: 'garlic', amount: 3, unit: 'clove', category: 'Produce', notes: 'minced, for chicken', sort_order: 3 },
      { ingredient: 'lemon juice', amount: 2, unit: 'tbsp', category: 'Produce', notes: 'for chicken', sort_order: 4 },
      { ingredient: 'cumin', amount: 2, unit: 'tsp', category: 'Pantry', notes: 'for chicken', sort_order: 5 },
      { ingredient: 'curry powder', amount: 1, unit: 'tsp', category: 'Pantry', notes: '', sort_order: 6 },
      { ingredient: 'cinnamon', amount: 0.5, unit: 'tsp', category: 'Pantry', notes: '', sort_order: 7 },
      { ingredient: 'salt', amount: 0.5, unit: 'tsp', category: 'Pantry', notes: 'for chicken', sort_order: 8 },
      { ingredient: 'black pepper', amount: 0.5, unit: 'tsp', category: 'Pantry', notes: 'for chicken', sort_order: 9 },
      { ingredient: 'dried thyme', amount: 0.5, unit: 'tsp', category: 'Pantry', notes: '', sort_order: 10 },
      { ingredient: 'cloves', amount: 0.25, unit: 'tsp', category: 'Pantry', notes: '', sort_order: 11 },
      { ingredient: 'olive oil', amount: 1, unit: 'tbsp', category: 'Pantry', notes: 'for cooking chicken', sort_order: 12 },

      // Rice
      { ingredient: 'rice', amount: 1, unit: 'cup', category: 'Pantry', notes: '', sort_order: 13 },
      { ingredient: 'water or chicken broth', amount: 2, unit: 'cup', category: 'Pantry', notes: '', sort_order: 14 },
      { ingredient: 'garlic', amount: 1, unit: 'clove', category: 'Produce', notes: 'minced, for rice', sort_order: 15 },
      { ingredient: 'lemon juice', amount: 1, unit: 'tsp', category: 'Produce', notes: 'for rice', sort_order: 16 },
      { ingredient: 'fresh parsley', amount: 1, unit: 'tbsp', category: 'Produce', notes: 'chopped, for rice', sort_order: 17 },
      { ingredient: 'cumin', amount: 0.5, unit: 'tsp', category: 'Pantry', notes: 'for rice', sort_order: 18 },
      { ingredient: 'olive oil', amount: 1, unit: 'tbsp', category: 'Pantry', notes: 'for rice', sort_order: 19 },

      // Tomato and Cucumber Salad
      { ingredient: 'cucumber', amount: 2, unit: 'cup', category: 'Produce', notes: 'diced, about 1 large cucumber', sort_order: 20 },
      { ingredient: 'tomato', amount: 2, unit: 'cup', category: 'Produce', notes: 'diced, about 2 medium tomatoes', sort_order: 21 },
      { ingredient: 'lemon juice', amount: 3, unit: 'tbsp', category: 'Produce', notes: 'for salad', sort_order: 22 },
      { ingredient: 'olive oil', amount: 1, unit: 'tbsp', category: 'Pantry', notes: 'for salad', sort_order: 23 },
      { ingredient: 'fresh parsley', amount: 2, unit: 'tbsp', category: 'Produce', notes: 'chopped, for salad', sort_order: 24 },
      { ingredient: 'garlic', amount: 1, unit: 'clove', category: 'Produce', notes: 'minced, for salad', sort_order: 25 },
      { ingredient: 'salt', amount: 0.5, unit: 'tsp', category: 'Pantry', notes: 'for salad', sort_order: 26 },

      // Toppings
      { ingredient: 'hummus', amount: null, unit: 'to taste', category: 'Pantry', notes: '', sort_order: 27 },
      { ingredient: 'feta', amount: null, unit: 'to taste', category: 'Dairy', notes: 'optional, if not dairy-free', sort_order: 28 }
    ],

    secondary_ingredients: [
      { ingredient: 'Hummus', slug: 'hummus' },
      { ingredient: 'Cucumber', slug: 'cucumber' },
      { ingredient: 'Feta', slug: 'feta' },
      { ingredient: 'Lemon', slug: 'lemon' }
    ],

    instructions: [
      // Mise en place
      { phase: 'mise_en_place', step_number: 1, instruction: 'In a large bowl, mix together olive oil, garlic, lemon juice, cumin, cinnamon, curry powder, salt, black pepper, cloves, and dried thyme. Mix in the chicken cubes and make sure the chicken is covered completely with the spice mixture. Let marinate for 20-30 minutes in the refrigerator.', has_quantity: true },
      { phase: 'mise_en_place', step_number: 2, instruction: 'Dice cucumber and tomatoes. Mince garlic. Chop fresh parsley. Set aside.', has_quantity: false, clean_as_you_go: 'Wash cutting board and knife' },

      // Cooking
      { phase: 'cooking', step_number: 1, instruction: 'To cook the chicken, heat 1 tbsp of olive oil in a large skillet over medium high heat. Spread chicken out in a single layer on the skillet and cook 5 minutes on each side, until the chicken is cooked through.', has_quantity: true },
      { phase: 'cooking', step_number: 2, instruction: 'To make the rice, combine uncooked rice and water/chicken broth in a medium sized pot and bring to a boil. Once boiling, cover pot with a lid and bring down to a simmer. Allow to cook 15-20 minutes, until no water remains and the rice is tender.', has_quantity: true },
      { phase: 'cooking', step_number: 3, instruction: 'Fluff rice with a fork. Mix together rice with fresh parsley, garlic, lemon juice and cumin.', has_quantity: true },
      { phase: 'cooking', step_number: 4, instruction: 'To make the cucumber tomato salad, combine diced cucumber, tomatoes, lemon juice, parsley, salt and garlic until combined.', has_quantity: true, clean_as_you_go: 'Turn off heat' },

      // Plating
      { phase: 'plating', step_number: 1, instruction: 'To assemble the bowl, layer rice and chicken in a bowl. Top with hummus, cucumber tomato salad and sprinkle with feta.', has_quantity: false }
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

    await uploadRecipe('mediterraneanChicken');
    await uploadRecipe('mediterraneanChickenStirFry');
    await uploadRecipe('mediterraneanChickenBowls');

    console.log('🎉 All 3 Mediterranean Chicken recipes uploaded successfully!');

  } catch (error) {
    console.error('❌ Upload failed:', error);
    process.exit(1);
  }
}

main();
