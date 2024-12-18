'use client'
import { useEffect, useState } from "react";
import { useModal } from "../hooks/useModal";
import TopBar from "@/components/Topbar";
import Button from "./Shared/Button";
import BookmarkList from "@/components/BookmarkList";
import { useBookmarks } from "@/hooks/useBookmarks";
import { useTags } from "@/hooks/useTags";
import { GlobalProvider } from "@/context/GlobalContext";
import AddBookmark from "./Modals/AddBookmarkModal";
import AddTag from "./Modals/AddTagModal";
import TagList from "./TagList";
import SearchBar from "./SearchBar";
import { BookmarkProps, BookmarkListProps } from "@/types/types";
import { Table, Table2 } from "lucide-react";
import ConfirmDeleteModal from './Modals/ConfirmDeleteModal';

type ViewTypes = "List" | "Card";

export default function Client() {
  const { openModal:openAddBookmarkModal, Modal:AddBookmarkModal, closeModal: closeAddBookmarkModal } = useModal("w-[50%]");
  const { openModal:openAddTagModal, Modal:AddTagModal, closeModal:closeAddTagModal } = useModal();

  const [offset, setOffset] = useState(1);
  const [view, setView] = useState<ViewTypes>("List");
  const [filteredBookmarks, setFilteredBookmarks] = useState<BookmarkProps[]>([]);
  const [filterText, setFilterText] = useState<string>("");

  const { bookmarks, isLoading, isError, mutate } = useBookmarks({
    offset: offset
  });

  const { tags, isLoading: isTagsLoading, isError: isErrorLoading, refetchTags } = useTags();

  useEffect(()=>{
    if (!filterText) {
      setFilteredBookmarks(bookmarks?.data || [])
    } else {
      setFilteredBookmarks(bookmarks?.data.filter((value: BookmarkProps)=>{
        if (value.title.indexOf(filterText) > -1) return value
      }))
      // setFilteredBookmarks(bookmarks?.data.filter((value)=>value.title.contains(filterText)) || [])
    }
  }, [bookmarks, filterText])

  const toggleView = () => {
    setView(view === "List" ? "Card" : "List");
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading bookmarks.</div>;

  return (
    <>
      <GlobalProvider>
        <TopBar>
          <Button className="" onClick={()=>openAddBookmarkModal()}>
            Add New Bookmark
          </Button>
          <Button className="" onClick={()=>openAddTagModal()}>
            Add New Tag
          </Button>
          <Button className="" onClick={()=>setView("List")}>
            <Table />
          </Button>
          <Button className="" onClick={()=>setView("Card")}>
            <Table2 />
          </Button>
        </TopBar>
        {isTagsLoading && <h2>Tags are loading</h2>}
        {isErrorLoading && <h2>Error loading tags</h2>}
        <TagList 
          tags={tags}
          bookmarks={bookmarks}
          setFilteredBookmarks={setFilteredBookmarks}
        />
        <SearchBar setFilterText={setFilterText} />
        <BookmarkList 
          bookmarks={filteredBookmarks}
          view={view}
          refetchBookmarks={mutate}
        />
        <AddBookmarkModal>
          <AddBookmark
            refetchBookmarks={mutate}
            closeAddBookmarkModal={closeAddBookmarkModal}
          />
        </AddBookmarkModal>
        <AddTagModal>
          <AddTag 
            closeAddTagModal={closeAddTagModal}
            refetchTags={refetchTags}
          />
        </AddTagModal>
      </GlobalProvider>
    </>
  );
}
