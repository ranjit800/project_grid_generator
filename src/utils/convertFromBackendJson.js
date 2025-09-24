// utils/convertFromBackendJson.js
export function convertFromBackendJson(backendJson) {
  const property = backendJson.property || {};
  const placement = property.placement_locations || {};

  // grid size
  const rows = property.yard_length || 5;
  const cols = property.yard_width || 5;

  // elements array
  const elements = Object.entries(placement).map(([key, items]) => {
    const [r, , c] = key.split(",").map(Number);
    return {
      position: [r, c],
      items: items.map((it) => ({
        id: it.id,
        type: it.type,
        name: it.name || it.type, // fallback
        size: [1, 1],
        iconKey: it.type
      }))
    };
  });

  return {
    gridSize: { rows, cols },
    elements
  };
}
