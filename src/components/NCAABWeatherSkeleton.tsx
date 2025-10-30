import React from "react";

const NCAABWeatherSkeleton = () => {
  return (
    <>
      <div className="p-6 max-w-7xl mx-auto">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-gray-900 text-white rounded-2xl shadow-lg p-6 border border-gray-800 animate-pulse"
            >
              {/* Date placeholder */}
              <div className="h-4 w-48 bg-gray-700 rounded mx-auto mb-4"></div>

              {/* League info */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-700 rounded w-32 mb-2"></div>
                  <div className="h-3 bg-gray-800 rounded w-24"></div>
                </div>
              </div>

              {/* Teams & VS */}
              <div className="flex justify-between items-center py-4">
                {/* Home team */}
                <div className="flex flex-col items-center w-1/3">
                  <div className="w-20 h-20 bg-gray-700 rounded-full mb-2"></div>
                  <div className="h-3 bg-gray-700 rounded w-20"></div>
                </div>

                {/* VS */}
                <div className="text-center w-1/3">
                  <div className="h-4 w-10 bg-gray-700 rounded mx-auto mb-3"></div>
                  <div className="h-3 w-24 bg-gray-700 rounded mx-auto mb-1"></div>
                  <div className="h-3 w-20 bg-gray-800 rounded mx-auto"></div>
                </div>

                {/* Away team */}
                <div className="flex flex-col items-center w-1/3">
                  <div className="w-20 h-20 bg-gray-700 rounded-full mb-2"></div>
                  <div className="h-3 bg-gray-700 rounded w-20"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default NCAABWeatherSkeleton;
