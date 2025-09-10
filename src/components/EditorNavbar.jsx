import { useDispatch, useSelector } from 'react-redux'
import { setActiveTab } from '../redux/uiSlice'

function EditorNavbar() {
  const dispatch = useDispatch()
  const activeTab = useSelector((state) => state.ui.activeTab)

  const tabs = [
    { id: 'json', label: 'JSON' },
    { id: 'tile', label: 'Tile Editor' },
    { id: 'render', label: '2D Render' },
  ]

  return (
    <div className="flex space-x-6 border-b">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => dispatch(setActiveTab(tab.id))}
          className={`relative px-3 py-2 text-sm font-medium ${
            activeTab === tab.id
              ? 'text-green-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          {tab.label}
          {activeTab === tab.id && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-600 rounded-full"></span>
          )}
        </button>
      ))}
    </div>
  )
}

export default EditorNavbar
