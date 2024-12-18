import React, { useState } from 'react';
import { BookmarkListProps, BookmarkProps } from '@/types/types';
import { X } from 'lucide-react';
import { useModal } from "../hooks/useModal";
import ConfirmDeleteModal from './Modals/ConfirmDeleteModal';

interface CardViewProps {
    bookmarks: BookmarkProps[];
    handleTransitionEnd: (e: React.TransitionEvent) => void;
    handleTransitionStart: (e: React.TransitionEvent) => void;
    view: string;
    refetchBookmarks: ()=> void
}

const CardView: React.FC<CardViewProps> = ({
    bookmarks,
    handleTransitionEnd,
    handleTransitionStart,
    refetchBookmarks,
    view
}) => {
    const { openModal:openConfirmDeleteModal, Modal:ConfirmDeleteModalWrapper, closeModal:closeConfirmDeleteModal } = useModal();
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
                    <a
                        href={bookmark.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-700 font-medium"
                    >
                        <div className="text-2xl">{bookmark.title}</div>
                        <div>{bookmark.url}</div>
                    </a>
                </h2>
                <div className="italic">
                    {bookmark.description}
                </div>
                <div>
                    Last Visited: {bookmark?.last_visited?.toDateString() || ""}
                </div>
                <div>
                    Visits: {bookmark.count}
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
                <ConfirmDeleteModal 
                    closeConfirmDeleteModal={closeConfirmDeleteModal}
                    refetchBookmarks={refetchBookmarks}
                    id={id}
                />
            </ConfirmDeleteModalWrapper>
        </div>
    );
};

export default CardView;
