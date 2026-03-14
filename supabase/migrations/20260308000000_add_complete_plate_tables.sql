-- Complete Plate Feature: Side Dishes and Balanced Meal Planning
-- Migration: Add tables for grains, vegetables, and complete meals

-- ============================================================================
-- DISH CATEGORIES (Grain, Vegetable, Protein)
-- ============================================================================

CREATE TABLE IF NOT EXISTS dish_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  color TEXT, -- For UI: '#4ade80' for vegetables, '#fbbf24' for grains, '#ef4444' for protein
  plate_proportion DECIMAL, -- 0.5 for vegetables, 0.25 for grains, 0.25 for protein
  sort_order INTEGER
);

-- Insert categories
INSERT INTO dish_categories (name, slug, description, color, plate_proportion, sort_order) VALUES
('Vegetable', 'vegetable', 'Vegetables and salads - should fill half the plate', '#4ade80', 0.5, 1),
('Grain/Starch', 'grain', 'Grains, starches, and breads - should fill quarter of the plate', '#fbbf24', 0.25, 2),
('Protein', 'protein', 'Main protein dish - should fill quarter of the plate', '#ef4444', 0.25, 3);

-- ============================================================================
-- SIDE DISHES (Grains and Vegetables)
-- ============================================================================

CREATE TABLE IF NOT EXISTS side_dishes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  category_id UUID REFERENCES dish_categories(id),
  cuisine_id UUID REFERENCES cuisines(id), -- Can be NULL for universal sides (e.g., plain rice)
  image_url TEXT,
  prep_time_min INTEGER,
  cook_time_min INTEGER,
  total_time_min INTEGER,
  difficulty TEXT CHECK (difficulty IN ('Easy', 'Medium', 'Hard')),
  default_servings INTEGER DEFAULT 4,
  pairing_notes TEXT, -- "Pairs well with spicy dishes", "Good for rich creamy sauces"
  is_universal BOOLEAN DEFAULT FALSE, -- True for sides that go with any cuisine
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX idx_side_dishes_category ON side_dishes(category_id);
CREATE INDEX idx_side_dishes_cuisine ON side_dishes(cuisine_id);

-- ============================================================================
-- SIDE DISH EQUIPMENT
-- ============================================================================

CREATE TABLE IF NOT EXISTS side_dish_equipment (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  side_dish_id UUID REFERENCES side_dishes(id) ON DELETE CASCADE,
  equipment TEXT NOT NULL,
  category TEXT, -- 'Cooking', 'Prep', 'Measuring'
  sort_order INTEGER
);

-- ============================================================================
-- SIDE DISH INGREDIENTS
-- ============================================================================

CREATE TABLE IF NOT EXISTS side_dish_ingredients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  side_dish_id UUID REFERENCES side_dishes(id) ON DELETE CASCADE,
  ingredient TEXT NOT NULL,
  amount DECIMAL,
  unit TEXT,
  category TEXT, -- 'Produce', 'Pantry', 'Dairy', etc.
  notes TEXT,
  sort_order INTEGER
);

-- ============================================================================
-- SIDE DISH INSTRUCTIONS
-- ============================================================================

CREATE TABLE IF NOT EXISTS side_dish_instructions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  side_dish_id UUID REFERENCES side_dishes(id) ON DELETE CASCADE,
  phase TEXT CHECK (phase IN ('mise_en_place', 'cooking', 'plating')),
  step_number INTEGER,
  instruction TEXT NOT NULL,
  has_quantity BOOLEAN DEFAULT FALSE,
  clean_as_you_go TEXT
);

-- ============================================================================
-- MEALS (Complete Plate Combinations)
-- ============================================================================

CREATE TABLE IF NOT EXISTS meals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT, -- Optional user-provided name like "My Thai Dinner"
  recipe_id UUID REFERENCES recipes(id), -- Main protein dish
  grain_id UUID REFERENCES side_dishes(id), -- Single grain/starch side
  servings INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for user queries
CREATE INDEX idx_meals_user ON meals(user_id);
CREATE INDEX idx_meals_recipe ON meals(recipe_id);

-- ============================================================================
-- MEAL SIDES (Many-to-Many for Multiple Vegetables)
-- ============================================================================

CREATE TABLE IF NOT EXISTS meal_sides (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  meal_id UUID REFERENCES meals(id) ON DELETE CASCADE,
  side_dish_id UUID REFERENCES side_dishes(id),
  quantity INTEGER DEFAULT 1, -- If user wants double portion
  sort_order INTEGER
);

-- Create index for meal queries
CREATE INDEX idx_meal_sides_meal ON meal_sides(meal_id);

-- ============================================================================
-- COMMENTS
-- ============================================================================

COMMENT ON TABLE dish_categories IS 'Categories for balanced plate: Vegetables (50%), Grains (25%), Protein (25%)';
COMMENT ON TABLE side_dishes IS 'Grain and vegetable side dishes to complete balanced meals';
COMMENT ON TABLE meals IS 'Complete balanced meals combining protein + grain + vegetables';
COMMENT ON TABLE meal_sides IS 'Vegetables for a meal (many-to-many to allow multiple vegetables)';

COMMENT ON COLUMN side_dishes.is_universal IS 'True for sides that pair well with any cuisine (e.g., plain rice, steamed broccoli)';
COMMENT ON COLUMN side_dishes.pairing_notes IS 'Guidance on what main dishes this side pairs well with';
COMMENT ON COLUMN meals.grain_id IS 'Single grain/starch side dish (one per meal)';
