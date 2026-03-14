-- Seed Data for Side Dishes (Complete Plate Feature)
-- Initial grains and vegetables to get started

-- ============================================================================
-- UNIVERSAL GRAINS (Work with any cuisine)
-- ============================================================================

-- 1. White Rice (Universal)
INSERT INTO public.side_dishes (name, slug, description, category_id, cuisine_id, image_url, prep_time_min, cook_time_min, total_time_min, difficulty, default_servings, is_universal, pairing_notes)
SELECT
  'White Rice',
  'white-rice',
  'Fluffy white rice - the perfect neutral base for any dish. Simple, reliable, and universally loved.',
  dc.id,
  NULL,
  'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=800&h=600&fit=crop',
  5, 15, 20, 'Easy', 4, true,
  'Pairs with everything. Especially good with saucy dishes that need something to soak up the flavor.'
FROM dish_categories dc
WHERE dc.slug = 'grain';

-- 2. Brown Rice (Universal, Healthier)
INSERT INTO public.side_dishes (name, slug, description, category_id, cuisine_id, image_url, prep_time_min, cook_time_min, total_time_min, difficulty, default_servings, is_universal, pairing_notes)
SELECT
  'Brown Rice',
  'brown-rice',
  'Nutty, wholesome brown rice with more fiber and nutrients than white rice. Takes a bit longer but worth it.',
  dc.id,
  NULL,
  'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&h=600&fit=crop',
  5, 40, 45, 'Easy', 4, true,
  'Healthier alternative to white rice. Pairs well with lighter dishes. Nutty flavor complements vegetables.'
FROM dish_categories dc
WHERE dc.slug = 'grain';

-- 3. Quinoa (Universal, High Protein)
INSERT INTO public.side_dishes (name, slug, description, category_id, cuisine_id, image_url, prep_time_min, cook_time_min, total_time_min, difficulty, default_servings, is_universal, pairing_notes)
SELECT
  'Quinoa',
  'quinoa',
  'Light, fluffy quinoa with a subtle nutty taste. Naturally gluten-free and packed with protein.',
  dc.id,
  NULL,
  'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=800&h=600&fit=crop',
  5, 15, 20, 'Easy', 4, true,
  'Higher protein option. Great for lighter dishes. Slightly nutty flavor works with most cuisines.'
FROM dish_categories dc
WHERE dc.slug = 'grain';

-- 4. Jasmine Rice (Thai/Asian)
INSERT INTO public.side_dishes (name, slug, description, category_id, cuisine_id, image_url, prep_time_min, cook_time_min, total_time_min, difficulty, default_servings, is_universal, pairing_notes)
SELECT
  'Jasmine Rice',
  'jasmine-rice',
  'Fragrant Thai jasmine rice with a subtle floral aroma. The traditional choice for Thai and Asian dishes.',
  dc.id,
  c.id,
  'https://images.unsplash.com/photo-1516684732162-798a0062be99?w=800&h=600&fit=crop',
  5, 15, 20, 'Easy', 4, false,
  'Perfect for Thai curries and Asian stir-fries. The aromatic quality complements bold flavors.'
FROM dish_categories dc, cuisines c
WHERE dc.slug = 'grain' AND c.slug = 'thai';

-- 5. Roasted Potatoes (Universal, Comfort Food)
INSERT INTO public.side_dishes (name, slug, description, category_id, cuisine_id, image_url, prep_time_min, cook_time_min, total_time_min, difficulty, default_servings, is_universal, pairing_notes)
SELECT
  'Roasted Potatoes',
  'roasted-potatoes',
  'Crispy on the outside, fluffy inside. Classic roasted potatoes with olive oil and herbs.',
  dc.id,
  NULL,
  'https://images.unsplash.com/photo-1518013431117-eb1465fa5752?w=800&h=600&fit=crop',
  10, 30, 40, 'Easy', 4, true,
  'Hearty comfort food. Pairs well with grilled proteins and roasted vegetables. Kids love these.'
FROM dish_categories dc
WHERE dc.slug = 'grain';

-- ============================================================================
-- UNIVERSAL VEGETABLES (Simple, versatile)
-- ============================================================================

