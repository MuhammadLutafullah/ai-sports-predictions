import React from "react";

const NCAAFSkeleton = () => {
  return (
    <>
      <div className="space-y-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="bg-gray-900 rounded-2xl shadow-lg p-6 mb-6 border border-gray-800 animate-pulse"
          >
            {/* Game Date */}
            <div className="h-4 w-32 bg-gray-700 mx-auto mb-4 rounded"></div>

            {/* Teams Section */}
            <div className="flex justify-between items-center py-4">
              {/* Away Team */}
              <div className="flex flex-col items-center w-1/3">
                <div className="w-16 h-16 bg-gray-700 rounded-full mb-3"></div>
                <div className="h-4 w-24 bg-gray-700 rounded"></div>
              </div>

              {/* Game Info (Center) */}
              <div className="flex flex-col items-center w-1/3">
                <div className="h-4 w-20 bg-gray-700 rounded mb-2"></div>{" "}
                {/* League */}
                <div className="h-3 w-28 bg-gray-700 rounded mb-2"></div>{" "}
                {/* Status */}
                <div className="h-3 w-16 bg-gray-700 rounded"></div>{" "}
                {/* Season */}
              </div>

              {/* Home Team */}
              <div className="flex flex-col items-center w-1/3">
                <div className="w-16 h-16 bg-gray-700 rounded-full mb-3"></div>
                <div className="h-4 w-24 bg-gray-700 rounded"></div>
              </div>
            </div>

            {/* Scores */}
            <div className="flex justify-center mt-4 space-x-6">
              <div className="h-4 w-8 bg-gray-700 rounded"></div>
              <div className="h-4 w-8 bg-gray-700 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default NCAAFSkeleton;
