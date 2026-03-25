import LeagueSkelton from "./LeagueSkelton";
import TabsSkelton from "./TabSkelton";

export default function HomePageSkeleton(){
    return(
        <div className="min-h-screen bg-gray-950">
                <div className="md:mx-45 py-25 mx-5">
        
                  {/* Header Skeleton */}
                  <div className="mb-6">
                    <div className="h-8 w-60 bg-gray-700 rounded mb-2 animate-pulse" />
                    <div className="h-4 w-80 bg-gray-700 rounded animate-pulse" />
                  </div>
        
                  {/* Tabs Skeleton */}
                  <TabsSkelton />
        
                  {/* League Skeletons */}
                  <div className="flex flex-col gap-3">
                    {[1, 2, 3].map((i) => (
                      <LeagueSkelton key={i} />
                    ))}
                  </div>
        
                </div>
              </div>
    )
}