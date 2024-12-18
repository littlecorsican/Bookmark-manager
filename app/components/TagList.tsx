import React, { useContext, useEffect } from "react";
import { GlobalContext } from "@/context/GlobalContext";
import Tag from "./Tag";
import { TagProps, TagsProps } from "@/types/types";
import { BookmarkProps, BookmarkListProps } from "@/types/types";


const TagList: React.FC = (
  { tags, bookmarks, setFilteredBookmarks }: 
  { tags: TagsProps, bookmarks: BookmarkListProps, setFilteredBookmarks: ()=> void }
) => {
  const context = useContext(GlobalContext);


  return (
    // <div className="flex space-x-4 p-4 ">
    <div className="inline-block w-full p-4 ">
      <Tag name="Reset" onClick={()=>setFilteredBookmarks(bookmarks.data)} />
      {tags && tags.data.length > 0 ? (
        tags.data.map((tag: TagProps) => (
          <Tag 
            key={tag.id}
            {...tag}
            onClick={()=>{
              setFilteredBookmarks(bookmarks?.data.filter((bookmark: BookmarkProps) =>
                bookmark.tags.some((tag2: TagProps) => tag2.id === tag.id)
              ));
            }}
          />
        ))
      ) : (
        <p>No tags available.</p>
      )}
    </div>
  );
};

export default TagList;
