import React from 'react'
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
} from "@/components/ui/card";

function PostCardSkeleton({ variant , loading}) {
 
  if (loading) {
    if (variant === "list") {
      return (
        <Card className="relative w-full mb-10 overflow-hidden bg-transparent border-white/10 rounded-xl flex flex-row p-0">
          {/* Matches image width */}
          <Skeleton className="w-48 md:w-52 lg:w-72 min-w-48 h-48 md:h-full rounded-none opacity-20" />
          <div className="flex flex-col justify-between flex-1 px-4 py-4">
            <div className="space-y-3">
              <Skeleton className="h-3 w-20 opacity-30" />
              <Skeleton className="h-5 w-3/4 opacity-40" />
              <div className="space-y-2">
                <Skeleton className="h-3 w-full opacity-20" />
                <Skeleton className="h-3 w-5/6 opacity-20" />
              </div>
            </div>
            <div className="flex items-center gap-2.5 mt-4">
              <Skeleton className="size-6 rounded-full opacity-30" />
              <Skeleton className="h-3 w-24 opacity-20" />
            </div>
          </div>
        </Card>
      );
    }

    // Grid Skeleton
    return (
      <Card className="relative mx-auto bg-transparent overflow-hidden pt-0 border-white/10 rounded-xl">
        <Skeleton className="w-48 md:w-52 lg:w-72 min-w-48 h-full object-cover aspect-vieo rounded-b-xl opacity-20" />
        <div className="p-4 space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-3 w-16 opacity-30" />
            <Skeleton className="h-5 w-full opacity-40" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-3 w-full opacity-20" />
            <Skeleton className="h-3 w-2/3 opacity-20" />
          </div>
          <div className="flex items-center gap-2.5 pt-2">
            <Skeleton className="size-6 rounded-full opacity-30" />
            <Skeleton className="h-3 w-20 opacity-20" />
          </div>
        </div>
      </Card>
    );
  }

}

export default PostCardSkeleton