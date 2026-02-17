-- Create core tables for Izzy Yum recipe system
-- This migration creates all foundational tables with proper relationships and constraints

-- ============================================================================
-- USERS TABLE
-- ============================================================================
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    phone_device_token TEXT  -- For push notifications to iOS app
);

-- ============================================================================
-- PROTEINS TABLE
-- ============================================================================
CREATE TABLE proteins (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    image_url TEXT NOT NULL,
    sort_order INTEGER
);

-- ============================================================================
-- CUISINES TABLE
-- ============================================================================
CREATE TABLE cuisines (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    image_url TEXT NOT NULL,
    description TEXT,
    sort_order INTEGER
);

-- ============================================================================
-- RECIPES TABLE
-- ============================================================================
CREATE TABLE recipes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    protein_id UUID REFERENCES proteins(id),
    cuisine_id UUID REFERENCES cuisines(id),
    image_url TEXT NOT NULL,
    prep_time_min INTEGER,
    cook_time_min INTEGER,
    total_time_min INTEGER,
    difficulty TEXT CHECK (difficulty IN ('Easy', 'Medium', 'Hard')),
    default_servings INTEGER DEFAULT 2,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- RECIPE EQUIPMENT TABLE
-- ============================================================================
CREATE TABLE recipe_equipment (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    recipe_id UUID REFERENCES recipes(id) ON DELETE CASCADE,
    equipment TEXT NOT NULL,
    category TEXT,
    sort_order INTEGER
);

-- ============================================================================
-- RECIPE INGREDIENTS TABLE
-- ============================================================================
CREATE TABLE recipe_ingredients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    recipe_id UUID REFERENCES recipes(id) ON DELETE CASCADE,
    ingredient TEXT NOT NULL,
    amount DECIMAL,
    unit TEXT,
    category TEXT,
    is_secondary BOOLEAN DEFAULT FALSE,
    notes TEXT,
    sort_order INTEGER
);

-- ============================================================================
-- RECIPE INSTRUCTIONS TABLE
-- ============================================================================
CREATE TABLE recipe_instructions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    recipe_id UUID REFERENCES recipes(id) ON DELETE CASCADE,
    phase TEXT CHECK (phase IN ('mise_en_place', 'cooking', 'plating')),
    step_number INTEGER,
    instruction TEXT NOT NULL,
    has_quantity BOOLEAN DEFAULT FALSE,
    clean_as_you_go TEXT
);

-- ============================================================================
-- SECONDARY INGREDIENTS TABLE
-- Used to populate the ingredient wheel for filtering
-- ============================================================================
CREATE TABLE secondary_ingredients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    recipe_id UUID REFERENCES recipes(id) ON DELETE CASCADE,
    ingredient TEXT NOT NULL,
    slug TEXT NOT NULL
);

-- ============================================================================
-- SHOPPING LISTS TABLE
-- ============================================================================
CREATE TABLE shopping_lists (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    recipe_id UUID REFERENCES recipes(id),
    servings INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed'))
);

-- ============================================================================
-- SHOPPING LIST ITEMS TABLE
-- ============================================================================
CREATE TABLE shopping_list_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    shopping_list_id UUID REFERENCES shopping_lists(id) ON DELETE CASCADE,
    ingredient TEXT NOT NULL,
    amount DECIMAL,
    unit TEXT,
    category TEXT,
    is_checked BOOLEAN DEFAULT FALSE,
    recommended_brand TEXT,
    substitution_used TEXT,
    notes TEXT,
    sort_order INTEGER
);

-- ============================================================================
-- INGREDIENT SUBSTITUTIONS TABLE
-- Pre-programmed substitution knowledge (no AI)
-- ============================================================================
CREATE TABLE ingredient_substitutions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    ingredient TEXT NOT NULL,
    recommended_brands JSONB,
    alternative_brands JSONB,
    substitutes JSONB
);

-- ============================================================================
-- INDEXES FOR QUERY PERFORMANCE
-- ============================================================================

-- Proteins
CREATE INDEX idx_proteins_slug ON proteins(slug);

-- Cuisines
CREATE INDEX idx_cuisines_slug ON cuisines(slug);

-- Recipes
CREATE INDEX idx_recipes_slug ON recipes(slug);
CREATE INDEX idx_recipes_protein_id ON recipes(protein_id);
CREATE INDEX idx_recipes_cuisine_id ON recipes(cuisine_id);
CREATE INDEX idx_recipes_protein_cuisine ON recipes(protein_id, cuisine_id);

-- Recipe Equipment
CREATE INDEX idx_recipe_equipment_recipe_id ON recipe_equipment(recipe_id);

-- Recipe Ingredients
CREATE INDEX idx_recipe_ingredients_recipe_id ON recipe_ingredients(recipe_id);
CREATE INDEX idx_recipe_ingredients_secondary ON recipe_ingredients(recipe_id, is_secondary);

-- Recipe Instructions
CREATE INDEX idx_recipe_instructions_recipe_id ON recipe_instructions(recipe_id);
CREATE INDEX idx_recipe_instructions_phase ON recipe_instructions(recipe_id, phase);

-- Secondary Ingredients
CREATE INDEX idx_secondary_ingredients_recipe_id ON secondary_ingredients(recipe_id);
CREATE INDEX idx_secondary_ingredients_slug ON secondary_ingredients(slug);

-- Shopping Lists
CREATE INDEX idx_shopping_lists_user_id ON shopping_lists(user_id);
CREATE INDEX idx_shopping_lists_status ON shopping_lists(user_id, status);

-- Shopping List Items
CREATE INDEX idx_shopping_list_items_list_id ON shopping_list_items(shopping_list_id);

-- Ingredient Substitutions
CREATE INDEX idx_ingredient_substitutions_ingredient ON ingredient_substitutions(ingredient);

-- ============================================================================
-- COMMENTS FOR DOCUMENTATION
-- ============================================================================

COMMENT ON TABLE users IS 'User accounts for the Izzy Yum application';
COMMENT ON TABLE proteins IS 'Protein types for recipe categorization (Shrimp, Chicken, Beef, etc.)';
COMMENT ON TABLE cuisines IS 'Cuisine types for recipe categorization (Thai, Italian, Mexican, etc.)';
COMMENT ON TABLE recipes IS 'Main recipes table with all recipe metadata';
COMMENT ON TABLE recipe_equipment IS 'Equipment needed for each recipe';
COMMENT ON TABLE recipe_ingredients IS 'Ingredients for each recipe with amounts for default serving size';
COMMENT ON TABLE recipe_instructions IS 'Step-by-step cooking instructions organized by phase';
COMMENT ON TABLE secondary_ingredients IS 'Ingredients used for the ingredient wheel filtering UI';
COMMENT ON TABLE shopping_lists IS 'Shopping lists generated from recipes and sent to iOS app';
COMMENT ON TABLE shopping_list_items IS 'Individual items in a shopping list';
COMMENT ON TABLE ingredient_substitutions IS 'Pre-programmed gluten-free substitution knowledge';
