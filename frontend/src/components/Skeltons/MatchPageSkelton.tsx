export default function MatchPageSkelton() {
  return (
    <>
    <div className="min-h-screen bg-gray-950 text-white">
    <div className="md:mx-45 py-25 mx-5">
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-6 mt-8 animate-pulse">
      
      {/* Header */}
      <div className="h-4 bg-gray-700 rounded w-1/3 mx-auto mb-6"></div>

      {/* Teams Row */}
      <div className="flex items-center justify-between md:mx-15">

        {/* Team A */}
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
          <div className="h-4 w-20 bg-gray-700 rounded"></div>
        </div>

        {/* Score */}
        <div className="h-6 w-16 bg-gray-700 rounded"></div>

        {/* Team B */}
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
          <div className="h-4 w-20 bg-gray-700 rounded"></div>
        </div>

      </div>
    </div>
    <div className="bg-gray-900 border border-gray-800 rounded-xl mb-6 p-6 animate-pulse">
        <div className="flex bg-gray-800 rounded-xl p-1">
            <div className=" py-2 rounded-lg"></div>
            <div className=" py-2 rounded-lg"></div>
            <div className=" py-2 rounded-lg"></div>
            <div className=" py-2 rounded-lg"></div>
        </div>
    </div>
     <div className="bg-gray-900 border border-gray-800 rounded-xl  p-6 animate-pulse">
         <div className="h-4 bg-gray-700 rounded w-full mx-auto mb-8"></div>
          <div className="h-4 bg-gray-700 rounded w-full mx-auto mb-8"></div>
           <div className="h-4 bg-gray-700 rounded w-full mx-auto mb-8"></div>
            <div className="h-4 bg-gray-700 rounded w-full mx-auto mb-8"></div>
     </div>
     </div>
    </div>
    </>
  )
}