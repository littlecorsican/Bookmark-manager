import React, { useContext } from "react";
import Tag from "./Tag";
import { TagProps, TagsProps } from "@/types/types";
import { BookmarkProps, BookmarkListProps } from "@/types/types";
import { GlobalContext } from "./Client";
import { Trash2 } from 'lucide-react';


const TagList: React.FC = (
  { tags, bookmarks, setFilteredBookmarks }: 
  { tags: TagsProps, bookmarks: BookmarkListProps, setFilteredBookmarks: ()=> void }
) => {
  const context = useContext(GlobalContext);


  return (
    // <div className="flex space-x-4 p-4 ">
    <div className="inline-block w-full p-4 ">
      {/* <div className="inline-block p-2">
        <Trash2 size="40px" />
      </div> */}
      <Tag key="reset" name="Reset" onClick={() => setFilteredBookmarks(bookmarks.data)} />
      {tags && tags?.data?.length > 0 ? (
        tags.data.map((tag: TagProps) => (
          <Tag 
            key={tag.name}
            {...tag}
            showDelete={true}
            onClick={() => {
              setFilteredBookmarks(
                bookmarks?.data.filter((bookmark: BookmarkProps) =>
                  bookmark.tags.some((tag2: TagProps) => tag2.id === tag.id)
                )
              );
            }}
          />
        ))
      ) : (
        <span className="mt-2">No tags available.</span>
      )}
    </div>

  );
};

export default TagList;