-- 1. Steamed Broccoli (Universal)
INSERT INTO public.side_dishes (name, slug, description, category_id, cuisine_id, image_url, prep_time_min, cook_time_min, total_time_min, difficulty, default_servings, is_universal, pairing_notes)
SELECT
  'Steamed Broccoli',
  'steamed-broccoli',
  'Simple steamed broccoli florets with a touch of salt. Quick, healthy, and goes with everything.',
  dc.id,
  NULL,
  'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=800&h=600&fit=crop',
  5, 8, 13, 'Easy', 4, true,
  'Classic healthy side. Pairs with anything. Great for kids. Can dress up with garlic or lemon.'
FROM dish_categories dc
WHERE dc.slug = 'vegetable';

-- 2. Mixed Green Salad (Universal)
INSERT INTO public.side_dishes (name, slug, description, category_id, cuisine_id, image_url, prep_time_min, cook_time_min, total_time_min, difficulty, default_servings, is_universal, pairing_notes)
SELECT
  'Mixed Green Salad',
  'mixed-green-salad',
  'Fresh mixed greens with light vinaigrette. Simple, crisp, and refreshing.',
  dc.id,
  NULL,
  'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=600&fit=crop',
  10, 0, 10, 'Easy', 4, true,
  'Light and refreshing. Perfect with rich or heavy main dishes. Adds color to any plate.'
FROM dish_categories dc
WHERE dc.slug = 'vegetable';

-- 3. Roasted Brussels Sprouts (Universal)
INSERT INTO public.side_dishes (name, slug, description, category_id, cuisine_id, image_url, prep_time_min, cook_time_min, total_time_min, difficulty, default_servings, is_universal, pairing_notes)
SELECT
  'Roasted Brussels Sprouts',
  'roasted-brussels-sprouts',
  'Crispy roasted Brussels sprouts with olive oil and sea salt. Caramelized and delicious.',
  dc.id,
  NULL,
  'https://images.unsplash.com/photo-1614963366795-e9a835ab578b?w=800&h=600&fit=crop',
  10, 25, 35, 'Easy', 4, true,
  'Roasting brings out sweetness. Great with grilled or roasted proteins. Crowd-pleaser.'
FROM dish_categories dc
WHERE dc.slug = 'vegetable';

-- 4. Sautéed Spinach (Universal, Quick)
INSERT INTO public.side_dishes (name, slug, description, category_id, cuisine_id, image_url, prep_time_min, cook_time_min, total_time_min, difficulty, default_servings, is_universal, pairing_notes)
SELECT
  'Sautéed Spinach',
  'sauteed-spinach',
  'Tender spinach sautéed with garlic. Quick, healthy, and packed with iron.',
  dc.id,
  NULL,
  'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=800&h=600&fit=crop',
  5, 5, 10, 'Easy', 4, true,
  'Lightning fast. Wilts down significantly - use lots. Pairs with Italian, Mediterranean, or any cuisine.'
FROM dish_categories dc
WHERE dc.slug = 'vegetable';

-- 5. Thai Cucumber Salad (Thai-specific)
INSERT INTO public.side_dishes (name, slug, description, category_id, cuisine_id, image_url, prep_time_min, cook_time_min, total_time_min, difficulty, default_servings, is_universal, pairing_notes)
SELECT
  'Thai Cucumber Salad',
  'thai-cucumber-salad',
  'Crisp cucumbers with rice vinegar, sesame oil, and chili flakes. Cool and refreshing.',
  dc.id,
  c.id,
  'https://images.unsplash.com/photo-1604909052743-94e838986d24?w=800&h=600&fit=crop',
  10, 0, 10, 'Easy', 4, false,
  'Perfect for spicy or rich Thai curries. Cooling and refreshing contrast. Quick to make.'
FROM dish_categories dc, cuisines c
WHERE dc.slug = 'vegetable' AND c.slug = 'thai';

