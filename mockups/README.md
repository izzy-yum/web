# Meal Summary View - Design Mockups

Three different design approaches for the Complete Meal summary page.

**Location:** `/Users/edwin/izzy_yum/web/mockups/`

---

## How to View

Open each HTML file in your browser:

```bash
open /Users/edwin/izzy_yum/web/mockups/option-a-cards.html
open /Users/edwin/izzy_yum/web/mockups/option-b-timeline.html
open /Users/edwin/izzy_yum/web/mockups/option-c-simple.html
```

Or just double-click the files in Finder.

---

## Option A: Card Layout

**Visual cards with images, tabs for content organization**

**Layout:**
- 3 large cards side-by-side (protein, grain, vegetable)
- Each shows image placeholder, name, description, time
- Tabs below cards: Shopping List / Cooking Timeline / All Instructions
- Edit links on each card

**Pros:**
- ✅ Highly visual and engaging
- ✅ Each component feels equal in importance
- ✅ Tabs organize content nicely
- ✅ Good for recipe discovery feel

**Cons:**
- ❌ Requires scrolling to see everything
- ❌ Images might be redundant on summary
- ❌ More complex layout

**Best for:** Users who value visual presentation

---

## Option B: Timeline Focus

**Cooking timeline as primary content, compact sidebar**

**Layout:**
- Header banner (burgundy) with meal overview
- Left column (wider): Detailed cooking timeline
- Right sidebar (narrower): Meal components + shopping button
- Timeline shows when to start each dish

**Pros:**
- ✅ Emphasizes meal coordination (key feature!)
- ✅ Timeline front and center
- ✅ Efficient use of space
- ✅ Helps users cook all dishes to finish together

**Cons:**
- ❌ Less visual (no big images)
- ❌ More information dense
- ❌ Timeline might overwhelm some users

**Best for:** Users who care about cooking timing

---

## Option C: Simple & Clean

**Single burgundy panel, list-based, action-focused**

**Layout:**
- Centered single-panel design
- List of 3 components (icons, no images)
- Quick stats (time, ingredients, servings)
- Prominent "Send to iPhone" button
- Collapsible/secondary actions for timeline

**Pros:**
- ✅ Fastest to scan and understand
- ✅ Fits on one screen (no scrolling)
- ✅ Matches app's burgundy panel styling
- ✅ Action-focused (get shopping list)
- ✅ Least overwhelming

**Cons:**
- ❌ No images (less engaging)
- ❌ Timeline hidden in button (less discoverable)
- ❌ Less detailed at first glance

**Best for:** Users who want quick summary and action

---

## Key Features in All Options

All mockups include:
- ✅ All 3 meal components clearly shown
- ✅ Color coding (red/yellow/green for protein/grain/vegetable)
- ✅ Time estimates for each dish
- ✅ "Send to iPhone" primary action
- ✅ Edit/change options
- ✅ Consistent Izzy Yum styling (#8d2831 burgundy)

---

## Comparison Table

| Feature | Option A (Cards) | Option B (Timeline) | Option C (Simple) |
|---------|------------------|---------------------|-------------------|
| **Visual Impact** | High (images) | Medium (no images) | Low (icons only) |
| **Information Density** | Low (spread out) | High (compact) | Medium (focused) |
| **Timeline Prominence** | Hidden in tab | Front and center | Hidden in button |
| **Scrolling Required** | Yes | Some | No |
| **Best For** | Visual learners | Timing-focused cooks | Quick action |
| **Development Time** | 6-8 hours | 8-10 hours | 4-6 hours |

---

## Questions for You

1. **Which layout feels most natural for your workflow?**
2. **How important is the cooking timeline to show immediately?**
3. **Do you want images on the summary, or is list view enough?**
4. **Should shopping list be inline, in a tab, or in a modal?**
5. **Is "Save Meal" a priority feature?**

---

## My Recommendation

**Start with Option C (Simple)** because:
- Fastest to build (4-6 hours)
- Matches current app style (burgundy panels)
- Action-focused (send shopping list)
- Can always enhance later with timeline/images

Then we can add:
- Expandable timeline section
- Optional images
- Tabs if needed

---

## Next Steps

1. **Review all 3 HTML files** in your browser
2. **Pick your favorite** (or mix features)
3. **Tell me which to build**
4. **I'll create the actual React component**

---

*Note: These mockups use your actual brand colors and are responsive-ready.*
