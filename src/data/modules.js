// src/data/modules.js
// Central source of truth for all module metadata

import placeholderPreparing from "../assets/placeholders/module1.png";
import placeholderReassignment from "../assets/placeholders/module2.png";
import placeholderFunctions from "../assets/placeholders/module3.png";

export const MODULES = [
  {
    id: 1,
    slug: "ingredients",
    title: "Preparing Ingredients",
    subtitle: "Data Types & Manipulation",
    concepts: ["Integer", "String", "Boolean"],
    analogy: "Ingredients in cooking — diced or minced, raw or prepared",
    route: "/modules/ingredients",
    image: placeholderPreparing,
  },
  {
    id: 2,
    slug: "mise-en-place",
    title: "Swapping Ingredients",
    subtitle: "Variables",
    concepts: ["Variable assignment", "Naming", "Retrieval"],
    analogy: "Prepping everything before cooking — easy to grab when needed",
    route: "/modules/mise-en-place",
    image: placeholderReassignment,
  },
  {
    id: 3,
    slug: "instant-spices",
    title: "Assembling Ingredients",
    subtitle: "Functions",
    concepts: ["Defining functions", "Parameters", "Return values"],
    analogy: "Premixed spice packets — call them anytime, get consistent results",
    route: "/modules/instant-spices",
    image: placeholderFunctions,
  },
  {
    id: 4,
    slug: "spice-combinations",
    title: "Spice Combinations",
    subtitle: "If, Else, And, Or, Not",
    concepts: ["If/else", "Boolean logic", "Conditionals"],
    analogy: "Which spices go well together? Conditional flavor combinations",
    route: "/modules/spice-combinations",
    image: "/assets/images/modules/spice-combinations.jpg",
  },
  {
    id: 5,
    slug: "skewers",
    title: "Composing Skewers",
    subtitle: "Array, Stack, and Queue",
    concepts: ["Arrays", "Stack (LIFO)", "Queue (FIFO)"],
    analogy: "Building a skewer — order matters, some picky kid is picking it apart",
    route: "/modules/skewers",
    image: "/assets/images/modules/skewers.jpg",
  },
  {
    id: 6,
    slug: "layer-cake",
    title: "Layer Cakes",
    subtitle: "Loops",
    concepts: ["for loops", "while loops", "Iteration"],
    analogy: "Repeatedly frosting cake layers — same action, multiple times",
    route: "/modules/layer-cake",
    image: "/assets/images/modules/layer-cake.jpg",
  },
  {
    id: 7,
    slug: "cracking-eggs",
    title: "Cracking Eggs",
    subtitle: "Recursion",
    concepts: ["Recursive functions", "Base case", "Call stack"],
    analogy: "Fewest sink visits to cook an egg dish — trace the recursive tree",
    route: "/modules/cracking-eggs",
    image: "/assets/images/modules/cracking-eggs.jpg",
  },
];
