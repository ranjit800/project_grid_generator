// utils/convertToBackendJson.js
export function convertToBackendJson(gridSize, elements) {
  const { rows, cols } = gridSize;

  // placement_locations map banao
  const placement_locations = {};
  elements.forEach(entry => {
    const [r, c] = entry.position;
    placement_locations[`${r}, 0, ${c}`] = entry.items.map(item => ({
      type: item.type,
      id: item.id || Date.now()
    }));
  });

  return {
    property: {
      name: "My Garden",
      unit: "ft",
      owner: 1,
      yard_width: cols,
      yard_length: rows,
      placement_locations,
      unit_scale_m_per_tile: 0.3048
    },
    catalog_items: {
      plants: [],
      trees: [],
      ground_covers: [],
      furniture: []
    }
  };
}
