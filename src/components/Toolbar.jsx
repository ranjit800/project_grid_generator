// import { useDispatch, useSelector } from "react-redux";
// import { setActiveTool, setZoom } from "../redux/uiSlice";
// import { ZoomIn, ZoomOut, Hammer, Droplet, MousePointer, Undo } from "lucide-react";

// function Toolbar() {
//   const dispatch = useDispatch();
//   const activeTool = useSelector((state) => state.ui.activeTool);
//   const zoom = useSelector((state) => state.ui.zoom);

//   const handleZoomIn = () => dispatch(setZoom(zoom + 0.2));
//   const handleZoomOut = () => dispatch(setZoom(Math.max(0.4, zoom - 0.2)));

//   const tools = [
//     { id: "zoom-in", icon: <ZoomIn size={18} />, action: handleZoomIn },
//     { id: "zoom-out", icon: <ZoomOut size={18} />, action: handleZoomOut },
//     { id: "ground", icon: <Hammer size={18} /> },
//     { id: "dropper", icon: <Droplet size={18} /> },
//     { id: "mouse", icon: <MousePointer size={18} /> },
//     { id: "undo", icon: <Undo size={18} /> },
//     { id: "json", label: "JSON" },
//   ];

//   return (
//     <div className="flex items-center space-x-4 px-3 py-1.5 border rounded-lg bg-white shadow-sm w-fit">
//       {tools.map((tool) => (
//         <button
//           key={tool.id}
//           onClick={() => {
//             if (tool.action) {
//               tool.action();
//             } else {
//               dispatch(setActiveTool(tool.id));
//             }
//           }}
//           className={`relative text-gray-600 hover:text-black text-sm flex items-center justify-center ${
//             activeTool === tool.id ? "text-black font-medium" : ""
//           }`}
//         >
//           {tool.icon ? tool.icon : <span className="text-xs font-semibold">JSON</span>}
//           {activeTool === tool.id && (
//             <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-green-600 rounded-full"></span>
//           )}
//         </button>
//       ))}
//     </div>
//   );
// }

// export default Toolbar;

// import React, { useState, useRef, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { toggleTool, setZoom } from "../redux/uiSlice";
// import {
//   ZoomIn,
//   ZoomOut,
//   Hammer,
//   Droplet,
//   MousePointer,
//   Undo,
//   GripHorizontal,
// } from "lucide-react";

// export default function Toolbar({ playgroundRef }) {
//   const dispatch = useDispatch();
//   const activeTool = useSelector((s) => s.ui.activeTool);
//   const zoom = useSelector((s) => s.ui.zoom);

//   const [pos, setPos] = useState({ x: 300, y: 10 });
//   const [dragging, setDragging] = useState(false);

//   const handleZoomIn = () => dispatch(setZoom(Number((zoom + 0.2).toFixed(2))));
//   const handleZoomOut = () =>
//     dispatch(setZoom(Math.max(0.4, Number((zoom - 0.2).toFixed(2)))));

//   const tools = [
//     { id: "zoom-in", icon: <ZoomIn size={18} />, action: handleZoomIn, title: "Zoom In" },
//     { id: "zoom-out", icon: <ZoomOut size={18} />, action: handleZoomOut, title: "Zoom Out" },
//     { id: "ground", icon: <Hammer size={18} />, title: "Ground Tool" },
//     { id: "dropper", icon: <Droplet size={18} />, title: "Color Dropper" },
//     { id: "mouse", icon: <MousePointer size={18} />, title: "Select / Mouse Tool" },
//     { id: "undo", icon: <Undo size={18} />, title: "Undo Last Action" },
//     { id: "json", label: "JSON", title: "Export JSON" },
//   ];

//   // Dragging logic with boundary constraints
//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       if (!dragging) return;
//       if (!playgroundRef?.current) return;

//       const pgRect = playgroundRef.current.getBoundingClientRect();
//       const toolbarWidth = 220; // approx width
//       const toolbarHeight = 40; // approx height

//       setPos((prev) => {
//         let newX = prev.x + e.movementX;
//         let newY = prev.y + e.movementY;

//         // clamp inside playground bounds
//         if (newX < 0) newX = 0;
//         if (newY < 0) newY = 0;
//         if (newX > pgRect.width - toolbarWidth)
//           newX = pgRect.width - toolbarWidth;
//         if (newY > pgRect.height - toolbarHeight)
//           newY = pgRect.height - toolbarHeight;

//         return { x: newX, y: newY };
//       });
//     };

//     const handleMouseUp = () => setDragging(false);

//     window.addEventListener("mousemove", handleMouseMove);
//     window.addEventListener("mouseup", handleMouseUp);
//     return () => {
//       window.removeEventListener("mousemove", handleMouseMove);
//       window.removeEventListener("mouseup", handleMouseUp);
//     };
//   }, [dragging, playgroundRef]);

//   return (
//     <div
//       className="absolute z-20 cursor-default"
//       style={{ left: pos.x, top: pos.y }}
//     >
//       <div className="flex items-center space-x-4 px-3 py-1.5 rounded-lg bg-white shadow-md border">
//         {/* Drag handle */}
//         <button
//           onMouseDown={() => setDragging(true)}
//           className="cursor-grab active:cursor-grabbing text-gray-500 hover:text-black"
//           title="Move Toolbar"
//         >
//           <GripHorizontal size={18} />
//         </button>

