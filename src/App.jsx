import WebsiteNavbar from './components/WebsiteNavbar'
import Sidebar from './components/Sidebar'
import EditorNavbar from './components/EditorNavbar'
import Grid from './components/Grid'
import JsonEditor from './components/JsonEditor'
import RenderPlaceholder from './components/RenderPlaceholder'
import { useSelector } from 'react-redux'

function App() {
  const activeTab = useSelector((state) => state.ui.activeTab)

  return (
    <div className="h-screen flex flex-col bg-gray-50">
  {/* Website Navbar */}
  <WebsiteNavbar />

  {/* Main Layout */}
  <div className="flex flex-1 p-2 gap-2">
    {/* Sidebar (as card) */}
    <Sidebar />

    {/* Playground */}
    <div className="flex flex-col flex-1 p-2 bg-white rounded-lg shadow">
      <EditorNavbar />
      <div className="flex-1 border rounded-lg mt-2 p-2 bg-white">
        {activeTab === 'json' && <JsonEditor />}
        {activeTab === 'tile' && <Grid />}
        {activeTab === 'render' && <RenderPlaceholder />}
      </div>
    </div>
  </div>
</div>

  )
}

export default App
