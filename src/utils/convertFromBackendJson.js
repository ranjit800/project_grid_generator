// utils/convertFromBackendJson.js
export function convertFromBackendJson(backendJson) {
  const property = backendJson.property || {};
  const placement = property.placement_locations || {};

  // grid size
  const rows = property.yard_length || 5;
  const cols = property.yard_width || 5;

  // Bring in catalogs to enrich items
  const catalog = backendJson.catalog_items || {};
  const plantsCatalog = Array.isArray(catalog.plants) ? catalog.plants : [];
  const groundCatalog = Array.isArray(catalog.ground_covers) ? catalog.ground_covers : [];
  const furnitureCatalog = Array.isArray(catalog.furniture) ? catalog.furniture : [];

  const plantById = new Map(plantsCatalog.map((p) => [p.id, p]));
  const groundById = new Map(groundCatalog.map((g) => [g.id, g]));
  const furnitureById = new Map(furnitureCatalog.map((f) => [f.id, f]));

  const normalizeType = (t) => {
    if (t === "ground_cover") return "groundCover";
    return t; // plant, furniture, tree
  };

  // elements array
  const elements = Object.entries(placement).map(([key, items]) => {
    const [r, , c] = key.split(",").map((s) => Number(s.trim()));
    return {
      position: [r, c],
      items: items.map((it) => {
        const uiType = normalizeType(it.type);
        let name = uiType;
        let size = [1, 1];
        if (uiType === "plant") {
          const p = plantById.get(it.id);
          name = p?.name || name;
          const width = Math.max(1, Math.round(p?.width || 1));
          const length = Math.max(1, Math.round(p?.length || 1));
          size = [width, length];
        } else if (uiType === "groundCover") {
          const g = groundById.get(it.id);
          name = g?.name || name;
        } else if (uiType === "furniture") {
          const f = furnitureById.get(it.id);
          name = f?.name || name;
          const dims = f?.dimensions;
          if (dims && typeof dims.width === "number" && typeof dims.length === "number") {
            const width = Math.max(1, Math.round(dims.width));
            const length = Math.max(1, Math.round(dims.length));
            size = [width, length];
          }
        }

        return {
          id: it.id,
          backendId: it.id,
          type: uiType,
          name,
          size,
          iconKey: uiType,
        };
      }),
    };
  });

  return {
    gridSize: { rows, cols },
    elements,
  };
}
