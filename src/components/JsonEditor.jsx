import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setGridSize, setElements } from "../redux/gridSlice";

export default function JsonEditor() {
  const gridSize = useSelector((state) => state.grid.gridSize);
  const elements = useSelector((state) => state.grid.elements);
  const dispatch = useDispatch();

  const [jsonValue, setJsonValue] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(null);

  // Whenever redux state changes → update textarea value
  useEffect(() => {
    setJsonValue(JSON.stringify({ gridSize, elements }, null, 2));
  }, [gridSize, elements]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(jsonValue);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch (err) {
      try {
        const ta = document.createElement("textarea");
        ta.value = jsonValue;
        ta.setAttribute("readonly", "");
        ta.style.position = "absolute";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
        setCopied(true);
        setTimeout(() => setCopied(false), 1600);
      } catch (e) {
        console.error("Copy failed", e);
        alert("Copy failed — please select and copy manually.");
      }
    }
  };

  const handleChange = (e) => {
    const newText = e.target.value;
    setJsonValue(newText);

    try {
      const parsed = JSON.parse(newText);
      setError(null);

      if (parsed.gridSize) {
        dispatch(setGridSize(parsed.gridSize));
      }
      if (parsed.elements) {
        dispatch(setElements(parsed.elements));
      }
    } catch (err) {
      setError("⚠️ Invalid JSON");
    }
  };

  return (
    <div className="relative w-full h-full">
      {/* Copy button (top-right inside the JSON card) */}
      <div className="absolute top-2 right-2 z-20">
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-2 px-3 py-1.5 bg-white border rounded-md shadow-sm text-sm font-medium hover:bg-gray-50"
          aria-label="Copy JSON"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 7V5a2 2 0 012-2h6a2 2 0 012 2v6M16 17H8a2 2 0 01-2-2V8a2 2 0 012-2h8a2 2 0 012 2v7a2 2 0 01-2 2z"
            />
          </svg>
          <span>Copy</span>
        </button>
      </div>

      {/* Copied badge */}
      {copied && (
        <div className="absolute top-2 right-24 z-30">
          <div className="px-2 py-1 bg-green-600 text-white text-xs rounded-md shadow-sm">
            Copied!
          </div>
        </div>
      )}

      {/* Error badge */}
      {error && (
        <div className="absolute top-2 left-2 z-30">
          <div className="px-2 py-1 bg-red-600 text-white text-xs rounded-md shadow-sm">
            {error}
          </div>
        </div>
      )}

      {/* JSON card */}
      <div className="h-full overflow-auto">
        <div className="bg-white border rounded-lg p-4 shadow-sm min-h-[300px]">
          <textarea
            className="w-full h-[70vh] font-mono text-sm border-none resize-none outline-none bg-white"
            value={jsonValue}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
}
