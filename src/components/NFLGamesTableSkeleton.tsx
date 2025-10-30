import React from "react";

const NFLGamesTableSkeleton = () => {
  const rows = Array(10).fill(0); // 👈 Show 10 placeholder rows

  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-800 shadow-lg bg-gray-900 animate-pulse">
      <table className="min-w-full border-collapse text-sm text-gray-300">
        <thead className="bg-gray-800 text-gray-400 text-left">
          <tr>
            <th className="px-6 py-3">Date</th>
            <th className="px-6 py-3">Stage / Week</th>
            <th className="px-6 py-3">Home Team</th>
            <th className="px-6 py-3">Score</th>
            <th className="px-6 py-3">Away Team</th>
            <th className="px-6 py-3">Venue</th>
            <th className="px-6 py-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((_, i) => (
            <tr
              key={i}
              className="border-b border-gray-800 hover:bg-gray-800/40 transition-all"
            >
              <td className="px-6 py-4">
                <div className="h-4 bg-gray-700 rounded w-20"></div>
              </td>
              <td className="px-6 py-4">
                <div className="h-4 bg-gray-700 rounded w-32 mb-1"></div>
                <div className="h-3 bg-gray-800 rounded w-16"></div>
              </td>
              <td className="px-6 py-4 flex items-center gap-3">
                <div className="w-6 h-6 bg-gray-700 rounded-full"></div>
                <div className="h-4 bg-gray-700 rounded w-28"></div>
              </td>
              <td className="px-6 py-4 text-center">
                <div className="h-4 bg-gray-700 rounded w-10 mx-auto"></div>
              </td>
              <td className="px-6 py-4 flex items-center gap-3">
                <div className="w-6 h-6 bg-gray-700 rounded-full"></div>
                <div className="h-4 bg-gray-700 rounded w-28"></div>
              </td>
              <td className="px-6 py-4">
                <div className="h-4 bg-gray-700 rounded w-36"></div>
              </td>
              <td className="px-6 py-4">
                <div className="h-4 bg-gray-700 rounded w-16 mx-auto"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NFLGamesTableSkeleton;
