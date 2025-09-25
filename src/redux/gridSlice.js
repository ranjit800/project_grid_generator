// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   gridSize: { rows: 5, cols: 5 },
//   elements: [],
// };

// const gridSlice = createSlice({
//   name: "grid",
//   initialState,
//   reducers: {
//     placeElement: (state, action) => {
//       const { position, element } = action.payload;
//       const existing = state.elements.find(
//         (el) =>
//           el.position[0] === position[0] &&
//           el.position[1] === position[1]
//       );

//       if (existing) {
//         existing.items.push(element);
//       } else {
//         state.elements.push({ position, items: [element] });
//       }
//     },

//     // ✅ update gridSize from JSON editor
//     setGridSize: (state, action) => {
//       state.gridSize = action.payload; // { rows, cols }
//     },

//     // ✅ update elements from JSON editor
//     setElements: (state, action) => {
//       state.elements = action.payload; // array of elements
//     },
//   },
// });

// export const { placeElement, setGridSize, setElements } = gridSlice.actions;
// export default gridSlice.reducer;
//====================================================================================================================

// import { createSlice } from "@reduxjs/toolkit";
// import { library } from "../data/library"; // ✅ library se Dirt uthayenge

// // ✅ Default Dirt element
// const dirtElement = library["Ground Covers"].find((g) => g.name === "Dirt");

// // ✅ Helper: har cell ko Dirt se initialize karo
// function generateInitialGrid(rows, cols) {
//   const elements = [];
//   for (let r = 0; r < rows; r++) {
//     for (let c = 0; c < cols; c++) {
//       elements.push({
//         position: [r, c],
//         items: [
//           {
//             ...dirtElement,
//             id: `dirt-${r}-${c}`, // unique ID
//           },
//         ],
//       });
//     }
//   }
//   return elements;
// }

// const initialState = {
//   gridSize: { rows: 5, cols: 5 },
//   elements: generateInitialGrid(5, 5), // ✅ by default sab cells Dirt
// };

// const gridSlice = createSlice({
//   name: "grid",
//   initialState,
//   reducers: {
//   placeElement: (state, action) => {
//   const { position, element, tool } = action.payload;
//   const existing = state.elements.find(
//     (el) =>
//       el.position[0] === position[0] &&
//       el.position[1] === position[1]
//   );

//   if (!existing) return;

//   // 🟢 Case 1: Ground cover placement
//   if (element.type === "groundCover") {
//     // groundCover always first item (index 0)
//     existing.items[0] = element;
//     return;
//   }

//   // 🟢 Case 2: Shovel tool
//   if (tool === "shovel") {
//     const dirtElement = library["Ground Covers"].find((g) => g.name === "Dirt");
//     existing.items[0] = { ...dirtElement, id: `dirt-${position[0]}-${position[1]}` };
//     return;
//   }

//   // 🟢 Case 3: Other elements (plants, trees, furniture...)
//   existing.items.push(element);
// },

//     // ✅ update gridSize from JSON editor → naya grid Dirt ke saath banega
//     setGridSize: (state, action) => {
//       const { rows, cols } = action.payload;
//       state.gridSize = { rows, cols };
//       state.elements = generateInitialGrid(rows, cols); // reset with Dirt
//     },

// //     updateGroundCover: (state, action) => {
// //   const { position, ground } = action.payload;
// //   const existing = state.elements.find(
// //     (el) =>
// //       el.position[0] === position[0] &&
// //       el.position[1] === position[1]
// //   );

// //   if (existing) {
// //     // replace sirf index 0 (groundCover) ko
// //     existing.items[0] = ground;
// //   }
// // },

//     // ✅ update elements from JSON editor
//     setElements: (state, action) => {
//       state.elements = action.payload; // array of elements
//     },
//   },
// });

// export const { placeElement, setGridSize, setElements, } = gridSlice.actions;
// export default gridSlice.reducer;

// import { createSlice } from "@reduxjs/toolkit";
// import { library } from "../data/library"; // ✅ library se Dirt uthayenge

