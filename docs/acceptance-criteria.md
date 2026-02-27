# CodeKitchen — Acceptance Criteria
> Modules 1–3 · Based on design discussions

---

## Module 1 — Preparing Ingredients
**Concept:** Data Types (Integer, String, Boolean)
**Metaphor:** Flour combines (int), eggs stack (string), pantry is yes/no (boolean)
**Format:** Drag-and-drop shelf → recipe card with three steps

### Acceptance Criteria
- Shelf shows three sections (Flour / Eggs / Pantry) with draggable ingredient items
- **Step 1 (Integer)** — two drop slots; auto-computes sum when both filled; success when result = `5`; warns if a string is dropped instead
- **Step 2 (String)** — two drop slots; auto-concatenates when both filled; success when result = `"eggs"`; hint if wrong labels chosen
- **Step 3 (Boolean)** — recipe checklist (milk, sugar); multi-item drop container; each dropped item shows `isNeeded = true/false`; hint shown when an unneeded item is dropped; complete when milk and sugar are both present
- Complete button appears only when all three steps are satisfied

### Scenarios

| # | Given | When | Then |
|---|-------|------|------|
| 1 | Flour shelf items | User drags 🌾2 + 🌾3 into Step 1 slots | Shows `2 + 3 = 5` ✓ |
| 2 | Step 1 slots | User drags a flour bag + an egg label | Shows `2 + "eg" = "2eg"` and warns "that's a string" |
| 3 | Step 1 | User drags bags that don't sum to 5 | Shows result with "need 5 — try different bags" |
| 4 | Egg shelf items | User drags 🥚"eg" + 🥚"gs" into Step 2 slots | Shows `"eg" + "gs" = "eggs"` ✓ |
| 5 | Step 2 | User drags wrong egg labels | Shows concatenated result with "not quite" hint |
| 6 | Pantry drop container | User drags 🥛 milk | Container shows `milk = true` ✓, pill turns green |
| 7 | Pantry drop container | User drags 🧈 butter | Container shows `butter = false`, hint explains isNeeded |
| 8 | All three steps correct | — | Complete button appears |
| 9 | Complete clicked | — | Module marked done, returns to main menu |

---

## Module 2 — Mise en Place
**Concept:** Variables & Reassignment
**Metaphor:** Labeled prep bowls — the label stays, the contents can change
**Narrative:** Continues directly from Module 1 — bowls arrive pre-filled with the values discovered there

### Acceptance Criteria
- Tutorial shows three concept cards (Name, Value, Reassignment) and a worked before/after example of reassigning `flour` from `5` to `3`
- Exercise opens with four bowls pre-filled from Module 1: `flour = 5 cups`, `eggs = "eggs"`, `milk = true`, `sugar = true`
- Shelf shows 6 draggable new values
- Three recipe-update task cards describe what needs to change and which bowl to target
- Dragging any shelf value into a bowl reassigns it immediately
- History panel logs every reassignment as `name: ~~old~~ → new`
- A task card checks off only when its bowl holds the exact expected value
- Complete button is disabled until all three tasks are done

### Scenarios

| # | Given | When | Then |
|---|-------|------|------|
| 1 | `flour = 5 cups` | User drags `3 cups` into flour bowl | Bowl shows `3 cups`, history shows `~~5 cups~~ → 3 cups`, task 1 ✓ |
| 2 | `milk = true` | User drags `"oat"` into milk bowl | Bowl shows `"oat"`, task 2 ✓ |
| 3 | `sugar = true` | User drags `"brown"` into sugar bowl | Bowl shows `"brown"`, task 3 ✓ |
| 4 | Any bowl | User drags a wrong value (e.g. `"hemp"` into flour) | Bowl updates, history logs it, task stays unchecked |
| 5 | All 3 tasks done | — | Complete button becomes active |
| 6 | Complete clicked | — | Module marked done, returns to main menu |

---

## Module 3 — Instant Spices / Pancake Kitchen
**Concept:** Functions (parameters, return value, reusability)
**Metaphor:** Pantry ingredients → mixing bowl → technique → pancake

### Acceptance Criteria
- Clicking a pantry ingredient adds it to the mixing bowl
- Clicking an ingredient in the bowl removes it
- Three techniques selectable at any time:
  - `mix(bowl)` — returns all ingredients as an ordered list
  - `whisk(bowl)` — returns deduplicated list
  - `fold(bowl)` — returns a count of each ingredient `{ flour: 2, eggs: 1 }`
- Cook button is disabled when the bowl is empty
- Result panel appears after cooking; a hint encourages trying a different technique
- Complete button appears only after the user has cooked at least twice (encouraging exploration of different techniques)
- Pantry carries forward narrative from Modules 1 & 2: flour, eggs, oat milk, brown sugar, plus baking powder, salt, butter

### Scenarios

| # | Given | When | Then |
|---|-------|------|------|
| 1 | Bowl has flour, eggs, milk; mix() selected | User clicks Cook | Result: `["flour", "eggs", "oat milk"]` in order |
| 2 | Bowl has flour added twice; whisk() selected | User clicks Cook | Result: `["flour"]` — duplicate removed |
| 3 | Bowl has flour ×2, eggs ×1; fold() selected | User clicks Cook | Result: `{ flour: 2, eggs: 1 }` |
| 4 | Same bowl contents, switch mix() → fold() | User clicks Cook | Different result — same inputs, different function |
| 5 | Bowl is empty | — | Cook button is disabled |
| 6 | User clicks an ingredient in the bowl | — | Ingredient removed from bowl |
| 7 | Cook clicked once | Result shown | Hint: "Try a different technique with the same bowl" |
| 8 | Cook clicked twice or more | Complete button visible | User clicks Complete → module marked done, returns to menu |

---

*Last updated: design phase · see `docs/modules-requirements.txt` for technical specs*
