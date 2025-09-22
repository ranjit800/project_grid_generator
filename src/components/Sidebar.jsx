// import { useDispatch, useSelector } from "react-redux";
// import { setSelectedElement } from "../redux/uiSlice";



// import { TreePine, Trees, Flower2, Leaf, Sofa, Camera, Apple } from "lucide-react";

// // Map of icons (safe to use only in UI, not in Redux state)
// const iconMap = {
//   tree: <TreePine size={30} />,
//   oak: <Trees size={30} />,
//   plant: <Flower2 size={30} />,
//   fruit: <Apple size={30} />,
//   groundCover: <Leaf size={30} />,
//   furniture: <Sofa size={30} />,
//   camera: <Camera size={30} />,
// };

// // Library (use iconKey instead of actual JSX element)
// const library = {
//   Trees: [
//     { id: "t1", type: "tree", name: "Maple Tree", iconKey: "tree", size: [1, 1] },
//     { id: "t2", type: "tree", name: "Oak Tree", iconKey: "oak", size: [1, 1] },
//   ],
//   Plants: [
//     { id: "p1", type: "plant", name: "Blackberry Bush", iconKey: "plant", size: [1, 1] },
//     { id: "p2", type: "plant", name: "California buckwheat", iconKey: "plant", size: [2, 2] },
//     { id: "p3", type: "plant", name: "California tree poppy", iconKey: "plant", size: [1, 1] },
//   ],
//   Fruits: [
//     { id: "f1", type: "fruit", name: "Apple", iconKey: "fruit", size: [1, 1] },
//   ],
//   "Ground Covers": [
//     { id: "g1", type: "groundCover", name: "Grass 2 low res", iconKey: "groundCover", size: [1, 1], color: "#6EE7B7" },
//     { id: "g2", type: "groundCover", name: "Grey Pebble Gravel", iconKey: "groundCover", size: [1, 1], color: "#9CA3AF" },
//     { id: "g3", type: "groundCover", name: "Lush Green Grass", iconKey: "groundCover", size: [1, 1], color: "#34D399" },
//   ],
//   Furniture: [
//     { id: "fu1", type: "furniture", name: "Adirondack chair", iconKey: "furniture", size: [1, 1] },
//     { id: "fu2", type: "furniture", name: "Fence East", iconKey: "furniture", size: [2, 1] },
//   ],
//   Camera: [
//     { id: "c1", type: "camera", name: "360 Camera", iconKey: "camera", size: [1, 1] },
//   ],
// };

// function Sidebar() {
//   const dispatch = useDispatch();
//   const selectedElement = useSelector((state) => state.ui.selectedElement);

//   return (
//     <div className="w-64 bg-white rounded-lg shadow p-4 overflow-y-auto">
//       <h2 className="font-semibold text-gray-700 mb-4 text-sm">Library</h2>

//       {Object.keys(library).map((category) => (
//         <div key={category} className="mb-6">
//           <div className="flex justify-between items-center mb-2">
//             <h3 className="font-semibold text-gray-600 text-sm">{category}</h3>
//             <span className="text-gray-400 text-sm">→</span>
//           </div>

//           {/* Items */}
//           <div className="flex gap-2 overflow-x-auto scrollbar-hide">
//             {library[category].map((item) => (
//               <button
//                 key={item.id}
//                 onClick={() => {
//                   console.log("Selected:", item);
//                   dispatch(setSelectedElement(item));
//                 }}
//                 className={`flex-shrink-0 w-20 h-28 flex flex-col items-center justify-center border rounded-lg bg-white p-2
//                   ${selectedElement?.id === item.id ? "border-green-600 ring-1 ring-green-400" : "hover:bg-green-50"}`}
//               >
//                 {iconMap[item.iconKey]}
//                 <span className="mt-1 text-xs text-gray-700 text-center leading-tight break-words">
//                   {item.name}
//                 </span>
//               </button>
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Sidebar;


import { useDispatch, useSelector } from "react-redux";
import { setSelectedElement } from "../redux/uiSlice";
import { iconMap } from "../data/iconMap";   // ✅ centralized iconMap
import { library } from "../data/library";   // ✅ centralized library

function Sidebar() {
  const dispatch = useDispatch();
  const selectedElement = useSelector((state) => state.ui.selectedElement);

  return (
    <div className="w-64 bg-white rounded-lg shadow p-4 overflow-y-auto scrollbar-hide">
      <h2 className="font-semibold text-gray-700 mb-4 text-sm">Library</h2>

      {Object.keys(library).map((category) => (
        <div key={category} className="mb-6">
          {/* Category Title */}
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-gray-600 text-sm">{category}</h3>
            <span className="text-gray-400 text-sm">→</span>
          </div>

          {/* Items */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {library[category].map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  console.log("Selected:", item);
                  dispatch(setSelectedElement(item));
                }}
                className={`flex-shrink-0 w-20 h-28 flex flex-col items-center justify-center border rounded-lg bg-white p-2
                  ${
                    selectedElement?.id === item.id
                      ? "border-green-600 ring-1 ring-green-400"
                      : "hover:bg-green-50"
                  }`}
              >
                {/* ✅ Dynamic icon render */}
                {(() => {
                  const Icon = iconMap[item.iconKey]; // get component from map
                  return Icon ? <Icon size={22} /> : null;
                })()}

                <span className="mt-1 text-xs text-gray-700 text-center leading-tight break-words">
                  {item.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Sidebar;
