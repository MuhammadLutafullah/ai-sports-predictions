import React from "react";

const NCAABSkeleton = () => {
  return (
    <>
      <div className="space-y-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="bg-gray-900 rounded-2xl shadow-lg p-6 border border-gray-800 animate-pulse"
          >
            {/* Date */}
            <div className="h-4 w-48 bg-gray-700 mx-auto mb-6 rounded"></div>

            {/* Teams */}
            <div className="flex justify-between items-center py-4">
              {/* Home Team */}
              <div className="flex flex-col items-center w-1/3">
                <div className="w-20 h-20 bg-gray-700 rounded-full mb-3"></div>
                <div className="h-4 w-24 bg-gray-700 rounded"></div>
              </div>

              {/* Center Info */}
              <div className="flex flex-col items-center w-1/3">
                <div className="h-4 w-16 bg-gray-700 rounded mb-2"></div>
                <div className="h-3 w-28 bg-gray-700 rounded mb-2"></div>
                <div className="h-3 w-32 bg-gray-700 rounded"></div>
              </div>

              {/* Away Team */}
              <div className="flex flex-col items-center w-1/3">
                <div className="w-20 h-20 bg-gray-700 rounded-full mb-3"></div>
                <div className="h-4 w-24 bg-gray-700 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default NCAABSkeleton;
