import WebsiteNavbar from './components/WebsiteNavbar'
import Sidebar from './components/Sidebar'
import EditorNavbar from './components/EditorNavbar'
import Grid from './components/Grid'
import JsonEditor from './components/JsonEditor'
import RenderPlaceholder from './components/RenderPlaceholder'
import { useSelector } from 'react-redux'
import Toolbar from "./components/Toolbar";
import { useRef } from "react";

function App() {
  const activeTab = useSelector((state) => state.ui.activeTab)
  const playgroundRef = useRef(null);

  return (
    <div className="h-screen w-screen flex flex-col bg-gray-50 overflow-hidden">
      {/* Website Navbar fixed at top */}
      <WebsiteNavbar />

      {/* Main Layout */}
      <div className="flex flex-1 p-2 gap-2 overflow-hidden">
        {/* Sidebar with its own scroll */}
        <div className="h-full overflow-y-auto scrollbar-hide">
          <Sidebar />
        </div>

        {/* Playground with its own scroll */}
  <div className="flex flex-col flex-1 p-2 bg-white rounded-lg shadow relative overflow-hidden">
  <EditorNavbar />
 <div
  ref={playgroundRef}
  className="flex-1 border rounded-lg mt-2 p-2 bg-white relative overflow-auto scrollbar-thin h-full"
>
  {activeTab === "json" && <JsonEditor />}
  {activeTab === "tile" && (
    <div className="relative w-full h-full pt-10">
      <Toolbar playgroundRef={playgroundRef} />
      <Grid />
    </div>
  )}
  {activeTab === "render" && <RenderPlaceholder />}
</div>

</div>
      </div>
    </div>
  )
}

export default App
