function WebsiteNavbar() {
  return (
    <div className="w-full border-b sticky top-0 z-10 bg-white">
      {/* Top Bar */}
      <div className="flex justify-between items-center px-6 py-2 bg-white">
        <h1 className="text-lg font-bold">🌿 EDEN</h1>
        <div className="space-x-3">
          <button className="bg-green-600 text-white px-3 py-1 rounded text-sm">Save</button>
          <button className="bg-gray-200 px-3 py-1 rounded text-sm">Render All</button>
        </div>
      </div>
      {/* Address / Info Bar */}
      <div className="px-6 py-1 text-gray-500 text-sm">
        55 Dimond — Design v66
      </div>
    </div>
  )
}
export default WebsiteNavbar
