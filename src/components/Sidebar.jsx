import { TreePine, Trees, Flower2, Leaf, Sofa, Camera, Apple, Grape, Banana } from "lucide-react";
const library = {
  Trees: [
    { name: "Maple Tree", icon: <TreePine size={30} /> },
    { name: "Oak Tree", icon: <Trees size={30} /> },
  ],
  Plants: [
    { name: "Blackberry Bush", icon: <Flower2 size={30} /> },
    { name: "California buckwheat", icon: <Flower2 size={30} /> },
    { name: "California tree poppy", icon: <Flower2 size={30} /> },
    { name: "Another Big Plant Name", icon: <Flower2 size={30} /> }, // extra for testing overflow
  ],
    Fruits: [
    { name: "Apple", icon: <Apple size={22} /> },
    { name: "Banana", icon: <Banana size={22} /> },
    { name: "Grapes Cluster", icon: <Grape size={22} /> }, // 4 items for horizontal scroll test
  ],
  "Ground Covers": [
    { name: "Grass 2 low res", icon: <Leaf size={30} /> },
    { name: "Grey Pebble Gravel", icon: <Leaf size={30} /> },
    { name: "Lush Green Grass", icon: <Leaf size={30} /> },
  ],
  Furniture: [
    { name: "Adirondack chair", icon: <Sofa size={30} /> },
    { name: "Fence East", icon: <Sofa size={30} /> },
    { name: "Fence Horizontal", icon: <Sofa size={30} /> },
  ],
  Camera: [{ name: "360 Camera", icon: <Camera size={30} /> }],
};

function Sidebar() {
  return (
    <div className="w-64 bg-white rounded-lg shadow p-4 overflow-y-auto">
      <h2 className="font-semibold text-gray-700 mb-4 text-sm">Library</h2>

      {Object.keys(library).map((category) => {
        const items = library[category];

        return (
          <div key={category} className="mb-6">
            {/* Category Title */}
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-gray-600 text-sm">{category}</h3>
              <span className="text-gray-400 text-sm">→</span>
            </div>

            {/* Category Items - Scrollable Row */}
            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
              {items.map((item) => (
                <button
                  key={item.name}
                  className="flex-shrink-0 w-20 flex flex-col items-center justify-center border rounded-lg bg-white hover:bg-green-50 p-2 h-28"
                  onClick={() => console.log(`Selected: ${item.name}`)}
                >
                  {item.icon}
                  <span className="mt-1 text-xs text-gray-700 text-center leading-tight break-words">
                    {item.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Sidebar;
