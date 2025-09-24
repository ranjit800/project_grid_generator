// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { iconMap } from "../data/iconMap";
// import { library } from "../data/library";
// import { setSelectedElement } from "../redux/uiSlice";

// function RightSidebar() {
//   const dispatch = useDispatch();
//   const selectedElement = useSelector((state) => state.ui.selectedElement);

//   const [collapsed, setCollapsed] = useState(false);
//   const [activeCategory, setActiveCategory] = useState(null);
//   const [activeTab, setActiveTab] = useState("title"); // "title" | "desc"

//   return (
//     <div
//       className={`transition-all duration-300 bg-white shadow-lg border-l h-full flex flex-col
//         ${collapsed ? "w-12" : "w-72"}`}
//     >
//       {/* Header */}
//       <div className="flex items-center justify-between px-3 py-2 border-b bg-gray-50">
//         {!collapsed && (
//           activeCategory ? (
//             <div className="flex items-center gap-2">
//               <h2 className="font-semibold text-gray-700 text-sm">{activeCategory}</h2>
//               <button
//                 onClick={() => setActiveCategory(null)}
//                 className="text-xs text-blue-600 underline"
//               >
//                 Back to Library
//               </button>
//             </div>
//           ) : (
//             <h2 className="font-semibold text-gray-700 text-sm">Catalog</h2>
//           )
//         )}
//         <button
//           onClick={() => setCollapsed(!collapsed)}
//           className="text-gray-600 hover:text-gray-800 ml-auto"
//         >
//           {collapsed ? "»" : "«"}
//         </button>
//       </div>

//       {/* Catalog */}
//       {!collapsed && (
//         <div className="flex-1 overflow-y-auto p-0.5 bg-gray-100">
//           <div className="bg-gray-200 rounded-lg p-2 h-full overflow-y-auto scrollbar-thin">
//             {activeCategory ? (
//               // 🔹 Show only one category (when arrow clicked)
//               <div>
//                 <h3 className="font-semibold text-gray-600 text-xs mb-2">{activeCategory}</h3>
//                 <div className="flex gap-2 flex-wrap">
//                   {library[activeCategory].map((item) => {
//                     const Icon = iconMap[item.iconKey];
//                     return (
//                       <button
//                         key={item.id}
//                         onClick={() => dispatch(setSelectedElement(item))}
//                         className={`flex-shrink-0 w-20 h-28 flex flex-col items-center justify-center border rounded-lg bg-white p-2
//                           ${
//                             selectedElement?.id === item.id
//                               ? "border-green-600 ring-1 ring-green-400"
//                               : "hover:bg-green-50"
//                           }`}
//                       >
//                         {Icon ? <Icon size={22} /> : null}
//                         <span className="mt-1 text-xs text-gray-700 text-center leading-tight break-words">
//                           {item.name}
//                         </span>
//                       </button>
//                     );
//                   })}
//                 </div>
//               </div>
//             ) : (
//               // 🔹 Show ALL categories + their elements (default view)
//               Object.keys(library).map((category) => (
//                 <div key={category} className="mb-4">
//                   <div className="flex justify-between items-center mb-2">
//                     <h3 className="font-semibold text-gray-600 text-xs">{category}</h3>
//                     <button
//                       onClick={() => setActiveCategory(category)}
//                       className="text-gray-500 hover:text-gray-700"
//                     >
//                       →
//                     </button>
//                   </div>
//                   <div className="flex gap-2 overflow-x-auto scrollbar-hide">
//                     {library[category].map((item) => {
//                       const Icon = iconMap[item.iconKey];
//                       return (
//                         <button
//                           key={item.id}
//                           onClick={() => dispatch(setSelectedElement(item))}
//                           className={`flex-shrink-0 w-20 h-28 flex flex-col items-center justify-center border rounded-lg bg-white p-2
//                             ${
//                               selectedElement?.id === item.id
//                                 ? "border-green-600 ring-1 ring-green-400"
//                                 : "hover:bg-green-50"
//                             }`}
//                         >
//                           {Icon ? <Icon size={22} /> : null}
//                           <span className="mt-1 text-xs text-gray-700 text-center leading-tight break-words">
//                             {item.name}
//                           </span>
//                         </button>
//                       );
//                     })}
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>
//       )}

//       {/* Details Panel */}
//       {!collapsed && selectedElement && (
//         <div className="border-t p-3 bg-white">
//           {/* Tabs */}
//           <div className="flex gap-4 border-b mb-2">
//             <button
//               className={`pb-1 text-sm ${
//                 activeTab === "title"
//                   ? "border-b-2 border-green-600 text-green-600"
//                   : "text-gray-500"
//               }`}
//               onClick={() => setActiveTab("title")}
//             >
//               Title
//             </button>
//             <button
//               className={`pb-1 text-sm ${
//                 activeTab === "desc"
//                   ? "border-b-2 border-green-600 text-green-600"
//                   : "text-gray-500"
//               }`}
//               onClick={() => setActiveTab("desc")}
//             >
//               Description
//             </button>
//           </div>

//           {/* Content */}
//           {activeTab === "title" && (
//             <div>
//               <p className="font-semibold text-gray-700">{selectedElement.name}</p>
//               <p className="text-xs text-gray-500">{selectedElement.type}</p>
//             </div>
//           )}
//           {activeTab === "desc" && (
//             <div>
//               <p className="text-sm text-gray-600">
//                 {selectedElement.description || "No description available."}
//               </p>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default RightSidebar;

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { iconMap } from "../data/iconMap";
import { library } from "../data/library";
import { setSelectedElement, setActiveTool } from "../redux/uiSlice";

