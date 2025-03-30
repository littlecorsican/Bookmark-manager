import React, { useState } from 'react';
import { BookmarkListProps, BookmarkProps } from '@/types/types';
import Tag from './Tag';
import { X } from 'lucide-react';
import { useModal } from "../hooks/useModal";
import DeleteModal from './Modals/DeleteModal';
import { openUrl } from '@/utils/helper';
import { deleteBookmark } from '@/functions/deleteBookmark';
import { DatabaseZap } from 'lucide-react';
import { ListViewProps } from '@/types/types';
import HTMLViewModal from './Modals/HTMLViewModal';


const ListView: React.FC<ListViewProps> = ({
    bookmarks,
    handleTransitionEnd,
    handleTransitionStart,
    view,
    refetchBookmarks,
}) => {

    const { openModal:openConfirmDeleteModal, Modal:ConfirmDeleteModalWrapper, closeModal:closeConfirmDeleteModal } = useModal();
    const { openModal:openHTMLViewModal, Modal:HTMLViewModalWrapper } = useModal("w-[90vw] h-[90vh] overflow-scroll");
    const [id, setId] = useState(null)

    return (
        <ul className="space-y-3">
            {bookmarks && bookmarks.map((bookmark: BookmarkProps, index: number) => (
                <li
                    key={index}
                    className={`bg-white hover:bg-yellow-100 transition p-4 rounded-md shadow flex flex-row justify-between items-center space-x-4 animate-fade ${view === "List" ? "animate-fade-enter" : "animate-fade-exit"}`}
                    onTransitionEnd={handleTransitionEnd}
                    onTransitionStart={handleTransitionStart}
                >
                    {/* <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                        {index + 1}
                    </div> */}
                    <div className="flex-1">
                        <div
                            onClick={()=>openUrl(bookmark.url, bookmark.id)}
                            className="text-blue-700 font-medium cursor-pointer"
                        >
                            <div className="text-2xl">{bookmark.title}</div>
                            <div>{bookmark.url}</div>
                        </div>
                        <div className="italic">
                            {bookmark.description}
                        </div>
                        <div className="">
                            {bookmark.tags && bookmark.tags.map((tag)=>{
                                return <Tag key={`listview_${tag.id}`} {...tag} />
                            })}
                        </div>
                    </div>
                    <div className="flex-3">
                        <div>
                            Last Visited: {bookmark?.last_visited ? new Date(bookmark.last_visited).toLocaleString() : ""}
                        </div>
                        <div>
                            Visits: {bookmark.count}
                        </div>
                        <div className="cursor-pointer" onClick={()=>{
                            setId(bookmark.id)
                            openHTMLViewModal()
                        }}>
                            <DatabaseZap />
                        </div>
                    </div>
                    <div className="flex-3 cursor-pointer" onClick={()=>{
                        setId(bookmark.id)
                        openConfirmDeleteModal()
                    }} >
                        <X />
                    </div>
                </li>
            ))}
            <ConfirmDeleteModalWrapper>
                <DeleteModal 
                    name="Bookmark"
                    type="Bookmark"
                    id={id}
                    closeModal={closeConfirmDeleteModal}
                    refetch={refetchBookmarks}
                    deleteFunc={(id)=>deleteBookmark(id)}
                />
            </ConfirmDeleteModalWrapper>
            <HTMLViewModalWrapper>
                <HTMLViewModal 
                    id={id}
                />
            </HTMLViewModalWrapper>
        </ul>
    );
};

export default ListView;
