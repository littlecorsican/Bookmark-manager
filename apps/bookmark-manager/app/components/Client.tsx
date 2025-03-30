'use client'
import { useEffect, createContext, useState, CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GlobalContextType } from "@/types/types";
import { useModal } from "../hooks/useModal";
import TopBar from "./Topbar";
import Button from "./Shared/Button";
import BookmarkList from "./BookmarkList";
import { useBookmarks } from "../hooks/useBookmarks";
import { useTags } from "@/hooks/useTags";
import AddBookmark from "./Modals/AddBookmarkModal";
import AddTag from "./Modals/AddTagModal";
import TagList from "./TagList";
import SearchBar from "./SearchBar";
import { BookmarkProps } from "@/types/types";
import { Table, Table2, Download, Upload, Tags, Bookmark } from "lucide-react";
import { ViewTypes } from "@/types/types";
import { exportBookmarks, importBookmarks } from "@/utils/helper";


const override: CSSProperties = {
  position: "fixed",
  top: "45%",
  left: "45%",
  transform: "translate(-45%, -45%)",
  borderColor: "red",
  zIndex: 99999
};

export const GlobalContext = createContext<GlobalContextType | undefined>(undefined);


export default function Client() {
  const { openModal:openAddBookmarkModal, Modal:AddBookmarkModal, closeModal: closeAddBookmarkModal } = useModal("w-[50%]");
  const { openModal:openAddTagModal, Modal:AddTagModal, closeModal:closeAddTagModal } = useModal();

  const [offset, setOffset] = useState(1);
  const [view, setView] = useState<ViewTypes>("List");
  const [filteredBookmarks, setFilteredBookmarks] = useState<BookmarkProps[]>([]);
  const [filterText, setFilterText] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const { tags, isLoading: isTagsLoading, isError: isErrorLoading, refetchTags } = useTags();

  const { bookmarks, isLoading, isError, mutate } = useBookmarks({
    offset: offset
  });

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

  // const toggleView = () => {
  //   setView(view === "List" ? "Card" : "List");
  // };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading bookmarks.</div>;

  return (
    <>
      <GlobalContext.Provider value={{ 
        loading, setLoading,
        toast,
        tags, isTagsLoading, isErrorLoading, refetchTags
      }}>
        <TopBar>
          <Button className="" tooltip="Add New Bookmark" onClick={()=>openAddBookmarkModal()}>
            <Bookmark />
          </Button>
          <Button className="" tooltip="Add New Tag" onClick={()=>openAddTagModal()}>
            <Tags />
          </Button>
          <Button className="" tooltip="Set List view" onClick={()=>setView("List")}>
            <Table />
          </Button>
          <Button className="" tooltip="Set Card view" onClick={()=>setView("Card")}>
            <Table2 />
          </Button>
          <Button className="" tooltip="Download Bookmarks as csv" onClick={exportBookmarks}>
            <Download />
          </Button>
          <Button className="" tooltip="Load Bookmarks from csv" onClick={importBookmarks}>
            <Upload />
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
            refetchTags={refetchTags}
          />
        </AddBookmarkModal>
        <AddTagModal>
          <AddTag 
            closeAddTagModal={closeAddTagModal}
            refetchTags={refetchTags}
          />
        </AddTagModal>
        <ClipLoader
          color={"#000"}
          loading={loading}
          cssOverride={override}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
        <ToastContainer />
      </GlobalContext.Provider>
    </>
  );
}
