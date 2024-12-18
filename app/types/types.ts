export interface TagProps {
    id: string;   
    name: string;
}

export interface TagsProps {
    data: TagProps[]
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