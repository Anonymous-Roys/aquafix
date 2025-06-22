

// Mock store hook for demo
const useAquaStore = () => ({ fishCount: 156 });

export const Navbar = () => {
  const { fishCount } = useAquaStore();
  
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-600 font-bold text-lg shadow-md">
              🐟
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold">AquaFix</h1>
              <p className="text-xs text-blue-100 -mt-1">Trout Management</p>
            </div>
            <h1 className="text-lg font-bold sm:hidden">AquaFix</h1>
          </div>

          {/* Status Info - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="text-center">
              <p className="text-xs text-blue-100 uppercase tracking-wide">Total Fish</p>
              <p className="text-lg font-bold">{fishCount}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-blue-100 uppercase tracking-wide">Status</p>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <p className="text-sm font-medium text-green-300">Online</p>
              </div>
            </div>
          </div>

          {/* User Profile */}
          <div className="flex items-center space-x-3">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium">Farm Manager</p>
              <p className="text-xs text-blue-100">Active Now</p>
            </div>
            <div className="w-9 h-9 bg-blue-500 rounded-full flex items-center justify-center shadow-md hover:bg-blue-400 transition-colors cursor-pointer">
              <span className="text-lg">👨‍🌾</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};