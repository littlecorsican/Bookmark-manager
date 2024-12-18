import Button from "../Shared/Button"
import TextInput from "../Shared/TextInput"
import Textarea from "../Shared/Textarea"
import { createBookmark } from "@/functions/createBookmark"
import { useState, useRef, useContext, useEffect } from "react"
import { GlobalContext } from "@/context/GlobalContext"
import Dropdown from "../Shared/Dropdown"
import { useTags } from "@/hooks/useTags";
import Tag from "../Tag"
import { TagProps } from "@/types/types"


export default function AddBookmarkModal({
    closeAddBookmarkModal,
    refetchBookmarks,
}: {
    closeAddBookmarkModal: ()=> void
    refetchBookmarks: ()=> TagsProps
}) {

    const titleRef = useRef<HTMLInputElement>(null);
    const urlRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);
    const context = useContext(GlobalContext);
    const [selectedTags, setSelectedTags] = useState([])

    const { tags, isLoading: isTagsLoading, isError: isErrorLoading } = useTags();

    useEffect(() => {
        titleRef.current?.focus();
    }, []);

    async function formSubmit() {
        try {
            if (!urlRef.current?.value) return
            context?.setLoading(true)
            await createBookmark({
                title: titleRef?.current?.value,
                url: urlRef?.current?.value,
                description: descriptionRef?.current?.value || "",
                tags: selectedTags
            })
            context?.toast(`Created bookmark ${titleRef?.current?.value}`)
        } catch (e: unknown) {
            context?.toast(`Failed to create bookmark, ${e}`)
        } finally {
            refetchBookmarks()
            context?.setLoading(false)
            closeAddBookmarkModal()
        }
        
    }

    function onDropDownClick(newTag: TagProps) {
        // check if tag already exists
        if (selectedTags.find((tag: TagProps)=>tag.id === newTag.id)) return
        setSelectedTags([...selectedTags, newTag])
    }

    const removeTagById = (id) => {
        setSelectedTags((prevSelectedTags) =>
          prevSelectedTags.filter(tag => tag.id !== id)
        );
    };
      

    return <>
        <h2 className="text-xl font-semibold">Create New Bookmark</h2>
        <p className="mt-2"></p>
        <TextInput
            id="title"
            placeholder="Please input title"
            label="Title"
            ref={titleRef}
        />
        <TextInput
            id="url"
            placeholder="http://"
            label="URL"
            ref={urlRef}
        />
        <Textarea 
            id="description"
            placeholder="Enter description here (optional)"
            label="Description"
            ref={descriptionRef}
        />
        <div className="">
            {
                selectedTags && selectedTags.map((tag: TagProps)=>{
                    return <Tag
                        key={`tagId_${tag.id}`}
                        {...tag}
                        onClick={()=>removeTagById(tag.id)}
                    />
                })
            }
        </div>
        {isTagsLoading ? <h2>Tags Loading</h2> : <Dropdown 
            buttonLabel="Tags"
            items={tags.data}
            keyLabel="name"
            onItemClick={onDropDownClick}
        />}
        {isErrorLoading && <h2>Error loading tags</h2>}
        <Button
            type="submit"
            className="bg-blue-700 text-white"
            onClick={formSubmit}
        >
            Create Bookmark
        </Button>
    </>
}