//         {tools.map((tool) => {
//           const isActive = activeTool === tool.id;
//           return (
//             <button
//               key={tool.id}
//               title={tool.title}
//               onClick={() =>
//                 tool.action ? tool.action() : dispatch(toggleTool(tool.id))
//               }
//               className={`relative text-gray-600 hover:text-black text-sm flex items-center justify-center px-2 py-1 rounded ${
//                 isActive ? "text-black font-medium" : ""
//               }`}
//             >
//               {tool.icon ? (
//                 tool.icon
//               ) : (
//                 <span className="text-xs font-semibold">JSON</span>
//               )}
//               {isActive && (
//                 <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-green-600 rounded-full"></span>
//               )}
//             </button>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// Toolbar.jsx
import { useDispatch, useSelector } from "react-redux";
import { setActiveTool, setZoom } from "../redux/uiSlice";
import { setGridSize } from "../redux/gridSlice";
import { MousePointer, Shovel, ZoomIn, ZoomOut, Undo, Redo, LocateFixed, Pipette } from "lucide-react";

function Toolbar({ playgroundRef, onToggleMiniMap, isMiniMapVisible }) {
  const dispatch = useDispatch();
  const { activeTool, zoom } = useSelector((s) => s.ui);
  const { gridSize } = useSelector((s) => s.grid);
  const rows = gridSize?.rows ?? 5;
  const cols = gridSize?.cols ?? 5;

  const handleZoom = (dir) => {
    const newZoom = dir === "in" ? zoom + 0.1 : zoom - 0.1;
    dispatch(setZoom(Math.max(0.5, Math.min(newZoom, 3))));
  };

  const tools = [
    { key: "mouse", icon: <MousePointer size={20} />, label: "Mouse" },
    { key: "shovel", icon: <Shovel size={20} />, label: "Shovel" },
    { key: "dropper", icon: <Pipette size={20} />, label: "Dropper" },
    { key: "json", icon: null, label: "JSON" },
  ];

  const clamp = (val, min, max) => Math.max(min, Math.min(val, max));

  const updateSize = (nextRows, nextCols) => {
    const r = clamp(parseInt(nextRows, 10) || 0, 1, 100);
    const c = clamp(parseInt(nextCols, 10) || 0, 1, 100);
    dispatch(setGridSize({ rows: r, cols: c }));
  };

  // Tooltip component for hover
  const ToolTip = ({ children, text }) => (
    <div className="relative group">
      {children}
      <span className="pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity absolute left-full top-1/2 -translate-y-1/2 ml-2 z-50 whitespace-nowrap bg-black text-white text-xs rounded px-2 py-1 shadow-lg">
        {text}
      </span>
    </div>
  );

  return (
    <div className="flex flex-col gap-4 items-center h-full">
      {/* Grid Size Controls */}
      <div className="flex flex-col items-center gap-2 w-full px-1">
        <div className="flex flex-col items-center gap-1 w-full">
          <span className="text-[10px] text-gray-600">Rows</span>
          <input type="number" min={1} max={100} value={rows} onChange={(e) => updateSize(e.target.value, cols)} className="w-12 text-center border rounded px-1 py-0.5 text-xs" />
        </div>
        <div className="flex flex-col items-center gap-1 w-full">
          <span className="text-[10px] text-gray-600">Cols</span>
          <input type="number" min={1} max={100} value={cols} onChange={(e) => updateSize(rows, e.target.value)} className="w-12 text-center border rounded px-1 py-0.5 text-xs" />
        </div>
      </div>
      {tools.map((tool) => (
        <ToolTip key={tool.key} text={tool.label}>
          <button
            onClick={() => dispatch(setActiveTool(tool.key))}
            className={`p-2 rounded-lg ${activeTool === tool.key ? "bg-green-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
            aria-label={tool.label}
            type="button"
          >
            {tool.icon ? tool.icon : <span className="text-[10px] font-semibold">JSON</span>}
          </button>
        </ToolTip>
      ))}

      {/* Zoom Controls */}
      <ToolTip text="Zoom In">
        <button onClick={() => handleZoom("in")} className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200" aria-label="Zoom In" type="button">
          <ZoomIn size={20} />
        </button>
      </ToolTip>
      <ToolTip text="Zoom Out">
        <button onClick={() => handleZoom("out")} className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200" aria-label="Zoom Out" type="button">
          <ZoomOut size={20} />
        </button>
      </ToolTip>

      {/* Optional undo/redo */}
      <ToolTip text="Undo">
        <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200" aria-label="Undo" type="button">
          <Undo size={20} />
        </button>
      </ToolTip>
      <ToolTip text="Redo">
        <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200" aria-label="Redo" type="button">
          <Redo size={20} />
        </button>
      </ToolTip>

      {/* Spacer pushes toggle to bottom */}
      <div className="flex-1" />

      {/* Mini Map Toggle at bottom of toolbar */}
      <ToolTip text={isMiniMapVisible ? "Hide Minimap" : "Show Minimap"}>
        <button
          onClick={() => onToggleMiniMap && onToggleMiniMap()}
          className={`p-2 mb-2 rounded-md ${isMiniMapVisible ? "bg-green-600 text-white hover:bg-green-700" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
          type="button"
        >
          <LocateFixed size={18} />
        </button>
      </ToolTip>
    </div>
  );
}

export default Toolbar;
