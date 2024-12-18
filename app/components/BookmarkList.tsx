import React, { SyntheticEvent } from "react";
import CardView from "./CardView";
import ListView from "./ListView";
import { BookmarkProps, BookmarkListProps } from "@/types/types";



const BookmarkList:any = ({ bookmarks, view, refetchBookmarks }: {bookmarks: BookmarkProps[], view: "List"|"Card",  refetchBookmarks: ()=> void }) => {

  const handleTransitionEnd=(e:any)=>{
    if (e.nativeEvent?.propertyName != "transform" && e.target?.classList.contains("animate-fade-exit")) {
      e.target?.classList.add("removed")
    }
  }
  const handleTransitionStart=(e:any)=>{
    //if (e.nativeEvent.propertyName != "transform" && e.target.classList.contains("animate-fade-enter")) {
      e.target?.classList.remove("removed")
    //}
  }

  return (
    <div className="bg-gradient-to-b from-blue-400 via-cyan-300 to-yellow-200 p-6 rounded-md shadow-lg">
      <h2 className="text-2xl font-bold text-blue-800 mb-4 text-center">

      </h2>
      <CardView
        bookmarks={bookmarks}
        view={view}
        handleTransitionStart={handleTransitionStart}
        handleTransitionEnd={handleTransitionEnd}
        refetchBookmarks={refetchBookmarks}
      />
      <ListView
        bookmarks={bookmarks}
        view={view}
        handleTransitionStart={handleTransitionStart}
        handleTransitionEnd={handleTransitionEnd}
        refetchBookmarks={refetchBookmarks}
      />
      
    </div>
  );
};

export default BookmarkList;
