import React, { ReactNode } from "react";

export interface TagProps {
    id: string;   
    name: string;
}

export interface TagsProps {
    data: TagProps[]
}

export interface TagComponentProps{
    name: string;
    onClick: ()=> void;
    showDelete: boolean;
}  

export interface BookmarkProps {
    id: number,
    title: string;
    description: string;
    url: string;
    count: number;
    last_visited: Date;
    tags: TagProps[]
}
  
export interface BookmarkListProps {
    data: BookmarkProps[],
    currentPage: number,
    totalPages: number,
    totalItems: number
}

export interface GlobalContextType {
    loading: boolean;
    setLoading: (loading: boolean) => void;
    toast: (text: string) => void;
    tags: TagProps[],
    isTagsLoading: boolean,
    isErrorLoading: boolean,
    refetchTags: ()=> void  
}

export type ViewTypes = "List" | "Card";

export interface SearchBarProps {
    setFilterText: React.Dispatch<React.SetStateAction<string>>;
}
  
export interface TopBarProps {
  children?: React.ReactNode;
}

export interface UseModalType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  toggleModal: () => void;
  Modal: React.FC<ModalProps>;
}

export interface ModalProps {
  children: ReactNode;
}

export interface RootLayoutProps {
  children: ReactNode;
}

export interface ListViewProps {
    bookmarks: BookmarkProps[];
    handleTransitionEnd: (e: React.TransitionEvent) => void;
    handleTransitionStart: (e: React.TransitionEvent) => void;
    view: string,
    refetchBookmarks: ()=> void
}

export interface CardViewProps {
    bookmarks: BookmarkProps[];
    handleTransitionEnd: (e: React.TransitionEvent) => void;
    handleTransitionStart: (e: React.TransitionEvent) => void;
    view: string;
    refetchBookmarks: ()=> void
}