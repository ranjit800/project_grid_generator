function WebsiteNavbar() {
  return (
    <div className="w-full border-b sticky top-0 z-10 bg-white">
      {/* Top Bar */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center px-[5vw] py-2 bg-white gap-2">
        
        {/* Brand */}
        <h1 className="text-lg md:text-xl font-bold">EDEN</h1>

        {/* Address / Info Bar */}
        <div className="text-gray-500 text-sm md:text-base text-center md:text-left">
          55 Dimond — Design v66
        </div>

        {/* Buttons */}
        <div className="flex justify-center md:justify-end gap-2">
          <button className="bg-green-600 text-white px-4 py-2 rounded text-sm md:text-base hover:bg-green-700 transition">
            Save
          </button>
          <button className="bg-gray-200 px-4 py-2 rounded text-sm md:text-base hover:bg-gray-300 transition">
            Render All
          </button>
        </div>
      </div>
    </div>
  );
}

export default WebsiteNavbar;