// // ✅ Default Dirt element
// const dirtElement = library["Ground Covers"].find((g) => g.name === "Dirt");

// // ✅ Helper: har cell ko Dirt se initialize karo
// function generateInitialGrid(rows, cols) {
//   const elements = [];
//   for (let r = 0; r < rows; r++) {
//     for (let c = 0; c < cols; c++) {
//       elements.push({
//         position: [r, c],
//         items: [
//           {
//             ...dirtElement,
//             id: `dirt-${r}-${c}`, // unique ID
//           },
//         ],
//       });
//     }
//   }
//   return elements;
// }

// const initialState = {
//   gridSize: { rows: 5, cols: 5 },
//   elements: generateInitialGrid(5, 5), // ✅ by default sab cells Dirt
// };

// const gridSlice = createSlice({
//   name: "grid",
//   initialState,
//   reducers: {
//     placeElement: (state, action) => {
//       const { position, element, tool } = action.payload;
//       const existing = state.elements.find((el) => el.position[0] === position[0] && el.position[1] === position[1]);

//       if (!existing) return;

//       // 🟢 Case 1: Ground cover placement
//       if (element.type === "groundCover") {
//         // groundCover always first item (index 0)
//         existing.items[0] = element;
//         return;
//       }

//       // 🟢 Case 2: Shovel tool
//       if (tool === "shovel") {
//         const dirtElement = library["Ground Covers"].find((g) => g.name === "Dirt");
//         existing.items[0] = { ...dirtElement, id: `dirt-${position[0]}-${position[1]}` };
//         return;
//       }

//       // 🟢 Case 3: Other elements (plants, trees, furniture...)
//       existing.items.push(element);
//     },

//     // ✅ update gridSize from JSON editor → naya grid Dirt ke saath banega
//     setGridSize: (state, action) => {
//       const { rows, cols } = action.payload;
//       state.gridSize = { rows, cols };
//       state.elements = generateInitialGrid(rows, cols); // reset with Dirt
//     },

//     // ✅ update elements from JSON editor
//     setElements: (state, action) => {
//       state.elements = action.payload; // array of elements
//     },
//   },
// });

// export const { placeElement, setGridSize, setElements } = gridSlice.actions;
// export default gridSlice.reducer;

// ============================check points============================

// import { createSlice } from "@reduxjs/toolkit";

// // Default dirt element (har cell ke liye bydefault)
// const dirtElement = {
//   id: "dirt-default",
//   type: "groundCover",
//   name: "Dirt",
//   iconKey: "groundCover",
//   size: [1, 1],
//   color: "#8B4513",
//   description: "A loose mixture of earth, organic matter, and minerals.",
// };

// const initialState = {
//   gridSize: { rows: 5, cols: 5 },
//   elements: [], // ✅ ye initializeGrid ke through auto-fill hoga
// };

// const gridSlice = createSlice({
//   name: "grid",
//   initialState,
//   reducers: {
//     // ✅ Initialize grid with Dirt everywhere
//     initializeGrid: (state, action) => {
//       const { rows, cols } = action.payload || state.gridSize;
//       state.gridSize = { rows, cols };
//       state.elements = [];
//       for (let r = 0; r < rows; r++) {
//         for (let c = 0; c < cols; c++) {
//           state.elements.push({
//             position: [r, c],
//             items: [{ ...dirtElement, id: `dirt-${r}-${c}` }],
//           });
//         }
//       }
//     },

//     // ✅ place new element (trees, plants, ground covers, etc.)
//     placeElement: (state, action) => {
//       const { position, element } = action.payload;
//       const existing = state.elements.find(
//         (el) => el.position[0] === position[0] && el.position[1] === position[1]
//       );

//       if (existing) {
//         if (element.type === "groundCover") {
//           // replace ground cover at that cell
//           existing.items = [
//             element,
//             ...existing.items.filter((it) => it.type !== "groundCover"),
//           ];
//         } else {
//           existing.items.push(element);
//         }
//       } else {
//         state.elements.push({ position, items: [element] });
//       }
//     },

