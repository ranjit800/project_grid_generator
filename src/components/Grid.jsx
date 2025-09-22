

import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { placeElement } from "../redux/gridSlice";
import { setPreviewCell, clearPreviewCell } from "../redux/uiSlice";
import { TreePine, Trees, Flower2, Leaf, Sofa, Camera, Apple } from "lucide-react";

// Map of icons (safe to use only in UI, not in Redux state)
const iconMap = {
  tree: <TreePine size={20} />,
  oak: <Trees size={20} />,
  plant: <Flower2 size={20} />,
  fruit: <Apple size={20} />,
  groundCover: <Leaf size={20} />,
  furniture: <Sofa size={20} />,
  camera: <Camera size={20} />,
};

export default function Grid() {
  const dispatch = useDispatch();
  const { gridSize, elements } = useSelector((s) => s.grid);
  const { selectedElement, activeTool, previewCell, zoom } = useSelector((s) => s.ui);

  const rows = gridSize?.rows || 5;
  const cols = gridSize?.cols || 5;
  const baseCellSize = 50;
  const cellSize = baseCellSize * (zoom || 1);

  // popup state: { open: bool, position: {x,y}, cell: [r,c], items: [...] }
  const [cellPopup, setCellPopup] = useState({ open: false, x: 0, y: 0, cell: null, items: [] });
  const gridRef = useRef(null);

  // helper: get cell entry (top-left) if exists
  const findCellEntry = (r, c) => elements.find((entry) => entry.position[0] === r && entry.position[1] === c);

  // helper: get all items occupying cell (may be from multi-cell placements)
  const getOccupyingItems = (r, c) => {
    const occupying = [];
    for (const entry of elements) {
      const [pr, pc] = entry.position;
      for (const item of entry.items) {
        const [h = 1, w = 1] = item.size || [1, 1];
        if (r >= pr && r < pr + h && c >= pc && c < pc + w) {
          occupying.push({ ...item, topLeft: [pr, pc] });
        }
      }
    }
    return occupying;
  };

  const isPreviewCell = (r, c) => {
    if (!previewCell || !selectedElement) return false;
    if (activeTool === "mouse" && selectedElement.type !== "groundCover") {
      const [pr, pc] = previewCell;
      const [h = 1, w = 1] = selectedElement.size || [1, 1];
      return r >= pr && r < pr + h && c >= pc && c < pc + w;
    }
    if (activeTool === "ground" && selectedElement.type === "groundCover") {
      const [pr, pc] = previewCell;
      return r === pr && c === pc;
    }
    return false;
  };

  const previewValid = () => {
    if (!previewCell || !selectedElement) return false;
    if (activeTool === "mouse" && selectedElement.type !== "groundCover") {
      const [pr, pc] = previewCell;
      const [h, w] = selectedElement.size || [1, 1];
      if (pr + h > rows || pc + w > cols) return false;
      // disallow overlapping existing items (optional)
      for (let rr = pr; rr < pr + h; rr++) {
        for (let cc = pc; cc < pc + w; cc++) {
          const occ = getOccupyingItems(rr, cc);
          if (occ.length > 0) return false;
        }
      }
      return true;
    }
    if (activeTool === "ground" && selectedElement.type === "groundCover") {
      const [pr, pc] = previewCell;
      return pr < rows && pc < cols;
    }
    return false;
  };

  // place element respecting activeTool
  const handlePlaceAt = (r, c) => {
    if (!selectedElement) {
      // If no tool active (activeTool === null) AND there is an entry here, show popup
      if (!activeTool) {
        const occupying = getOccupyingItems(r, c);
        if (occupying.length > 0) {
          openCellPopup(r, c);
        }
      }
      return;
    }

    // ground covers only with ground tool
    if (activeTool === "ground" && selectedElement.type === "groundCover") {
      dispatch(placeElement({ position: [r, c], element: { ...selectedElement, id: Date.now() } }));
      return;
    }

    // mouse tool for non-ground items
    if (activeTool === "mouse" && selectedElement.type !== "groundCover") {
      // optionally check bounds / overlap here (your existing validations)
      dispatch(placeElement({ position: [r, c], element: { ...selectedElement, id: Date.now() } }));
      return;
    }

    // if activeTool is null -> show popup if items exist
    if (!activeTool) {
      const occupying = getOccupyingItems(r, c);
      if (occupying.length > 0) openCellPopup(r, c);
    }
  };

  // open popup near cell (computes position relative to grid container)
  const openCellPopup = (r, c) => {
    if (!gridRef.current) return;
    const gridRect = gridRef.current.getBoundingClientRect();
    const left = gridRect.left + c * cellSize;
    const top = gridRect.top + r * cellSize;
    // place popup with small offset (so it doesn't overlap cursor)
    setCellPopup({
      open: true,
      x: left + 8,
      y: top + 8,
      cell: [r, c],
      items: getOccupyingItems(r, c),
    });
  };

  // close popup on outside click
  useEffect(() => {
    const onDocClick = (e) => {
      if (!cellPopup.open) return;
      // close if clicked outside popup element (we use id)
      const popupEl = document.getElementById("grid-cell-popup");
      if (popupEl && !popupEl.contains(e.target)) {
        setCellPopup({ open: false, x: 0, y: 0, cell: null, items: [] });
      }
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, [cellPopup.open]);

  // mouse enter handler: always set previewCell when a selectedElement exists (for both ground & mouse)
  const handleMouseEnter = (r, c) => {
    if (selectedElement) {
      dispatch(setPreviewCell([r, c]));
    }
  };

  const handleMouseLeave = () => {
    dispatch(clearPreviewCell());
  };

  // styling helpers for background priority
  const computeBackground = (r, c) => {
    const occupyingItems = getOccupyingItems(r, c);
    const groundCover = occupyingItems.find((it) => it.type === "groundCover");
    const nonGround = occupyingItems.filter((it) => it.type !== "groundCover");

    // preview top priority
    if (isPreviewCell(r, c)) {
      if (activeTool === "mouse" && selectedElement?.type !== "groundCover") {
        return previewValid() ? "rgba(16,185,129,0.35)" : "rgba(239,68,68,0.35)";
      }
      if (activeTool === "ground" && selectedElement?.type === "groundCover") {
        // use element color with opacity if available
        return selectedElement.color ? `${selectedElement.color}80` : "rgba(107,114,128,0.35)";
      }
    }

    // placed non-ground items → deep green
    if (nonGround.length > 0) return "#065F46";

    // ground cover color if present
    if (groundCover) return groundCover.color;

    return "transparent";
  };

  return (
    <div className="w-full h-full  relative p-2">
      {/* grid container ref used for popup positioning */}
      <div
        ref={gridRef}
        className="grid"
        style={{
          gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
          gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
        }}
      >
        {Array.from({ length: rows * cols }).map((_, idx) => {
          const r = Math.floor(idx / cols);
          const c = idx % cols;
          const occupyingItems = getOccupyingItems(r, c);
          const nonGroundItems = occupyingItems.filter((it) => it.type !== "groundCover");

          const background = computeBackground(r, c);

          return (
            <div
              key={idx}
              onClick={(e) => {
                // stop propagation so popup doc click logic works
                e.stopPropagation();
                handlePlaceAt(r, c);
              }}
              onMouseEnter={() => handleMouseEnter(r, c)}
              onMouseLeave={handleMouseLeave}
              className="border border-black flex items-center justify-center text-[10px] relative"
              style={{ backgroundColor: background, height: `${cellSize}px`, width: `${cellSize}px` }}
            >
              {/* bottom-left black dot */}
              <span className="absolute bottom-1 left-1 text-black text-[12px]">•</span>

              {/* show last placed non-ground item and +N badge */}
              {/* {nonGroundItems.length > 0 && (
                <>
                  <div className="flex items-center justify-center">
                    {iconMap[nonGroundItems[nonGroundItems.length - 1].type] || <span className="text-[9px] text-white">{nonGroundItems[nonGroundItems.length - 1].name}</span>}
                  </div>

                  {nonGroundItems.length > 1 && (
                    <span className="absolute bottom-1 right-1 text-[9px] bg-white text-black border px-1 rounded shadow-sm">+{nonGroundItems.length - 1}</span>
                  )}
                </>
              )} */}

              {/* Non-ground items */}
              {nonGroundItems.length > 0 && (
                <div className="flex flex-wrap items-center justify-center gap-0.5">
                  {nonGroundItems.map((item, i) => (
                    <div key={i} className="flex items-center justify-center">
                      {iconMap[item.type] || <span className="text-[8px] text-white">{item.name[0]}</span>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Cell details popup (shows when activeTool === null and user clicked a cell that has items) */}
      {cellPopup.open && (
        <div
          id="grid-cell-popup"
          style={{ position: "fixed", left: cellPopup.x + "px", top: cellPopup.y + "px", zIndex: 60 }}
          className="bg-white border rounded-md shadow-lg p-3 text-sm w-48"
        >
          <div className="font-semibold mb-2">Cell: {cellPopup.cell?.join(", ")}</div>
          <div className="space-y-1 max-h-48 overflow-auto">
            {cellPopup.items.map((it, i) => (
              <div key={i} className="flex justify-between items-center">
                <div className="text-gray-700 truncate">{it.name}</div>
                <div className="text-xs text-gray-500">{it.type}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