-- ============================================================================
-- SIDE DISH EQUIPMENT (Simple sides don't need much)
-- ============================================================================

-- White Rice Equipment
INSERT INTO public.side_dish_equipment (side_dish_id, equipment, category, sort_order)
SELECT sd.id, equipment, category, sort_order
FROM side_dishes sd,
(VALUES
  ('Rice cooker or medium saucepan with lid', 'Cooking', 1),
  ('Measuring cup', 'Measuring', 2)
) AS equipment_data(equipment, category, sort_order)
WHERE sd.slug = 'white-rice';

-- Brown Rice Equipment
INSERT INTO public.side_dish_equipment (side_dish_id, equipment, category, sort_order)
SELECT sd.id, equipment, category, sort_order
FROM side_dishes sd,
(VALUES
  ('Rice cooker or medium saucepan with lid', 'Cooking', 1),
  ('Measuring cup', 'Measuring', 2)
) AS equipment_data(equipment, category, sort_order)
WHERE sd.slug = 'brown-rice';

-- Quinoa Equipment
INSERT INTO public.side_dish_equipment (side_dish_id, equipment, category, sort_order)
SELECT sd.id, equipment, category, sort_order
FROM side_dishes sd,
(VALUES
  ('Medium saucepan with lid', 'Cooking', 1),
  ('Fine-mesh strainer', 'Prep', 2),
  ('Measuring cup', 'Measuring', 3)
) AS equipment_data(equipment, category, sort_order)
WHERE sd.slug = 'quinoa';

-- Jasmine Rice Equipment
INSERT INTO public.side_dish_equipment (side_dish_id, equipment, category, sort_order)
SELECT sd.id, equipment, category, sort_order
FROM side_dishes sd,
(VALUES
  ('Rice cooker or medium saucepan with lid', 'Cooking', 1),
  ('Measuring cup', 'Measuring', 2)
) AS equipment_data(equipment, category, sort_order)
WHERE sd.slug = 'jasmine-rice';

-- Roasted Potatoes Equipment
INSERT INTO public.side_dish_equipment (side_dish_id, equipment, category, sort_order)
SELECT sd.id, equipment, category, sort_order
FROM side_dishes sd,
(VALUES
  ('Large baking sheet', 'Cooking', 1),
  ('Mixing bowl', 'Prep', 2),
  ('Knife', 'Prep', 3),
  ('Cutting board', 'Prep', 4)
) AS equipment_data(equipment, category, sort_order)
WHERE sd.slug = 'roasted-potatoes';

-- Steamed Broccoli Equipment
INSERT INTO public.side_dish_equipment (side_dish_id, equipment, category, sort_order)
SELECT sd.id, equipment, category, sort_order
FROM side_dishes sd,
(VALUES
  ('Steamer basket or pot with lid', 'Cooking', 1),
  ('Knife', 'Prep', 2),
  ('Cutting board', 'Prep', 3)
) AS equipment_data(equipment, category, sort_order)
WHERE sd.slug = 'steamed-broccoli';

-- ============================================================================
-- SIDE DISH INGREDIENTS (for 4 servings - default)
-- ============================================================================

-- White Rice Ingredients
INSERT INTO public.side_dish_ingredients (side_dish_id, ingredient, amount, unit, category, notes, sort_order)
SELECT sd.id, ingredient, amount, unit, category, notes, sort_order
FROM side_dishes sd,
(VALUES
  ('white rice', 2, 'cups', 'Pantry', 'long grain', 1),
  ('water', 4, 'cups', 'Pantry', '', 2),
  ('salt', 0.5, 'tsp', 'Pantry', 'optional', 3)
) AS ingredient_data(ingredient, amount, unit, category, notes, sort_order)
WHERE sd.slug = 'white-rice';

-- Brown Rice Ingredients
INSERT INTO public.side_dish_ingredients (side_dish_id, ingredient, amount, unit, category, notes, sort_order)
SELECT sd.id, ingredient, amount, unit, category, notes, sort_order
FROM side_dishes sd,
(VALUES
  ('brown rice', 2, 'cups', 'Pantry', 'long grain', 1),
  ('water', 4.5, 'cups', 'Pantry', 'needs more water than white', 2),
  ('salt', 0.5, 'tsp', 'Pantry', 'optional', 3)
) AS ingredient_data(ingredient, amount, unit, category, notes, sort_order)
WHERE sd.slug = 'brown-rice';

-- Quinoa Ingredients
INSERT INTO public.side_dish_ingredients (side_dish_id, ingredient, amount, unit, category, notes, sort_order)
SELECT sd.id, ingredient, amount, unit, category, notes, sort_order
FROM side_dishes sd,
(VALUES
  ('quinoa', 2, 'cups', 'Pantry', 'any color', 1),
  ('water or broth', 4, 'cups', 'Pantry', '', 2),
  ('salt', 0.5, 'tsp', 'Pantry', '', 3)
) AS ingredient_data(ingredient, amount, unit, category, notes, sort_order)
WHERE sd.slug = 'quinoa';

-- Jasmine Rice Ingredients
INSERT INTO public.side_dish_ingredients (side_dish_id, ingredient, amount, unit, category, notes, sort_order)
SELECT sd.id, ingredient, amount, unit, category, notes, sort_order)
FROM side_dishes sd,
(VALUES
  ('jasmine rice', 2, 'cups', 'Pantry', '', 1),
  ('water', 3, 'cups', 'Pantry', '', 2)
) AS ingredient_data(ingredient, amount, unit, category, notes, sort_order)
WHERE sd.slug = 'jasmine-rice';

