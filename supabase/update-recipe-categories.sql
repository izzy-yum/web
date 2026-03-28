-- Update Recipe Category Flags
-- Tag recipes with grain/vegetable content based on their composition

-- ============================================================================
-- RECIPES THAT INCLUDE GRAIN/STARCH
-- ============================================================================

-- Bowl recipes with rice
UPDATE recipes SET includes_grain = true
WHERE slug IN (
  'korean-beef-bowl',
  'mediterranean-chicken-bowls',
  'sesame-shrimp-sushi-bowls',
  'shrimp-fajita-bowls'
);

-- Vietnamese noodle bowls/salads (rice noodles)
UPDATE recipes SET includes_grain = true
WHERE slug IN (
  'vietnamese-beef-noodle-salad',
  'vietnamese-chicken-rice-noodle-bowl',
  'vietnamese-pork-rice-noodle-bowl',
  'vietnamese-shrimp-rice-noodle-bowl'
);

-- Recipes with polenta/pasta
UPDATE recipes SET includes_grain = true
WHERE slug IN (
  'braised-beef-wine-polenta',
  'chicken-pad-thai'
);

-- Tacos (tortillas are grain)
UPDATE recipes SET includes_grain = true
WHERE slug IN (
  'beef-tacos',
  'gluten-free-chicken-tacos'
);

-- Japanese curry (typically includes rice as part of dish)
UPDATE recipes SET includes_grain = true
WHERE slug = 'japanese-beef-curry';

-- ============================================================================
-- RECIPES THAT INCLUDE VEGETABLES
-- ============================================================================

-- Lettuce wrap recipes (lettuce is substantial vegetable)
UPDATE recipes SET includes_vegetable = true
WHERE slug IN (
  'asian-beef-lettuce-wraps',
  'thai-beef-lettuce-wraps'
);

-- Recipes with "vegetable" or "veggie" in name
UPDATE recipes SET includes_vegetable = true
WHERE slug IN (
  'mediterranean-beef-veggie-skillet',
  'mediterranean-chicken-stir-fry-vegetables',
  'mexican-chicken-vegetable-bake',
  'sheet-pan-mediterranean-shrimp-vegetables'
);

-- Stir fry (typically substantial vegetables)
UPDATE recipes SET includes_vegetable = true
WHERE slug = 'tofu-stir-fry';

-- Bake recipes with vegetables
UPDATE recipes SET includes_vegetable = true
WHERE slug = 'mexican-street-corn-chicken-bake';

-- Vietnamese noodle bowls (include vegetables)
UPDATE recipes SET includes_vegetable = true
WHERE slug IN (
  'vietnamese-beef-noodle-salad',
  'vietnamese-chicken-rice-noodle-bowl',
  'vietnamese-pork-rice-noodle-bowl',
  'vietnamese-shrimp-rice-noodle-bowl'
);

-- ============================================================================
-- RECIPES THAT ARE COMPLETE MEALS (Protein + Grain + Vegetable)
-- ============================================================================

-- Vietnamese noodle bowls are complete meals
UPDATE recipes
SET includes_protein = true, includes_grain = true, includes_vegetable = true
WHERE slug IN (
  'vietnamese-beef-noodle-salad',
  'vietnamese-chicken-rice-noodle-bowl',
  'vietnamese-pork-rice-noodle-bowl',
  'vietnamese-shrimp-rice-noodle-bowl'
);

-- ============================================================================
-- VERIFICATION QUERY
-- ============================================================================

-- Run this to see tagged recipes:
-- SELECT name, includes_protein, includes_grain, includes_vegetable
-- FROM recipes
-- WHERE includes_grain = true OR includes_vegetable = true
-- ORDER BY name;