//     // ✅ update ground cover (used by Shovel tool to reset → Dirt)
//     updateGroundCover: (state, action) => {
//       const { position, ground } = action.payload;
//       const existing = state.elements.find(
//         (el) => el.position[0] === position[0] && el.position[1] === position[1]
//       );

//       if (existing) {
//         existing.items = [
//           ground,
//           ...existing.items.filter((it) => it.type !== "groundCover"),
//         ];
//       } else {
//         state.elements.push({ position, items: [ground] });
//       }
//     },

//     // ✅ update gridSize from JSON editor
//     setGridSize: (state, action) => {
//       state.gridSize = action.payload; // { rows, cols }
//     },

//     // ✅ update elements from JSON editor
//     setElements: (state, action) => {
//       state.elements = action.payload; // array of elements
//     },
//   },
// });

// export const {
//   initializeGrid,
//   placeElement,
//   updateGroundCover,
//   setGridSize,
//   setElements,
// } = gridSlice.actions;

// export default gridSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

// Default dirt element (every cell default)
const dirtElement = {
  id: "dirt-default",
  type: "groundCover",
  name: "Dirt",
  iconKey: "groundCover",
  size: [1, 1],
  color: "#8B4513",
  description: "A loose mixture of earth, organic matter, and minerals.",
};

// Helper: create a Dirt element instance for a specific cell
function makeDirtForCell(row, col) {
  return { ...dirtElement, id: `dirt-${row}-${col}` };
}

// Helper: normalize elements to current gridSize
// - ensures each in-bounds cell has an entry
// - ensures each entry has a groundCover as first item (Dirt if missing)
// - removes entries that are out of bounds
function normalizeElementsToGrid(elements, rows, cols) {
  const inBounds = (r, c) => r >= 0 && r < rows && c >= 0 && c < cols;

  // Build a map for quick lookup
  const positionKey = (r, c) => `${r},${c}`;
  const map = new Map();
  for (const entry of elements || []) {
    const [r, c] = entry.position || [];
    if (!Number.isInteger(r) || !Number.isInteger(c)) continue;
    if (!inBounds(r, c)) continue; // drop out-of-bounds
    const items = Array.isArray(entry.items) ? [...entry.items] : [];

    // Ensure exactly one ground cover at index 0
    const existingGroundIndex = items.findIndex((it) => it && it.type === "groundCover");
    if (existingGroundIndex === -1) {
      items.unshift(makeDirtForCell(r, c));
    } else if (existingGroundIndex !== 0) {
      const [ground] = items.splice(existingGroundIndex, 1);
      items.unshift(ground);
    }

    map.set(positionKey(r, c), { position: [r, c], items });
  }

  // Ensure every cell exists
  const normalized = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const key = positionKey(r, c);
      if (map.has(key)) {
        const entry = map.get(key);
        // also guarantee first item is a ground cover (defensive)
        const items = Array.isArray(entry.items) ? entry.items : [];
        if (!(items[0] && items[0].type === "groundCover")) {
          const nonGround = items.filter((it) => it && it.type !== "groundCover");
          normalized.push({ position: [r, c], items: [makeDirtForCell(r, c), ...nonGround] });
        } else {
          normalized.push(entry);
        }
      } else {
        normalized.push({ position: [r, c], items: [makeDirtForCell(r, c)] });
      }
    }
  }

  return normalized;
}

const initialState = {
  gridSize: { rows: 5, cols: 5 },
  elements: [], // will be initialized via initializeGrid
};