function RightSidebar() {
  const dispatch = useDispatch();
  const selectedElement = useSelector((state) => state.ui.selectedElement);

  const [collapsed, setCollapsed] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeTab, setActiveTab] = useState("title"); // "title" | "desc"
  const [previewItem, setPreviewItem] = useState(null); // image preview state

  const renderItemCard = (item) => {
    const Icon = iconMap[item.iconKey];
    return (
      <div key={item.id} className="relative">
        {/* Info button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setPreviewItem(item);
          }}
          title="Info"
          className="absolute -top-1 -right-1 z-10 w-5 h-5 rounded-full bg-white border text-gray-700 text-xs flex items-center justify-center hover:bg-gray-50"
          aria-label={`Show info for ${item.name}`}
        >
          i
        </button>

        <button
          onClick={() => {
            dispatch(setActiveTool(null)); // ✅ clear tool before selecting
            dispatch(setSelectedElement(item));
          }}
          className={`flex-shrink-0 w-20 h-28 flex flex-col items-center justify-center border rounded-lg bg-white p-2
            ${selectedElement?.id === item.id ? "border-green-600 ring-1 ring-green-400" : "hover:bg-green-50"}`}
        >
          {Icon ? <Icon size={22} /> : null}
          <span className="mt-1 text-xs text-gray-700 text-center leading-tight break-words">{item.name}</span>
        </button>
      </div>
    );
  };

  const renderCategory = (category) => (
    <div key={category} className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold text-gray-600 text-xs">{category}</h3>
        <button onClick={() => setActiveCategory(category)} className="text-gray-500 hover:text-gray-700">
          →
        </button>
      </div>
      <div className="flex gap-2 overflow-x-auto scrollbar-hide">{library[category].map((item) => renderItemCard(item))}</div>
    </div>
  );

  return (
    <div
      className={`transition-all duration-300 bg-white shadow-lg border-l h-full flex flex-col 
        ${collapsed ? "w-12" : "w-72"}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b bg-gray-50">
        {!collapsed &&
          (activeCategory ? (
            <div className="flex items-center gap-2">
              <h2 className="font-semibold text-gray-700 text-sm">{activeCategory}</h2>
              <button onClick={() => setActiveCategory(null)} className="text-xs text-blue-600 underline">
                Back to Library
              </button>
            </div>
          ) : (
            <h2 className="font-semibold text-gray-700 text-sm">Catalog</h2>
          ))}
        <button onClick={() => setCollapsed(!collapsed)} className="text-gray-600 hover:text-gray-800 ml-auto">
          {collapsed ? "»" : "«"}
        </button>
      </div>

      {/* Catalog */}
      {!collapsed && (
        <div className="flex-1 overflow-y-auto p-0.5 bg-gray-100">
          <div className="bg-gray-200 rounded-lg p-2 h-full overflow-y-auto scrollbar-thin">
            {activeCategory ? (
              <div>
                <h3 className="font-semibold text-gray-600 text-xs mb-2">{activeCategory}</h3>
                <div className="flex gap-2 flex-wrap">{library[activeCategory].map((item) => renderItemCard(item))}</div>
              </div>
            ) : (
              Object.keys(library).map((category) => renderCategory(category))
            )}
          </div>
        </div>
      )}

      {/* Details Panel */}
      {!collapsed && selectedElement && (
        <div className="border-t p-3 bg-white">
          {/* Tabs */}
          <div className="flex gap-4 border-b mb-2">
            <button className={`pb-1 text-sm ${activeTab === "title" ? "border-b-2 border-green-600 text-green-600" : "text-gray-500"}`} onClick={() => setActiveTab("title")}>
              Title
            </button>
            <button className={`pb-1 text-sm ${activeTab === "desc" ? "border-b-2 border-green-600 text-green-600" : "text-gray-500"}`} onClick={() => setActiveTab("desc")}>
              Description
            </button>
          </div>

          {/* Content */}
          {activeTab === "title" && (
            <div>
              <p className="font-semibold text-gray-700">{selectedElement.name}</p>
              <p className="text-xs text-gray-500">{selectedElement.type}</p>
            </div>
          )}
          {activeTab === "desc" && (
            <div>
              <p className="text-sm text-gray-600">{selectedElement.description || "No description available."}</p>
            </div>
          )}
        </div>
      )}

      {/* Image Preview Overlay (inside sidebar) */}
      {!collapsed && previewItem && (
        <div className="absolute inset-y-0 right-0 w-72 bg-white border-l shadow-lg z-50 flex flex-col">
          <div className="flex items-center justify-between px-3 py-2 border-b bg-gray-50">
            <h3 className="font-semibold text-gray-700 text-sm truncate">{previewItem.name}</h3>
            <button
              onClick={() => setPreviewItem(null)}
              className="w-6 h-6 rounded-full bg-white border text-gray-700 flex items-center justify-center hover:bg-gray-50"
              aria-label="Close preview"
              title="Close"
            >
              ×
            </button>
          </div>
          <div className="p-2 overflow-auto flex-1">
            {previewItem.imageUrl ? (
              <img src={previewItem.imageUrl} alt={previewItem.name} className="w-full h-auto rounded border bg-gray-50" />
            ) : previewItem.photos && previewItem.photos.length > 0 ? (
              <img src={previewItem.photos[0]} alt={previewItem.name} className="w-full h-auto rounded border bg-gray-50" />
            ) : (
              <div className="w-full h-48 rounded border bg-gray-50 flex items-center justify-center text-xs text-gray-500">No image available</div>
            )}

            {/* Optional metadata */}
            {previewItem.assetLocation && (
              <div className="mt-2">
                <p className="text-[11px] text-gray-500 break-all">Asset: {previewItem.assetLocation}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default RightSidebar;
