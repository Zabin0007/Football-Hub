export default function TabsSkelton(){
     return (
    <div className="bg-gray-800 rounded-lg p-1 mb-6 w-full animate-pulse">
      <div className="grid grid-cols-4 gap-1">
        {[1,2,3,4].map((i) => (
          <div key={i} className="h-10 bg-gray-700 rounded-md" />
        ))}
      </div>
    </div>
  );
}