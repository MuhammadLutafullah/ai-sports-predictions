import React, { useEffect, useState } from "react";
import NCAABGameSkeleton from "./NCAABGameSkeleton";

const NCAABGameTable = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL_2024 =
    "https://v1.basketball.api-sports.io/games?league=116&season=2024-2025";
  const API_URL_2025 =
    "https://v1.basketball.api-sports.io/games?league=116&season=2025";

  useEffect(() => {
    const fetchGames = async () => {
      try {
        // Fetch both years (current and previous)
        const [res2024, res2025] = await Promise.all([
          fetch(API_URL_2024, {
            headers: { "x-apisports-key": "a84b3d977d0172cbeb9c34b6ee9ec363" },
          }),
          fetch(API_URL_2025, {
            headers: { "x-apisports-key": "a84b3d977d0172cbeb9c34b6ee9ec363" },
          }),
        ]);

        const [data2024, data2025] = await Promise.all([
          res2024.json(),
          res2025.json(),
        ]);

        const games2024 = data2024.response || [];
        const games2025 = data2025.response || [];

        // Sort games by date (newest first)
        const sorted2024 = games2024.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        const sorted2025 = games2025.sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );

        // Get current year
        const currentYear = new Date().getFullYear();

        // Show upcoming/current year games first
        const combined =
          currentYear >= 2025
            ? [...sorted2025, ...sorted2024] // show 2025 then 2024
            : [...sorted2024, ...sorted2025]; // if before 2025, show 2024 first

        setGames(combined);
      } catch (error) {
        console.error("Error fetching NCAAB games:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGames();
  }, []);

  if (loading) return <NCAABGameSkeleton />;

  return (
    <div className="overflow-x-auto rounded-2xl border border-gray-800 shadow-lg bg-gray-900">
      <table className="min-w-full border-collapse text-sm lg:text-base text-gray-300 max-[800px]:text-[12px] max-[800px]:leading-[17px]">
        <thead className="bg-gray-800 text-gray-200 text-left">
          <tr>
            <th className="px-3 py-2">Date</th>
            <th className="px-3 py-2">Home Team</th>
            <th className="px-3 py-2 text-center">Score</th>
            <th className="px-3 py-2">Away Team</th>
            <th className="px-3 py-2 text-center">Status</th>
          </tr>
        </thead>

        <tbody>
          {games.map((game) => (
            <tr
              key={game.id}
              className="border-b border-gray-800 hover:bg-gray-800/40 transition-all"
            >
              {/* 🗓️ Date */}
              <td className="px-3 py-2 text-gray-400 whitespace-nowrap">
                {new Date(game.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </td>

              {/* 🏠 Home Team */}
              <td className="px-3 py-2 flex items-center gap-2">
                <img
                  src={game.teams.home?.logo}
                  alt={game.teams.home?.name}
                  className="w-5 h-5 object-contain"
                />
                <span>{game.teams.home?.name}</span>
              </td>

              {/* 🔢 Score */}
              <td className="px-3 py-2 font-bold text-gray-100 text-center">
                {game.scores.home?.total ?? "-"} :{" "}
                {game.scores.away?.total ?? "-"}
              </td>

              {/* 🏀 Away Team */}
              <td className="px-3 py-2 flex items-center gap-2">
                <img
                  src={game.teams.away?.logo}
                  alt={game.teams.away?.name}
                  className="w-5 h-5 object-contain"
                />
                <span>{game.teams.away?.name}</span>
              </td>

              {/* ⏱️ Status */}
              <td className="px-3 py-2 text-center">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    game.status.short === "FT"
                      ? "bg-green-700/30 text-green-400"
                      : game.status.short === "NS"
                      ? "bg-blue-700/30 text-blue-400"
                      : "bg-yellow-700/30 text-yellow-400"
                  }`}
                >
                  {game.status.long}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NCAABGameTable;

// ------------------- Simple NCAAB Game Table 2024 to 2025 -------------------

// import React, { useEffect, useState } from "react";
// import NCAABGameSkeleton from "./NCAABGameSkeleton";

// const NCAABGameTable = () => {
//   const [games, setGames] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const API_URL =
//     "https://v1.basketball.api-sports.io/games?league=116&season=2024-2025";

//   useEffect(() => {
//     const fetchGames = async () => {
//       try {
//         const response = await fetch(API_URL, {
//           headers: { "x-apisports-key": "a84b3d977d0172cbeb9c34b6ee9ec363" },
//         });
//         const data = await response.json();
//         setGames(data.response || []);
//       } catch (error) {
//         console.error("Error fetching NCAAB games:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchGames();
//   }, []);

//   if (loading) return <NCAABGameSkeleton />;

//   return (
//     <div className="overflow-x-auto rounded-2xl border border-gray-800 shadow-lg bg-gray-900">
//       <table className="min-w-full border-collapse text-sm lg:text-base text-gray-300 max-[800px]:text-[12px] max-[800px]:leading-[17px]">
//         <thead className="bg-gray-800 text-gray-200 text-left">
//           <tr>
//             <th className="px-3 py-2">Date</th>
//             <th className="px-3 py-2">Home Team</th>
//             <th className="px-3 py-2 text-center">Score</th>
//             <th className="px-3 py-2">Away Team</th>
//             <th className="px-3 py-2 text-center">Status</th>
//           </tr>
//         </thead>

//         <tbody>
//           {games.map((game) => (
//             <tr
//               key={game.id}
//               className="border-b border-gray-800 hover:bg-gray-800/40 transition-all"
//             >
//               {/* 🗓️ Date */}
//               <td className="px-3 py-2 text-gray-400 whitespace-nowrap">
//                 {new Date(game.date).toLocaleDateString("en-US", {
//                   month: "short",
//                   day: "numeric",
//                   year: "numeric",
//                 })}
//               </td>

//               {/* 🏠 Home Team */}
//               <td className="px-3 py-2 flex items-center gap-2">
//                 <img
//                   src={game.teams.home?.logo}
//                   alt={game.teams.home?.name}
//                   className="w-5 h-5 object-contain"
//                 />
//                 <span>{game.teams.home?.name}</span>
//               </td>

//               {/* 🔢 Score */}
//               <td className="px-3 py-2 font-bold text-gray-100 text-center">
//                 {game.scores.home?.total ?? "-"} :{" "}
//                 {game.scores.away?.total ?? "-"}
//               </td>

//               {/* 🏀 Away Team */}
//               <td className="px-3 py-2 flex items-center gap-2">
//                 <img
//                   src={game.teams.away?.logo}
//                   alt={game.teams.away?.name}
//                   className="w-5 h-5 object-contain"
//                 />
//                 <span>{game.teams.away?.name}</span>
//               </td>

//               {/* ⏱️ Status */}
//               <td className="px-3 py-2 text-center">
//                 <span
//                   className={`px-2 py-1 rounded-full text-xs font-semibold ${
//                     game.status.short === "FT"
//                       ? "bg-green-700/30 text-green-400"
//                       : game.status.short === "NS"
//                       ? "bg-blue-700/30 text-blue-400"
//                       : "bg-yellow-700/30 text-yellow-400"
//                   }`}
//                 >
//                   {game.status.long}
//                 </span>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default NCAABGameTable;
