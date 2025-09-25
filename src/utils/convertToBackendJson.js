// utils/convertToBackendJson.js
import { library, backendGroundCoversById, backendFurnitureById, catalogPlantsDemo } from "../data/library.js";

export function convertToBackendJson(gridSize, elements) {
  const { rows, cols } = gridSize;

  // Build quick lookups for catalog payloads
  const plantsById = new Map(catalogPlantsDemo.map((p) => [p.id, p]));

  // placement_locations
  const placement_locations = {};

  // Track used catalog IDs by type
  const used = {
    plant: new Set(),
    ground_cover: new Set(),
    furniture: new Set(),
    tree: new Set(),
  };

  // For tree items we don't have a backend catalog; synthesize minimal entries by observed placements
  const treeCatalogById = new Map();

  const toBackendType = (t) => {
    if (t === "groundCover") return "ground_cover";
    if (t === "tree") return "tree";
    return t; // plant, furniture already ok
  };

  elements.forEach((entry) => {
    const [r, c] = entry.position;
    const key = `${r}, 0, ${c}`;
    const items = Array.isArray(entry.items) ? entry.items : [];
    placement_locations[key] = items.map((item) => {
      const backendType = toBackendType(item.type);

      // Resolve backend ID: prefer explicit backendId if present; else try name-based fallback for ground/furniture
      let backendId = item.backendId;
      if (!backendId && backendType === "ground_cover") {
        // match by name
        const match = Object.values(backendGroundCoversById).find((gc) => gc.name === item.name);
        backendId = match ? match.id : undefined;
      }
      if (!backendId && backendType === "furniture") {
        const match = Object.values(backendFurnitureById).find((fu) => fu.name === item.name);
        backendId = match ? match.id : undefined;
      }
      if (!backendId && backendType === "plant" && typeof item.id === "number") {
        // In some flows id is already backend id
        backendId = item.id;
      }

      // Fallback to a stable but local-only id if missing (not ideal for backend)
      const finalId = backendId != null ? backendId : typeof item.id === "number" ? item.id : Date.now();

      // Track used items to populate catalog_items
      if (backendType in used) used[backendType].add(finalId);

      // Capture minimal tree catalog from placed item data
      if (backendType === "tree" && !treeCatalogById.has(finalId)) {
        const width = Array.isArray(item.size) ? item.size[0] : 1;
        const length = Array.isArray(item.size) ? item.size[1] : 1;
        treeCatalogById.set(finalId, {
          id: finalId,
          name: item.name || "Tree",
          dimensions: { width, length, height: 1 },
          asset_location: null,
        });
      }

      return {
        type: backendType,
        id: finalId,
      };
    });
  });

  // Build catalog_items only with used entries (plants only per backend expectation)
  const catalog_items = {
    plants: Array.from(used.plant)
      .map((id) => plantsById.get(id))
      .filter(Boolean),
    trees: Array.from(used.tree)
      .map((id) => treeCatalogById.get(id))
      .filter(Boolean),
    ground_covers: [],
    furniture: [],
  };

  return {
    property: {
      owner: 1,
      name: "My Garden",
      yard_length: rows,
      yard_width: cols,
      placement_locations,
    },
    catalog_items,
  };
}
