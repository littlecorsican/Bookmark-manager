import React, { useState } from 'react';
import { BookmarkProps } from '@/types/types';
import { X } from 'lucide-react';
import { useModal } from "../hooks/useModal";
// import ConfirmDeleteModal from './Modals/ConfirmDeleteModal';
import DeleteModal from './Modals/DeleteModal';
import { openUrl } from '@/utils/helper';
import { deleteBookmark } from '@/functions/deleteBookmark';
import { CardViewProps } from '@/types/types';
import { DatabaseZap } from 'lucide-react';
import HTMLViewModal from './Modals/HTMLViewModal';

const CardView: React.FC<CardViewProps> = ({
    bookmarks,
    handleTransitionEnd,
    handleTransitionStart,
    refetchBookmarks,
    view
}) => {
    const { openModal:openConfirmDeleteModal, Modal:ConfirmDeleteModalWrapper, closeModal:closeConfirmDeleteModal } = useModal();
    const { openModal:openHTMLViewModal, Modal:HTMLViewModalWrapper } = useModal("w-[90vw] h-[90vh] overflow-scroll");
    const [id, setId] = useState(null)

    return (
        <div id="card-container" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {bookmarks && bookmarks.map((bookmark: BookmarkProps, index: number) => (
            <div
                key={index}
                className={`bg-white p-4 relative rounded-lg shadow-md hover:shadow-xl transition duration-300 transform hover:scale-105 animate-fade removed ${view === "Card" ? "animate-fade-enter" : "animate-fade-exit"}`}
                onTransitionEnd={(e)=>handleTransitionEnd(e)}
                onTransitionStart={(e)=>handleTransitionStart(e)}
            >
                <h2 className="text-xl font-semibold text-gray-800 mt-4">
                    <div
                        onClick={()=>openUrl(bookmark.url, bookmark.id)}
                        className="text-blue-700 font-medium cursor-pointer"
                    >
                        <div className="text-2xl">{bookmark.title}</div>
                        <div>{bookmark.url}</div>
                    </div>
                </h2>
                <div className="italic">
                    {bookmark.description}
                </div>
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
                <div className="absolute top-2 right-2 cursor-pointer hover:scale-105 cursor-pointer" onClick={()=>{
                    setId(bookmark.id)
                    openConfirmDeleteModal()
                }} >
                    <X />
                </div>
            </div>
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
        </div>
    );
};

export default CardView;
