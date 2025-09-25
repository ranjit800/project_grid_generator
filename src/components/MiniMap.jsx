import { useEffect, useMemo, useRef } from "react";
import { useSelector } from "react-redux";

/**
 * MiniMap
 * - Renders a zoomed-out overview of the entire grid using <canvas>
 * - Colors each cell by its ground cover (Dirt, Grass, etc.)
 * - Draws tiny dots for non-ground items
 * - Overlays the visible viewport rectangle from playgroundRef
 * - Clicking navigates the main scroll container to that position
 */
export default function MiniMap({ playgroundRef, width = 150, height = 150, className = "" }) {
  const { gridSize, elements } = useSelector((s) => s.grid);
  const { zoom } = useSelector((s) => s.ui);

  const rows = gridSize?.rows || 0;
  const cols = gridSize?.cols || 0;
  const baseCellPx = 50; // matches Grid.jsx baseCellSize
  const cellPx = baseCellPx * (zoom || 1);

  const canvasRef = useRef(null);

  // Build fast lookup: key "r,c" -> { groundColor: string, hasItems: boolean }
  const cellSummary = useMemo(() => {
    const map = new Map();
    // initialize ground to Dirt color by default
    const dirtColor = "#8B4513";
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        map.set(`${r},${c}`, { groundColor: dirtColor, hasItems: false });
      }
    }

    const inBounds = (r, c) => r >= 0 && r < rows && c >= 0 && c < cols;
    for (const entry of elements || []) {
      const [pr, pc] = entry.position || [];
      const items = Array.isArray(entry.items) ? entry.items : [];
      for (const it of items) {
        const [h = 1, w = 1] = it.size || [1, 1];
        for (let rr = pr; rr < pr + h; rr++) {
          for (let cc = pc; cc < pc + w; cc++) {
            if (!inBounds(rr, cc)) continue;
            const key = `${rr},${cc}`;
            const bucket = map.get(key);
            if (!bucket) continue;
            if (it.type === "groundCover") {
              bucket.groundColor = it.color || bucket.groundColor;
            } else {
              bucket.hasItems = true;
            }
          }
        }
      }
    }

    return map;
  }, [elements, rows, cols]);

  // draw everything
  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const cssW = width;
    const cssH = height;
    canvas.width = Math.floor(cssW * dpr);
    canvas.height = Math.floor(cssH * dpr);
    canvas.style.width = `${cssW}px`;
    canvas.style.height = `${cssH}px`;
    ctx.scale(dpr, dpr);

    // clear
    ctx.clearRect(0, 0, cssW, cssH);

    if (rows <= 0 || cols <= 0) return;

    const cellW = cssW / cols;
    const cellH = cssH / rows;

    // draw ground per cell
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const bucket = cellSummary.get(`${r},${c}`);
        const color = bucket?.groundColor || "#8B4513"; // Dirt fallback
        ctx.fillStyle = color;
        ctx.fillRect(c * cellW, r * cellH, Math.ceil(cellW), Math.ceil(cellH));
      }
    }

    // draw non-ground indicator dots
    ctx.fillStyle = "#065F46"; // dark green for items
    const dotRadius = Math.max(0.75, Math.min(cellW, cellH) * 0.15);
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const bucket = cellSummary.get(`${r},${c}`);
        if (bucket?.hasItems) {
          const cx = c * cellW + cellW / 2;
          const cy = r * cellH + cellH / 2;
          ctx.beginPath();
          ctx.arc(cx, cy, dotRadius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    // border
    ctx.strokeStyle = "rgba(0,0,0,0.25)";
    ctx.lineWidth = 1;
    ctx.strokeRect(0.5, 0.5, cssW - 1, cssH - 1);

    // viewport overlay from scroll container
    const scroller = playgroundRef?.current;
    if (scroller) {
      const contentW = cols * cellPx;
      const contentH = rows * cellPx;
      // scale factors from content to minimap
      const sx = cssW / contentW;
      const sy = cssH / contentH;
      const left = (scroller.scrollLeft || 0) * sx;
      const top = (scroller.scrollTop || 0) * sy;
      const vw = (scroller.clientWidth || 0) * sx;
      const vh = (scroller.clientHeight || 0) * sy;

      ctx.strokeStyle = "#2563EB"; // blue
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 3]);
      ctx.strokeRect(left, top, Math.max(10, vw), Math.max(10, vh));
      ctx.setLineDash([]);
    }
  };

  // redraw on data changes
  useEffect(() => {
    draw();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows, cols, cellSummary, zoom]);

  // attach scroll/resize listeners for live viewport updates
  useEffect(() => {
    const scroller = playgroundRef?.current;
    const rerender = () => draw();
    window.addEventListener("resize", rerender);
    if (scroller) scroller.addEventListener("scroll", rerender, { passive: true });
    return () => {
      window.removeEventListener("resize", rerender);
      if (scroller) scroller.removeEventListener("scroll", rerender);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playgroundRef?.current, rows, cols, zoom]);

  // handle click to scroll main grid
  const handleClick = (e) => {
    const scroller = playgroundRef?.current;
    if (!scroller || rows <= 0 || cols <= 0) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const contentW = cols * cellPx;
    const contentH = rows * cellPx;
    const sx = contentW / width;
    const sy = contentH / height;

    // center the viewport on click location
    const targetX = x * sx - scroller.clientWidth / 2;
    const targetY = y * sy - scroller.clientHeight / 2;

    const maxX = Math.max(0, contentW - scroller.clientWidth);
    const maxY = Math.max(0, contentH - scroller.clientHeight);

    scroller.scrollTo({
      left: Math.max(0, Math.min(maxX, targetX)),
      top: Math.max(0, Math.min(maxY, targetY)),
      behavior: "smooth",
    });
  };

  return (
    <div
      className={`pointer-events-auto absolute bottom-4 left-0 z-40 select-none ${className}`}
      style={{ width, height, filter: "invert(1) hue-rotate(180deg) contrast(1.1)" }}
      onClick={handleClick}
    >
      <div className="w-full h-full ">
        <canvas
          ref={canvasRef}
          className="block w-full h-full rounded-lg"
          style={{
            border: "2px solid #fff",
            boxShadow: "0 0 0 2px #222",
            background: "rgba(255,255,255,0.95)",
          }}
        />
      </div>
    </div>
  );
}
