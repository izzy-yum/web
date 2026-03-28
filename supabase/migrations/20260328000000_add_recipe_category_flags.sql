-- Recipe Category Tagging: Add flags for all-in-one recipes
-- Some recipes (bowls, casseroles) already include grains and/or vegetables
-- Migration: Add boolean flags to recipes table

-- ============================================================================
-- ADD CATEGORY FLAGS TO RECIPES TABLE
-- ============================================================================

-- Add boolean flags to indicate which dish categories the recipe includes
ALTER TABLE recipes
ADD COLUMN IF NOT EXISTS includes_protein BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS includes_grain BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS includes_vegetable BOOLEAN DEFAULT false;

-- Add comments for clarity
COMMENT ON COLUMN recipes.includes_protein IS 'True if recipe is a protein dish (default: all recipes)';
COMMENT ON COLUMN recipes.includes_grain IS 'True if recipe already includes rice, noodles, tortillas, or other grains/starches';
COMMENT ON COLUMN recipes.includes_vegetable IS 'True if recipe already includes substantial vegetable content';

-- ============================================================================
-- UPDATE EXISTING RECIPES WITH APPROPRIATE FLAGS
-- ============================================================================

-- Note: After this migration, manually review and update specific recipes
-- Examples to tag:
-- - Bowl recipes (often have rice): includes_grain = true
-- - Stir-fries with rice: includes_grain = true
-- - Tacos with tortillas: includes_grain = true
-- - Salad-based proteins: includes_vegetable = true
-- - Casseroles with vegetables: includes_vegetable = true

-- These will be updated in a separate data migration or via update script
