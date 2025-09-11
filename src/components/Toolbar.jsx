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


import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTool, setZoom } from "../redux/uiSlice";
import {
  ZoomIn,
  ZoomOut,
  Hammer,
  Droplet,
  MousePointer,
  Undo,
  GripHorizontal,
} from "lucide-react";

export default function Toolbar({ playgroundRef }) {
  const dispatch = useDispatch();
  const activeTool = useSelector((s) => s.ui.activeTool);
  const zoom = useSelector((s) => s.ui.zoom);

  const [pos, setPos] = useState({ x: 300, y: 10 });
  const [dragging, setDragging] = useState(false);

  const handleZoomIn = () => dispatch(setZoom(Number((zoom + 0.2).toFixed(2))));
  const handleZoomOut = () =>
    dispatch(setZoom(Math.max(0.4, Number((zoom - 0.2).toFixed(2)))));

  const tools = [
    { id: "zoom-in", icon: <ZoomIn size={18} />, action: handleZoomIn },
    { id: "zoom-out", icon: <ZoomOut size={18} />, action: handleZoomOut },
    { id: "ground", icon: <Hammer size={18} /> },
    { id: "dropper", icon: <Droplet size={18} /> },
    { id: "mouse", icon: <MousePointer size={18} /> },
    { id: "undo", icon: <Undo size={18} /> },
    { id: "json", label: "JSON" },
  ];

  // Dragging logic with boundary constraints
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!dragging) return;
      if (!playgroundRef?.current) return;

      const pgRect = playgroundRef.current.getBoundingClientRect();
      const toolbarWidth = 220; // approx width
      const toolbarHeight = 40; // approx height

      setPos((prev) => {
        let newX = prev.x + e.movementX;
        let newY = prev.y + e.movementY;

        // clamp inside playground bounds
        if (newX < 0) newX = 0;
        if (newY < 0) newY = 0;
        if (newX > pgRect.width - toolbarWidth)
          newX = pgRect.width - toolbarWidth;
        if (newY > pgRect.height - toolbarHeight)
          newY = pgRect.height - toolbarHeight;

        return { x: newX, y: newY };
      });
    };

    const handleMouseUp = () => setDragging(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging, playgroundRef]);

  return (
    <div
      className="absolute z-20 cursor-default"
      style={{ left: pos.x, top: pos.y }}
    >
      <div className="flex items-center space-x-4 px-3 py-1.5 rounded-lg bg-white shadow-md border">
        {/* Drag handle */}
        <button
          onMouseDown={() => setDragging(true)}
          className="cursor-grab active:cursor-grabbing text-gray-500 hover:text-black"
        >
          <GripHorizontal size={18} />
        </button>

        {tools.map((tool) => {
          const isActive = activeTool === tool.id;
          return (
            <button
              key={tool.id}
              onClick={() =>
                tool.action ? tool.action() : dispatch(toggleTool(tool.id))
              }
              className={`relative text-gray-600 hover:text-black text-sm flex items-center justify-center px-2 py-1 rounded ${
                isActive ? "text-black font-medium" : ""
              }`}
            >
              {tool.icon ? (
                tool.icon
              ) : (
                <span className="text-xs font-semibold">JSON</span>
              )}
              {isActive && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-green-600 rounded-full"></span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
