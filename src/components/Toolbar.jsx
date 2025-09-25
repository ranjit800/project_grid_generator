// Toolbar.jsx
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveTool, setZoom } from "../redux/uiSlice";
import { setGridSize } from "../redux/gridSlice";
import { Info, ZoomIn, ZoomOut, Undo, Redo, LocateFixed, Pipette, Plus, Scaling } from "lucide-react";
import dozer from "../assets/dozer.png";

function Toolbar({ playgroundRef, onToggleMiniMap, isMiniMapVisible }) {
  const dispatch = useDispatch();
  const { activeTool, zoom } = useSelector((s) => s.ui);
  const { gridSize } = useSelector((s) => s.grid);
  const rows = gridSize?.rows ?? 5;
  const cols = gridSize?.cols ?? 5;

  // Modal state for resizing grid
  const [sizeModalOpen, setSizeModalOpen] = useState(false);
  const [rowsInput, setRowsInput] = useState(String(rows));
  const [colsInput, setColsInput] = useState(String(cols));

  const handleZoom = (dir) => {
    const newZoom = dir === "in" ? zoom + 0.1 : zoom - 0.1;
    dispatch(setZoom(Math.max(0.5, Math.min(newZoom, 3))));
  };

  const tools = [
    { key: "mouse", icon: <Info size={20} />, label: "Mouse" },
    { key: "add", icon: <Plus size={20} />, label: "Add" },
    { key: "shovel", icon: <img src={dozer} alt="Shovel" className="w-5 h-5" />, label: "Shovel" },
    { key: "dropper", icon: <Pipette size={20} />, label: "Dropper" },
    { key: "json", icon: null, label: "JSON" },
  ];

  const clamp = (val, min, max) => Math.max(min, Math.min(val, max));

  const openSizeModal = () => {
    setRowsInput(String(rows));
    setColsInput(String(cols));
    setSizeModalOpen(true);
  };

  const saveSize = () => {
    const r = clamp(parseInt(rowsInput, 10) || 0, 1, 100);
    const c = clamp(parseInt(colsInput, 10) || 0, 1, 100);
    dispatch(setGridSize({ rows: r, cols: c }));
    setSizeModalOpen(false);
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
      {/* Grid Size Modal Trigger */}
      <ToolTip text="Resize Grid">
        <button
          onClick={openSizeModal}
          className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200"
          aria-label="Resize Grid"
          type="button"
        >
          <Scaling size={20} />
        </button>
      </ToolTip>
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

      {/* Resize Grid Modal */}
      {sizeModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg shadow-xl p-4 w-72">
            <div className="mb-3">
              <h3 className="text-sm font-semibold text-gray-800">Set Grid Size</h3>
              <p className="text-[11px] text-gray-500">1 to 100</p>
            </div>
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="block text-[10px] text-gray-600 mb-1">Rows</label>
                <input
                  type="number"
                  min={1}
                  max={100}
                  value={rowsInput}
                  onChange={(e) => setRowsInput(e.target.value)}
                  className="w-full text-center border rounded px-2 py-1 text-xs"
                />
              </div>
              <div className="flex-1">
                <label className="block text-[10px] text-gray-600 mb-1">Cols</label>
                <input
                  type="number"
                  min={1}
                  max={100}
                  value={colsInput}
                  onChange={(e) => setColsInput(e.target.value)}
                  className="w-full text-center border rounded px-2 py-1 text-xs"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button onClick={() => setSizeModalOpen(false)} className="px-3 py-1 text-xs rounded border bg-white hover:bg-gray-50">Cancel</button>
              <button onClick={saveSize} className="px-3 py-1 text-xs rounded bg-green-600 text-white hover:bg-green-700">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Toolbar;
