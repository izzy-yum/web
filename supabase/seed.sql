-- Seed data for Izzy Yum MVP
-- Images from Unsplash (temporary - replace before production)

-- ============================================================================
-- PROTEINS
-- ============================================================================
INSERT INTO proteins (name, slug, image_url, sort_order) VALUES
('Shrimp', 'shrimp', 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=800&h=600&fit=crop', 1),
('Chicken', 'chicken', 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=800&h=600&fit=crop', 2),
('Beef', 'beef', 'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?w=800&h=600&fit=crop', 3),
('Salmon', 'salmon', 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&h=600&fit=crop', 4),
('Tofu', 'tofu', 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop', 5),
('Eggs', 'eggs', 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=800&h=600&fit=crop', 6),
('Pork', 'pork', 'https://images.unsplash.com/photo-1602470520998-f4a52199a3d6?w=800&h=600&fit=crop', 7),
('Lamb', 'lamb', 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=800&h=600&fit=crop', 8);

-- ============================================================================
-- CUISINES
-- ============================================================================
INSERT INTO cuisines (name, slug, image_url, description, sort_order) VALUES
('Thai', 'thai', 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=800&h=600&fit=crop', 'Bold flavors with lemongrass, chilies, and coconut', 1),
('Italian', 'italian', 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&h=600&fit=crop', 'Classic dishes with tomatoes, garlic, and fresh herbs', 2),
('Mexican', 'mexican', 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&h=600&fit=crop', 'Vibrant flavors with peppers, lime, and fresh cilantro', 3),
('Japanese', 'japanese', 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800&h=600&fit=crop', 'Delicate dishes with soy, ginger, and fresh ingredients', 4),
('Mediterranean', 'mediterranean', 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&h=600&fit=crop', 'Healthy cuisine with olive oil, lemon, and fresh vegetables', 5),
('Indian', 'indian', 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&h=600&fit=crop', 'Rich spices with curry, turmeric, and aromatic herbs', 6),
('Chinese', 'chinese', 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=800&h=600&fit=crop', 'Balanced flavors with soy sauce, ginger, and garlic', 7),
('Korean', 'korean', 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=800&h=600&fit=crop', 'Bold tastes with gochugaru, sesame, and fermented ingredients', 8),
('Vietnamese', 'vietnamese', 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=800&h=600&fit=crop', 'Fresh flavors with herbs, lime, and fish sauce', 9),
('American', 'american', 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=600&fit=crop', 'Classic comfort food with bold, hearty flavors', 10);

-- ============================================================================
-- RECIPES
-- ============================================================================

-- Recipe 1: Green Curry Shrimp (Thai + Shrimp)
INSERT INTO recipes (name, slug, description, protein_id, cuisine_id, image_url, prep_time_min, cook_time_min, total_time_min, difficulty, default_servings)
SELECT
    'Green Curry Shrimp',
    'green-curry-shrimp',
    'Aromatic Thai green curry with succulent shrimp, bamboo shoots, and Thai basil in creamy coconut milk. Perfectly balanced spice and naturally gluten-free.',
    p.id,
    c.id,
    'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=800&h=600&fit=crop',
    15,
    15,
    30,
    'Medium',
    2
FROM proteins p, cuisines c
WHERE p.slug = 'shrimp' AND c.slug = 'thai';

-- Recipe 2: Chicken Pad Thai
INSERT INTO recipes (name, slug, description, protein_id, cuisine_id, image_url, prep_time_min, cook_time_min, total_time_min, difficulty, default_servings)
SELECT
    'Chicken Pad Thai',
    'chicken-pad-thai',
    'Classic Thai stir-fried rice noodles with chicken, peanuts, and a perfect balance of sweet and tangy flavors. Made with gluten-free tamari.',
    p.id,
    c.id,
    'https://images.unsplash.com/photo-1626804475297-41608ea09aeb?w=800&h=600&fit=crop',
    20,
    10,
    30,
    'Easy',
    2
FROM proteins p, cuisines c
WHERE p.slug = 'chicken' AND c.slug = 'thai';

-- Recipe 3: Mediterranean Grilled Salmon
INSERT INTO recipes (name, slug, description, protein_id, cuisine_id, image_url, prep_time_min, cook_time_min, total_time_min, difficulty, default_servings)
SELECT
    'Mediterranean Grilled Salmon',
    'mediterranean-grilled-salmon',
    'Fresh salmon fillet grilled to perfection with lemon, olive oil, and Mediterranean herbs. Served with roasted vegetables.',
    p.id,
    c.id,
    'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&h=600&fit=crop',
    10,
    15,
    25,
    'Easy',
    2
FROM proteins p, cuisines c
WHERE p.slug = 'salmon' AND c.slug = 'mediterranean';

-- Recipe 4: Beef Tacos
INSERT INTO recipes (name, slug, description, protein_id, cuisine_id, image_url, prep_time_min, cook_time_min, total_time_min, difficulty, default_servings)
SELECT
    'Beef Tacos',
    'beef-tacos',
    'Seasoned ground beef in gluten-free corn tortillas with fresh toppings. Quick, delicious, and family-friendly.',
    p.id,
    c.id,
    'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=800&h=600&fit=crop',
    10,
    15,
    25,
    'Easy',
    2
FROM proteins p, cuisines c
WHERE p.slug = 'beef' AND c.slug = 'mexican';

-- Recipe 5: Chicken Parmesan
INSERT INTO recipes (name, slug, description, protein_id, cuisine_id, image_url, prep_time_min, cook_time_min, total_time_min, difficulty, default_servings)
SELECT
    'Chicken Parmesan',
    'chicken-parmesan',
    'Crispy gluten-free breaded chicken topped with marinara and melted mozzarella. Classic Italian comfort food.',
    p.id,
    c.id,
    'https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?w=800&h=600&fit=crop',
    15,
    25,
    40,
    'Medium',
    2
FROM proteins p, cuisines c
WHERE p.slug = 'chicken' AND c.slug = 'italian';

-- Recipe 6: Tofu Stir Fry
INSERT INTO recipes (name, slug, description, protein_id, cuisine_id, image_url, prep_time_min, cook_time_min, total_time_min, difficulty, default_servings)
SELECT
    'Tofu Stir Fry',
    'tofu-stir-fry',
    'Crispy tofu with colorful vegetables in a savory gluten-free stir fry sauce. Healthy and satisfying.',
    p.id,
    c.id,
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop',
    15,
    10,
    25,
    'Easy',
    2
FROM proteins p, cuisines c
WHERE p.slug = 'tofu' AND c.slug = 'chinese';

-- Recipe 7: Shrimp Scampi
INSERT INTO recipes (name, slug, description, protein_id, cuisine_id, image_url, prep_time_min, cook_time_min, total_time_min, difficulty, default_servings)
SELECT
    'Shrimp Scampi',
    'shrimp-scampi',
    'Succulent shrimp sautéed in garlic, white wine, and butter. Served over gluten-free pasta or with crusty bread.',
    p.id,
    c.id,
    'https://images.unsplash.com/photo-1633504581786-316c8002b1b9?w=800&h=600&fit=crop',
    10,
    10,
    20,
    'Easy',
    2
FROM proteins p, cuisines c
WHERE p.slug = 'shrimp' AND c.slug = 'italian';

-- Recipe 8: Korean Beef Bowl
INSERT INTO recipes (name, slug, description, protein_id, cuisine_id, image_url, prep_time_min, cook_time_min, total_time_min, difficulty, default_servings)
SELECT
    'Korean Beef Bowl',
    'korean-beef-bowl',
    'Sweet and savory ground beef over rice with vegetables. Quick weeknight dinner inspired by Korean flavors.',
    p.id,
    c.id,
    'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=800&h=600&fit=crop',
    10,
    15,
    25,
    'Easy',
    2
FROM proteins p, cuisines c
WHERE p.slug = 'beef' AND c.slug = 'korean';

-- Recipe 9: Japanese Chicken Teriyaki
INSERT INTO recipes (name, slug, description, protein_id, cuisine_id, image_url, prep_time_min, cook_time_min, total_time_min, difficulty, default_servings)
SELECT
    'Japanese Chicken Teriyaki',
    'japanese-chicken-teriyaki',
    'Tender chicken glazed with homemade gluten-free teriyaki sauce. Serve with steamed rice and vegetables.',
    p.id,
    c.id,
    'https://images.unsplash.com/photo-1588347818036-879d89a07ccf?w=800&h=600&fit=crop',
    10,
    20,
    30,
    'Easy',
    2
FROM proteins p, cuisines c
WHERE p.slug = 'chicken' AND c.slug = 'japanese';

-- Recipe 10: Mediterranean Lamb Kebabs
INSERT INTO recipes (name, slug, description, protein_id, cuisine_id, image_url, prep_time_min, cook_time_min, total_time_min, difficulty, default_servings)
SELECT
    'Mediterranean Lamb Kebabs',
    'mediterranean-lamb-kebabs',
    'Marinated lamb skewers with Mediterranean spices. Grilled to perfection and served with tzatziki.',
    p.id,
    c.id,
    'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=800&h=600&fit=crop',
    20,
    15,
    35,
    'Medium',
    2
FROM proteins p, cuisines c
WHERE p.slug = 'lamb' AND c.slug = 'mediterranean';

-- Recipe 11: Baked Beef Curry
INSERT INTO recipes (name, slug, description, protein_id, cuisine_id, image_url, prep_time_min, cook_time_min, total_time_min, difficulty, default_servings)
SELECT
    'Baked Beef Curry',
    'baked-beef-curry',
    'An incredible, flavoursome baked beef curry with fragrant spices, coconut milk, tomato and fresh chilli. Enjoy with gluten-free naan or rice.',
    p.id,
    c.id,
    '/images/beef-curry.jpeg',
    10,
    210,
    220,
    'Medium',
    4
FROM proteins p, cuisines c
WHERE p.slug = 'beef' AND c.slug = 'indian';

-- ============================================================================
-- RECIPE EQUIPMENT
-- ============================================================================

-- Green Curry Shrimp Equipment
INSERT INTO recipe_equipment (recipe_id, equipment, category, sort_order)
SELECT r.id, equipment, category, sort_order
FROM recipes r,
(VALUES
    ('Large wok or deep skillet', 'Cooking', 1),
    ('Rice cooker or medium saucepan with lid', 'Cooking', 2),
    ('Chef''s knife', 'Prep', 3),
    ('Cutting board', 'Prep', 4),
    ('Measuring spoons', 'Measuring', 5),
    ('Measuring cups', 'Measuring', 6),
    ('Mixing bowls (2)', 'Prep', 7),
    ('Wooden spoon or spatula', 'Cooking', 8)
) AS equipment_data(equipment, category, sort_order)
WHERE r.slug = 'green-curry-shrimp';

-- Baked Beef Curry Equipment
INSERT INTO recipe_equipment (recipe_id, equipment, category, sort_order)
SELECT r.id, equipment, category, sort_order
FROM recipes r,
(VALUES
    ('Large oven-safe lidded casserole dish', 'Cooking', 1),
    ('Chef''s knife', 'Prep', 2),
    ('Cutting board', 'Prep', 3),
    ('Measuring spoons', 'Measuring', 4),
    ('Measuring cups', 'Measuring', 5),
    ('Small prep bowls (3-4)', 'Prep', 6),
    ('Wooden spoon or spatula', 'Cooking', 7),
    ('Plate for setting aside browned beef', 'Prep', 8)
) AS equipment_data(equipment, category, sort_order)
WHERE r.slug = 'baked-beef-curry';

-- ============================================================================
-- RECIPE INGREDIENTS (for 2 servings - default)
-- ============================================================================

-- Green Curry Shrimp Ingredients
INSERT INTO recipe_ingredients (recipe_id, ingredient, amount, unit, category, is_secondary, notes, sort_order)
SELECT r.id, ingredient, amount, unit, category, is_secondary, notes, sort_order
FROM recipes r,
(VALUES
    ('large shrimp', 1, 'lb', 'Proteins', false, 'peeled and deveined', 1),
    ('coconut milk', 14, 'oz', 'Pantry', true, '', 2),
    ('gluten-free green curry paste', 2, 'tbsp', 'Pantry', true, '', 3),
    ('bamboo shoots', 1, 'cup', 'Produce', false, '', 4),
    ('red bell pepper', 1, '', 'Produce', false, '', 5),
    ('fresh Thai basil', null, 'bunch', 'Produce', true, '', 6),
    ('gluten-free fish sauce', 2, 'tbsp', 'Pantry', false, '', 7),
    ('coconut sugar', 1, 'tbsp', 'Pantry', true, '', 8),
    ('jasmine rice', null, '', 'Pantry', false, 'for serving', 9)
) AS ingredient_data(ingredient, amount, unit, category, is_secondary, notes, sort_order)
WHERE r.slug = 'green-curry-shrimp';

-- Baked Beef Curry Ingredients (for 4 servings - default)
INSERT INTO recipe_ingredients (recipe_id, ingredient, amount, unit, category, is_secondary, notes, sort_order)
SELECT r.id, ingredient, amount, unit, category, is_secondary, notes, sort_order
FROM recipes r,
(VALUES
    ('braising/chuck steak', 1, 'kg', 'Proteins', false, 'cut into chunks', 1),
    ('brown onions', 2, '', 'Produce', false, 'finely diced', 2),
    ('garlic', 4, 'cloves', 'Produce', false, 'finely minced', 3),
    ('fresh ginger', 1, 'tbsp', 'Produce', true, 'ginger paste or thumb-sized piece finely minced', 4),
    ('red chilli', 1, '', 'Produce', true, 'deseeded and finely sliced', 5),
    ('fresh cilantro', null, '', 'Produce', false, 'for garnish (optional)', 6),
    ('ground coriander', 1, 'tbsp', 'Pantry', true, '', 7),
    ('ground cumin', 1, 'tbsp', 'Pantry', true, '', 8),
    ('garam masala', 1, 'tbsp', 'Pantry', true, '', 9),
    ('ground cinnamon', 1, 'tsp', 'Pantry', true, '', 10),
    ('chopped tomatoes', 800, 'g', 'Pantry', true, '2 x 400g tins', 11),
    ('water', 200, 'ml', 'Pantry', false, 'plus extra 100ml if needed', 12),
    ('vegetable oil', 2, 'tbsp', 'Pantry', false, 'divided', 13),
    ('salt and pepper', null, '', 'Pantry', false, 'to taste', 14),
    ('butter', 1, 'tbsp', 'Dairy', false, 'knob-sized', 15),
    ('coconut cream', 250, 'ml', 'Dairy', true, '', 16)
) AS ingredient_data(ingredient, amount, unit, category, is_secondary, notes, sort_order)
WHERE r.slug = 'baked-beef-curry';

-- ============================================================================
-- RECIPE INSTRUCTIONS
-- ============================================================================

-- Green Curry Shrimp Instructions
INSERT INTO recipe_instructions (recipe_id, phase, step_number, instruction, has_quantity, clean_as_you_go)
SELECT r.id, phase, step_number, instruction, has_quantity, clean_as_you_go
FROM recipes r,
(VALUES
    ('mise_en_place', 1, 'Start jasmine rice in rice cooker or saucepan', false, null),
    ('mise_en_place', 2, 'Peel and devein shrimp if not already done, pat dry with paper towels', false, null),
    ('mise_en_place', 3, 'Slice red bell pepper into thin strips', false, null),
    ('mise_en_place', 4, 'Drain bamboo shoots', false, null),
    ('mise_en_place', 5, 'Pick Thai basil leaves from stems', false, null),
    ('mise_en_place', 6, 'Measure out curry paste, fish sauce, and coconut sugar into small bowls', false, null),
    ('mise_en_place', 7, 'Shake coconut milk can well', false, 'Wash cutting board and knife. Wipe down counter.'),
    ('cooking', 1, 'Heat wok over medium-high heat, add 1/2 of the coconut milk', false, null),
    ('cooking', 2, 'Stir constantly until coconut milk begins to separate and oil appears (2-3 min)', false, null),
    ('cooking', 3, 'Add curry paste, stir for 1 minute until fragrant and well combined', false, null),
    ('cooking', 4, 'Add remaining coconut milk, stir well', false, null),
    ('cooking', 5, 'Bring to a gentle simmer, reduce heat to medium', false, 'Rinse the empty coconut milk can and measuring spoons.'),
    ('cooking', 6, 'Add bamboo shoots and sliced red bell pepper, simmer 2 minutes', false, null),
    ('cooking', 7, 'Add shrimp, cook 5-7 minutes until pink and cooked through', false, null),
    ('cooking', 8, 'Stir in fish sauce and coconut sugar, taste and adjust', false, null),
    ('cooking', 9, 'Remove from heat, stir in Thai basil leaves', false, null),
    ('cooking', 10, 'Let rest 1 minute while basil wilts', false, null),
    ('plating', 1, 'Fluff rice and divide into bowls', false, null),
    ('plating', 2, 'Ladle curry over rice, garnish with extra basil if desired', false, 'Turn off heat. Soak wok in warm soapy water while eating.')
) AS instruction_data(phase, step_number, instruction, has_quantity, clean_as_you_go)
WHERE r.slug = 'green-curry-shrimp';

-- Baked Beef Curry Instructions
INSERT INTO recipe_instructions (recipe_id, phase, step_number, instruction, has_quantity, clean_as_you_go)
SELECT r.id, phase, step_number, instruction, has_quantity, clean_as_you_go
FROM recipes r,
(VALUES
    ('mise_en_place', 1, 'Preheat oven to 160°C (fan)', false, null),
    ('mise_en_place', 2, 'Cut braising/chuck steak into chunks, pat dry', false, null),
    ('mise_en_place', 3, 'Finely dice brown onions', false, null),
    ('mise_en_place', 4, 'Finely mince garlic cloves', false, null),
    ('mise_en_place', 5, 'Prepare ginger (paste or minced)', false, null),
    ('mise_en_place', 6, 'Deseed and finely slice red chilli (keep seeds for extra spice)', false, null),
    ('mise_en_place', 7, 'Measure spices into bowl: ground coriander, ground cumin, garam masala, ground cinnamon', false, null),
    ('mise_en_place', 8, 'Open tins of chopped tomatoes', false, null),
    ('mise_en_place', 9, 'Measure coconut cream into small bowl', false, 'Wash cutting board, knife, and measuring tools.'),
    ('cooking', 1, 'Heat casserole dish over medium-high heat', false, null),
    ('cooking', 2, 'Add butter and 1 tbsp vegetable oil to dish', false, null),
    ('cooking', 3, 'Add beef chunks, cook 5-10 minutes until browned and liquid evaporates', false, null),
    ('cooking', 4, 'Remove beef to plate and set aside', false, 'Wipe plate rim if needed.'),
    ('cooking', 5, 'Reduce heat to low, add diced onions and 1 tbsp vegetable oil', false, null),
    ('cooking', 6, 'Cook onions 10 minutes to soften', false, null),
    ('cooking', 7, 'Add minced garlic and ginger, cook 1-2 minutes', false, null),
    ('cooking', 8, 'Add spice mixture and sliced chilli, cook 2 minutes until fragrant', false, null),
    ('cooking', 9, 'Return beef to pan, stir well to coat with spices', false, null),
    ('cooking', 10, 'Add chopped tomatoes and 200ml water (half-fill one tomato tin)', false, 'Rinse empty tomato tins and measuring cup.'),
    ('cooking', 11, 'Bring to boil, then cover with lid and transfer to oven', false, null),
    ('cooking', 12, 'Bake 3 hours, checking after 1.5-2 hours and adding 100ml water if dry', false, null),
    ('cooking', 13, 'Remove from oven (meat should be very tender)', false, null),
    ('cooking', 14, 'Place back on stovetop, stir in coconut cream', false, null),
    ('cooking', 15, 'Bring to simmer and cook 5-10 minutes', false, null),
    ('cooking', 16, 'Taste and adjust seasoning with salt and pepper', false, null),
    ('plating', 1, 'Ladle curry into bowls', false, null),
    ('plating', 2, 'Garnish with fresh cilantro and extra chilli slices if desired', false, null),
    ('plating', 3, 'Serve with gluten-free naan or rice', false, 'Let casserole dish cool, then soak in warm soapy water.')
) AS instruction_data(phase, step_number, instruction, has_quantity, clean_as_you_go)
WHERE r.slug = 'baked-beef-curry';

-- ============================================================================
-- SECONDARY INGREDIENTS (for ingredient wheel filtering)
-- ============================================================================

-- Green Curry Shrimp Secondary Ingredients
INSERT INTO secondary_ingredients (recipe_id, ingredient, slug)
SELECT r.id, secondary_data.ingredient, secondary_data.slug
FROM recipes r,
(VALUES
    ('Coconut', 'coconut'),
    ('Basil', 'basil'),
    ('Bamboo Shoots', 'bamboo-shoots'),
    ('Curry', 'curry')
) AS secondary_data(ingredient, slug)
WHERE r.slug = 'green-curry-shrimp';

-- Baked Beef Curry Secondary Ingredients
INSERT INTO secondary_ingredients (recipe_id, ingredient, slug)
SELECT r.id, secondary_data.ingredient, secondary_data.slug
FROM recipes r,
(VALUES
    ('Coconut', 'coconut'),
    ('Tomato', 'tomato'),
    ('Chilli', 'chilli'),
    ('Ginger', 'ginger'),
    ('Coriander', 'coriander'),
    ('Garam Masala', 'garam-masala')
) AS secondary_data(ingredient, slug)
WHERE r.slug = 'baked-beef-curry';

-- ============================================================================
-- INGREDIENT SUBSTITUTIONS
-- ============================================================================

INSERT INTO ingredient_substitutions (ingredient, recommended_brands, alternative_brands, substitutes) VALUES
('gluten-free green curry paste',
 '["Mae Ploy (yellow label)", "Aroy-D"]'::jsonb,
 '["Thai Kitchen"]'::jsonb,
 '[{"name": "Yellow curry paste", "amount": "same quantity", "note": "Slightly different flavor but still delicious"},
   {"name": "Make your own", "ingredients": ["2 tbsp fresh basil", "1 tbsp fresh cilantro", "1 green chili", "1 tbsp lime juice", "1 clove garlic"], "note": "Blend all ingredients together"}]'::jsonb),

('gluten-free fish sauce',
 '["Red Boat", "Three Crabs"]'::jsonb,
 '["Thai Kitchen"]'::jsonb,
 '[{"name": "Coconut aminos", "amount": "same quantity", "note": "Less salty, slightly sweeter"},
   {"name": "Tamari + salt", "amount": "1 tbsp tamari + pinch of salt per tbsp fish sauce", "note": "Gluten-free soy sauce alternative"}]'::jsonb),

('gluten-free soy sauce',
 '["Kikkoman Gluten-Free", "San-J Tamari"]'::jsonb,
 '["La Choy Gluten-Free", "Trader Joe''s Gluten-Free"]'::jsonb,
 '[{"name": "Coconut aminos", "amount": "same quantity", "note": "Slightly sweeter, less salty"},
   {"name": "Liquid aminos", "amount": "same quantity", "note": "Similar flavor profile"}]'::jsonb),

('gluten-free pasta',
 '["Barilla Gluten-Free", "Jovial", "Tinkyada"]'::jsonb,
 '["Banza (chickpea)", "Ancient Harvest (quinoa)"]'::jsonb,
 '[{"name": "Zucchini noodles", "amount": "same quantity", "note": "Lower carb, fresh alternative"},
   {"name": "Rice noodles", "amount": "same quantity", "note": "Different texture but gluten-free"}]'::jsonb),

('gluten-free bread crumbs',
 '["Ian''s Panko", "Aleia''s"]'::jsonb,
 '["4C Gluten-Free", "Progresso Gluten-Free"]'::jsonb,
 '[{"name": "Crushed gluten-free cereal", "amount": "same quantity", "note": "Rice Chex or Corn Flakes work well"},
   {"name": "Almond flour + parmesan", "amount": "mix 1:1 ratio", "note": "Adds extra flavor"}]'::jsonb),

('gluten-free flour',
 '["King Arthur Measure for Measure", "Bob''s Red Mill 1-to-1"]'::jsonb,
 '["Cup4Cup", "Pamela''s"]'::jsonb,
 '[{"name": "Almond flour", "amount": "1:1 for some recipes", "note": "Not suitable for all baking"},
   {"name": "Rice flour blend", "amount": "varies by recipe", "note": "May need xanthan gum added"}]'::jsonb),

('gluten-free tortillas',
 '["Mission Gluten-Free", "Siete (grain-free)"]'::jsonb,
 '["BFree", "Trader Joe''s Gluten-Free"]'::jsonb,
 '[{"name": "Corn tortillas", "amount": "same quantity", "note": "100% corn is naturally gluten-free"},
   {"name": "Lettuce wraps", "amount": "same quantity", "note": "Lower carb, fresh alternative"}]'::jsonb);