-- Roasted Potatoes Ingredients
INSERT INTO public.side_dish_ingredients (side_dish_id, ingredient, amount, unit, category, notes, sort_order)
SELECT sd.id, ingredient, amount, unit, category, notes, sort_order
FROM side_dishes sd,
(VALUES
  ('russet or yukon gold potatoes', 2, 'lbs', 'Produce', 'cut into 1-inch chunks', 1),
  ('olive oil', 3, 'tbsp', 'Pantry', '', 2),
  ('salt', 1, 'tsp', 'Pantry', '', 3),
  ('black pepper', 0.5, 'tsp', 'Pantry', '', 4),
  ('dried rosemary', 1, 'tsp', 'Pantry', 'optional', 5)
) AS ingredient_data(ingredient, amount, unit, category, notes, sort_order)
WHERE sd.slug = 'roasted-potatoes';

-- Steamed Broccoli Ingredients
INSERT INTO public.side_dish_ingredients (side_dish_id, ingredient, amount, unit, category, notes, sort_order)
SELECT sd.id, ingredient, amount, unit, category, notes, sort_order
FROM side_dishes sd,
(VALUES
  ('broccoli', 1.5, 'lbs', 'Produce', 'cut into florets', 1),
  ('salt', 0.5, 'tsp', 'Pantry', '', 2),
  ('lemon', 0.5, '', 'Produce', 'for serving, optional', 3)
) AS ingredient_data(ingredient, amount, unit, category, notes, sort_order)
WHERE sd.slug = 'steamed-broccoli';

-- Mixed Green Salad Ingredients
INSERT INTO public.side_dish_ingredients (side_dish_id, ingredient, amount, unit, category, notes, sort_order)
SELECT sd.id, ingredient, amount, unit, category, notes, sort_order
FROM side_dishes sd,
(VALUES
  ('mixed salad greens', 8, 'cups', 'Produce', 'spring mix or baby greens', 1),
  ('olive oil', 3, 'tbsp', 'Pantry', '', 2),
  ('lemon juice', 2, 'tbsp', 'Produce', 'fresh', 3),
  ('salt', 0.5, 'tsp', 'Pantry', '', 4),
  ('black pepper', 0.25, 'tsp', 'Pantry', '', 5)
) AS ingredient_data(ingredient, amount, unit, category, notes, sort_order)
WHERE sd.slug = 'mixed-green-salad';

-- Roasted Brussels Sprouts Ingredients
INSERT INTO public.side_dish_ingredients (side_dish_id, ingredient, amount, unit, category, notes, sort_order)
SELECT sd.id, ingredient, amount, unit, category, notes, sort_order
FROM side_dishes sd,
(VALUES
  ('brussels sprouts', 1.5, 'lbs', 'Produce', 'trimmed and halved', 1),
  ('olive oil', 3, 'tbsp', 'Pantry', '', 2),
  ('salt', 1, 'tsp', 'Pantry', '', 3),
  ('black pepper', 0.5, 'tsp', 'Pantry', '', 4),
  ('balsamic vinegar', 1, 'tbsp', 'Pantry', 'optional', 5)
) AS ingredient_data(ingredient, amount, unit, category, notes, sort_order)
WHERE sd.slug = 'roasted-brussels-sprouts';

-- Sautéed Spinach Ingredients
INSERT INTO public.side_dish_ingredients (side_dish_id, ingredient, amount, unit, category, notes, sort_order)
SELECT sd.id, ingredient, amount, unit, category, notes, sort_order
FROM side_dishes sd,
(VALUES
  ('fresh spinach', 1, 'lb', 'Produce', 'about 12 cups, wilts down significantly', 1),
  ('olive oil', 2, 'tbsp', 'Pantry', '', 2),
  ('garlic', 3, 'cloves', 'Produce', 'minced', 3),
  ('salt', 0.5, 'tsp', 'Pantry', '', 4),
  ('lemon juice', 1, 'tbsp', 'Produce', 'optional', 5)
) AS ingredient_data(ingredient, amount, unit, category, notes, sort_order)
WHERE sd.slug = 'sauteed-spinach';