const gridSlice = createSlice({
  name: "grid",
  initialState,
  reducers: {
    // Fill grid with Dirt at start (call initializeGrid on app mount)
    initializeGrid: (state, action) => {
      const { rows, cols } = action.payload || state.gridSize;
      state.gridSize = { rows, cols };
      state.elements = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          state.elements.push({
            position: [r, c],
            items: [makeDirtForCell(r, c)],
          });
        }
      }
    },

    // placeElement: add non-ground items OR replace ground if element.type === 'groundCover'
    placeElement: (state, action) => {
      const { position, element } = action.payload;
      const existing = state.elements.find((el) => el.position[0] === position[0] && el.position[1] === position[1]);

      if (existing) {
        if (element.type === "groundCover") {
          // replace groundCover and keep other items
          existing.items = [element, ...existing.items.filter((it) => it.type !== "groundCover")];
        } else {
          // add non-ground as stacked item
          existing.items.push(element);
        }
      } else {
        state.elements.push({ position, items: [element] });
      }
    },

    // updateGroundCover: used by shovel or ground tool (explicit ground replacement)
    updateGroundCover: (state, action) => {
      const { position, ground } = action.payload;
      const existing = state.elements.find((el) => el.position[0] === position[0] && el.position[1] === position[1]);

      if (existing) {
        existing.items = [ground, ...existing.items.filter((it) => it.type !== "groundCover")];
      } else {
        state.elements.push({ position, items: [ground] });
      }
    },

    // grid size update: keep existing items but ensure full coverage with Dirt
    setGridSize: (state, action) => {
      const { rows, cols } = action.payload;
      state.gridSize = { rows, cols };
      state.elements = normalizeElementsToGrid(state.elements, rows, cols);
    },

    // replace all elements (used by JSON editor) and ensure Dirt everywhere
    setElements: (state, action) => {
      const { rows, cols } = state.gridSize;
      state.elements = normalizeElementsToGrid(action.payload || [], rows, cols);
    },

    // apply both size and elements together from backend JSON
    applyBackend: (state, action) => {
      const payload = action.payload || {};
      const rows = payload.gridSize?.rows ?? state.gridSize.rows;
      const cols = payload.gridSize?.cols ?? state.gridSize.cols;
      state.gridSize = { rows, cols };
      state.elements = normalizeElementsToGrid(payload.elements || [], rows, cols);
    },

    // ensure coverage with Dirt without altering non-ground items
    ensureDirtCoverage: (state) => {
      const { rows, cols } = state.gridSize;
      state.elements = normalizeElementsToGrid(state.elements || [], rows, cols);
    },
    // Remove any non-ground items that occupy the clicked cell, and reset that cell's ground to Dirt
    shovelAtCell: (state, action) => {
      const { position } = action.payload || {};
      if (!position) return;
      const [r, c] = position;

      // Remove non-ground items whose footprint covers (r,c)
      for (const entry of state.elements) {
        const [pr, pc] = entry.position || [];
        const filtered = [];
        for (const it of entry.items || []) {
          const [h = 1, w = 1] = it.size || [1, 1];
          const occupies = r >= pr && r < pr + h && c >= pc && c < pc + w;
          if (it.type === "groundCover" || !occupies) {
            filtered.push(it);
          }
        }
        entry.items = filtered;
      }

      // Reset ground at (r,c) to Dirt (preserve any remaining non-ground at that exact cell entry)
      const existing = state.elements.find((el) => el.position[0] === r && el.position[1] === c);
      const dirt = makeDirtForCell(r, c);
      if (existing) {
        const nonGround = (existing.items || []).filter((it) => it.type !== "groundCover");
        existing.items = [dirt, ...nonGround];
      } else {
        state.elements.push({ position: [r, c], items: [dirt] });
      }
    },
    // reset a cell to only Dirt (remove all non-ground items too)
    resetCellToDirt: (state, action) => {
      const { position } = action.payload || {};
      if (!position) return;
      const [r, c] = position;
      const existing = state.elements.find((el) => el.position[0] === r && el.position[1] === c);
      const dirt = makeDirtForCell(r, c);
      if (existing) {
        existing.items = [dirt];
      } else {
        state.elements.push({ position: [r, c], items: [dirt] });
      }
    },
  },
});

export const { initializeGrid, placeElement, updateGroundCover, setGridSize, setElements, applyBackend, ensureDirtCoverage, shovelAtCell, resetCellToDirt } = gridSlice.actions;

export default gridSlice.reducer;
