import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { applyBackend, ensureDirtCoverage } from "../redux/gridSlice";
import { convertToBackendJson } from "../utils/convertToBackendJson";
import { convertFromBackendJson } from "../utils/convertFromBackendJson";

export default function JsonEditor() {
  const gridSize = useSelector((state) => state.grid.gridSize);
  const elements = useSelector((state) => state.grid.elements);
  const activeTab = useSelector((state) => state.ui.activeTab);
  const dispatch = useDispatch();

  const [jsonValue, setJsonValue] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(null);
  const debounceTimerRef = useRef(null);
  const isTypingRef = useRef(false);
  const lastValidParsedRef = useRef(null); // holds last valid backend JSON while typing
  const prevTabRef = useRef(activeTab);

  // Whenever redux state changes → update textarea value

  useEffect(() => {
    // Avoid overwriting user input while they are typing
    if (isTypingRef.current) return;
    const backendJson = convertToBackendJson(gridSize, elements);
    setJsonValue(JSON.stringify(backendJson, null, 2));
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
    isTypingRef.current = true;

    // Debounce parsing while typing, but DO NOT dispatch here
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    debounceTimerRef.current = setTimeout(() => {
      try {
        const parsed = JSON.parse(newText);
        setError(null);
        lastValidParsedRef.current = parsed;
      } catch (err) {
        console.error("JSON parse error:", err);
        setError("⚠️ Invalid JSON");
      }
    }, 300);
  };

  // Cleanup any pending timers on unmount
  useEffect(() => {
    return () => {
      // Apply the last valid JSON when leaving the editor (e.g., switching tabs)
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
      try {
        if (lastValidParsedRef.current) {
          const { gridSize: newSize, elements: newElements } = convertFromBackendJson(lastValidParsedRef.current);
          dispatch(applyBackend({ gridSize: newSize, elements: newElements }));
        }
      } finally {
        isTypingRef.current = false;
      }
    };
  }, [dispatch]);

  // Also apply on explicit tab switch away from JSON (even if component remains mounted)
  useEffect(() => {
    const prev = prevTabRef.current;
    if (prev === "json" && activeTab !== "json") {
      // leaving JSON tab → apply current valid JSON (prefer lastValidParsed, else try current textarea)
      let parsed = lastValidParsedRef.current;
      if (!parsed) {
        try {
          parsed = JSON.parse(jsonValue);
        } catch {
          parsed = null;
        }
      }
      try {
        if (parsed) {
          const { gridSize: newSize, elements: newElements } = convertFromBackendJson(parsed);
          dispatch(applyBackend({ gridSize: newSize, elements: newElements }));
          dispatch(ensureDirtCoverage());
        }
      } catch (e) {
        console.error("Apply backend failed:", e);
      }
    }
    prevTabRef.current = activeTab;
  }, [activeTab, dispatch, jsonValue]);
  return (
    <div className="relative w-full h-full">
      {/* Copy button (top-right inside the JSON card) */}
      <div className="absolute top-2 right-2 z-20">
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-2 px-3 py-1.5 bg-white border rounded-md shadow-sm text-sm font-medium hover:bg-gray-50"
          aria-label="Copy JSON"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
          <div className="px-2 py-1 bg-green-600 text-white text-xs rounded-md shadow-sm">Copied!</div>
        </div>
      )}

      {/* Error badge */}
      {error && (
        <div className="absolute top-2 left-2 z-30">
          <div className="px-2 py-1 bg-red-600 text-white text-xs rounded-md shadow-sm">{error}</div>
        </div>
      )}

      {/* JSON card */}
      <div className="h-full overflow-auto">
        <div className="bg-white border rounded-lg p-4 shadow-sm min-h-[300px]">
          <textarea className="w-full h-[70vh] font-mono text-sm border-none resize-none outline-none bg-white" value={jsonValue} onChange={handleChange} />
        </div>
      </div>
    </div>
  );
}