-- Thai Cucumber Salad Ingredients
INSERT INTO public.side_dish_ingredients (side_dish_id, ingredient, amount, unit, category, notes, sort_order)
SELECT sd.id, ingredient, amount, unit, category, notes, sort_order
FROM side_dishes sd,
(VALUES
  ('cucumbers', 2, 'large', 'Produce', 'thinly sliced', 1),
  ('rice vinegar', 3, 'tbsp', 'Pantry', '', 2),
  ('sesame oil', 1, 'tbsp', 'Pantry', '', 3),
  ('sugar', 1, 'tbsp', 'Pantry', '', 4),
  ('red chili flakes', 0.5, 'tsp', 'Pantry', 'optional', 5),
  ('sesame seeds', 1, 'tbsp', 'Pantry', 'for garnish', 6)
) AS ingredient_data(ingredient, amount, unit, category, notes, sort_order)
WHERE sd.slug = 'thai-cucumber-salad';

-- ============================================================================
-- SIDE DISH INSTRUCTIONS (Simple sides, simple instructions)
-- ============================================================================

-- White Rice Instructions
INSERT INTO public.side_dish_instructions (side_dish_id, phase, step_number, instruction, has_quantity, clean_as_you_go)
SELECT sd.id, phase, step_number, instruction, has_quantity, clean_as_you_go
FROM side_dishes sd,
(VALUES
  ('mise_en_place', 1, 'Rinse rice in fine-mesh strainer until water runs clear', false, null),
  ('cooking', 1, 'Combine rice, water, and salt in saucepan', false, null),
  ('cooking', 2, 'Bring to boil over high heat', false, null),
  ('cooking', 3, 'Reduce heat to low, cover, and simmer 15 minutes', false, null),
  ('cooking', 4, 'Remove from heat, let stand covered for 5 minutes', false, 'Rinse measuring cup'),
  ('plating', 1, 'Fluff rice with fork and serve', false, null)
) AS instruction_data(phase, step_number, instruction, has_quantity, clean_as_you_go)
WHERE sd.slug = 'white-rice';

-- Steamed Broccoli Instructions
INSERT INTO public.side_dish_instructions (side_dish_id, phase, step_number, instruction, has_quantity, clean_as_you_go)
SELECT sd.id, phase, step_number, instruction, has_quantity, clean_as_you_go
FROM side_dishes sd,
(VALUES
  ('mise_en_place', 1, 'Cut broccoli into even-sized florets', false, null),
  ('cooking', 1, 'Bring 1 inch of water to boil in pot with steamer basket', false, null),
  ('cooking', 2, 'Add broccoli to steamer, cover, steam 6-8 minutes until tender-crisp', false, null),
  ('cooking', 3, 'Remove from heat, season with salt', false, 'Drain water from pot'),
  ('plating', 1, 'Transfer to serving dish, squeeze lemon if desired', false, null)
) AS instruction_data(phase, step_number, instruction, has_quantity, clean_as_you_go)
WHERE sd.slug = 'steamed-broccoli';

-- Thai Cucumber Salad Instructions
INSERT INTO public.side_dish_instructions (side_dish_id, phase, step_number, instruction, has_quantity, clean_as_you_go)
SELECT sd.id, phase, step_number, instruction, has_quantity, clean_as_you_go
FROM side_dishes sd,
(VALUES
  ('mise_en_place', 1, 'Thinly slice cucumbers into rounds', false, null),
  ('mise_en_place', 2, 'In small bowl, whisk together rice vinegar, sesame oil, and sugar until dissolved', false, 'Wash cutting board and knife'),
  ('cooking', 1, 'Place cucumber slices in serving bowl', false, null),
  ('cooking', 2, 'Pour dressing over cucumbers, toss to coat', false, null),
  ('cooking', 3, 'Sprinkle with chili flakes if using', false, null),
  ('plating', 1, 'Let sit 5-10 minutes to marinate, or serve immediately', false, null),
  ('plating', 2, 'Garnish with sesame seeds before serving', false, null)
) AS instruction_data(phase, step_number, instruction, has_quantity, clean_as_you_go)
WHERE sd.slug = 'thai-cucumber-salad';
