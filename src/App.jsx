// import WebsiteNavbar from './components/WebsiteNavbar'
// import EditorNavbar from './components/EditorNavbar'
// import Grid from './components/Grid'
// import JsonEditor from './components/JsonEditor'
// import RenderPlaceholder from './components/RenderPlaceholder'
// import { useSelector } from 'react-redux'
// import Toolbar from "./components/Toolbar";
// import RightSidebar from "./components/RightSidebar";
// import { useRef } from "react";

// function App() {
//   const activeTab = useSelector((state) => state.ui.activeTab);
//   const playgroundRef = useRef(null);

//   return (
//     <div className="h-screen w-screen flex flex-col bg-gray-50 overflow-hidden">
//       {/* Website Navbar */}
//       <WebsiteNavbar />

//       {/* Main Layout */}
//       <div className="flex flex-1 p-2 gap-2 overflow-hidden">
//         {/* Left Toolbar */}
//         <div className="h-full">
//           <Toolbar playgroundRef={playgroundRef} />
//         </div>

//         {/* Playground */}
//         <div className="flex flex-col flex-1 bg-white rounded-lg shadow relative overflow-hidden">
//           <EditorNavbar />
//           <div
//             ref={playgroundRef}
//             className="flex-1 border p-2 bg-white relative overflow-auto scrollbar-thin h-full"
//           >
//             {activeTab === "json" && <JsonEditor />}
//             {activeTab === "tile" && <Grid />}
//             {activeTab === "render" && <RenderPlaceholder />}
//           </div>
//         </div>

//         {/* Right Sidebar */}
//         <RightSidebar />
//       </div>
//     </div>
//   );
// }

// export default App;

// // App.jsx (update)
// import WebsiteNavbar from './components/WebsiteNavbar'
// import RightSidebar from './components/RightSidebar'
// import EditorNavbar from './components/EditorNavbar'
// import Grid from './components/Grid'
// import JsonEditor from './components/JsonEditor'
// import RenderPlaceholder from './components/RenderPlaceholder'
// import { useSelector } from 'react-redux'
// import Toolbar from "./components/Toolbar";
// import { useRef } from "react";

// function App() {
//   const activeTab = useSelector((state) => state.ui.activeTab)
//   const playgroundRef = useRef(null);

//   return (
//     <div className="h-screen w-screen flex flex-col bg-gray-50 overflow-hidden">
//       {/* Website Navbar */}
//       <WebsiteNavbar />

//       {/* Main Layout */}
//       <div className="flex flex-1 p-2 gap-2 overflow-hidden">

//         {/* 🔹 Left Toolbar */}
//         {activeTab === "tile" && (
//           <div className="w-14 bg-white rounded-lg shadow flex flex-col items-center py-3">
//             <Toolbar playgroundRef={playgroundRef} />
//           </div>
//         )}

//         {/* Playground */}
//         <div className="flex flex-col flex-1 bg-white rounded-lg shadow relative overflow-hidden">
//           <EditorNavbar />

//           <div
//             ref={playgroundRef}
//             className="flex-1 border p-2 bg-white relative overflow-auto scrollbar-thin h-full"
//           >
//             {activeTab === "json" && <JsonEditor />}
//             {activeTab === "tile" && <Grid />}
//             {activeTab === "render" && <RenderPlaceholder />}
//           </div>
//         </div>

//         {/* 🔹 Right Sidebar */}
//         <RightSidebar />
//       </div>
//     </div>
//   )
// }

// export default App

// App.jsx (updated with initializeGrid)
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import WebsiteNavbar from "./components/WebsiteNavbar";
import RightSidebar from "./components/RightSidebar";
import EditorNavbar from "./components/EditorNavbar";
import Grid from "./components/Grid";
import MiniMap from "./components/MiniMap";
import JsonEditor from "./components/JsonEditor";
import RenderPlaceholder from "./components/RenderPlaceholder";
import { useSelector, useDispatch } from "react-redux";
import Toolbar from "./components/Toolbar";
import { useRef, useEffect } from "react";
import { initializeGrid, ensureDirtCoverage } from "./redux/gridSlice"; // ✅ ensure coverage on view switch

function App() {
  const activeTab = useSelector((state) => state.ui.activeTab);
  const playgroundRef = useRef(null);
  const dispatch = useDispatch();

  // ✅ initialize grid with Dirt cells when app loads
  useEffect(() => {
    dispatch(initializeGrid({ rows: 5, cols: 5 }));
    // extra safety right after init
    dispatch(ensureDirtCoverage());
  }, [dispatch]);

  // ✅ whenever user switches to tile tab, ensure grid has Dirt everywhere
  useEffect(() => {
    if (activeTab === "tile") {
      dispatch(ensureDirtCoverage());
    }
  }, [activeTab, dispatch]);

  return (
    <>
      {/* baaki tumhara layout */}
      <ToastContainer position="top-right" autoClose={1500} />
      <div className="h-screen w-screen flex flex-col bg-gray-50 overflow-hidden">
        {/* Website Navbar */}
        <WebsiteNavbar />

        {/* Main Layout */}
        <div className="flex flex-1 p-2 gap-2 overflow-hidden">
          {/* 🔹 Left Toolbar */}
          {activeTab === "tile" && (
            <div className="w-14 bg-white rounded-lg shadow flex flex-col items-center py-3">
              <Toolbar playgroundRef={playgroundRef} />
            </div>
          )}

          {/* Playground */}
          <div className="flex flex-col flex-1 bg-white rounded-lg shadow relative overflow-hidden">
            <EditorNavbar />

            <div ref={playgroundRef} className="flex-1 border p-2 bg-white relative overflow-auto scrollbar-thin h-full">
              {activeTab === "json" && <JsonEditor />}
              {activeTab === "tile" && <Grid />}
              {activeTab === "render" && <RenderPlaceholder />}
            </div>

            {/* Mini Map anchored to playground container (fixed over scrollable content) */}
            {activeTab === "tile" && <MiniMap playgroundRef={playgroundRef} width={150} height={150} />}
          </div>

          {/* 🔹 Right Sidebar */}
          <RightSidebar />
        </div>
      </div>
    </>
  );
}

export default App;
