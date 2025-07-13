import Button from "../Shared/Button"
import TextInput from "../Shared/TextInput"
import Textarea from "../Shared/Textarea"
import { createBookmark } from "@/functions/createBookmark"
import { useState, useRef, useContext, useEffect } from "react"
import { GlobalContext } from "../Client"
import Dropdown from "../Shared/Dropdown"
import { useTags } from "@/hooks/useTags";
import Tag from "../Tag"
import { TagProps } from "@/types/types"
import { API } from "@/utils/API";
import { CirclePlus } from 'lucide-react';
import { createTag } from "@/functions/createTag"
import { getClipboardText } from "@/utils/clipboard"


export default function AddBookmarkModal({
    closeAddBookmarkModal,
    refetchBookmarks,
    refetchTags
}: {
    closeAddBookmarkModal: ()=> void
    refetchBookmarks: ()=> TagsProps
    refetchTags: ()=> void
}) {

    const titleRef = useRef<HTMLInputElement>(null);
    const urlRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);
    const context = useContext(GlobalContext);
    const [selectedTags, setSelectedTags] = useState([])
    const [clipboardText, setClipboardText] = useState<string>("");

    const { tags, isLoading: isTagsLoading, isError: isErrorLoading } = useTags();

    useEffect(() => {
        titleRef.current?.focus();
    }, []);

    async function formSubmit() {
        try {
          if (!urlRef.current?.value) return;
          context?.setLoading(true);
      
          const response = await fetch(API.bookmark, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
              title: titleRef?.current?.value,
              description: descriptionRef?.current?.value || "",
              url: urlRef?.current?.value,
              tags: selectedTags,
            }),
          });
      
          if (!response.ok) {
            const errorMessage = await response.json();
            throw new Error(`${errorMessage?.error}`);
          }

          refetchBookmarks()
          refetchTags()
          context?.toast(`Created bookmark ${titleRef?.current?.value}`);
        } catch (e: unknown) {
          context?.toast(`Failed to create bookmark, ${e}`);
          throw e;
        } finally {
          refetchBookmarks();
          context?.setLoading(false);
          closeAddBookmarkModal();
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

    const createNewTag = async(e) => {
        console.log("adcreateNewTagfadf")
        if (e.key === "Enter") {
            try {
                if (!e.target.value) return
                context?.setLoading(true)
                await createTag({
                    name: e.target.value
                })
                context?.toast(`Created tag ${e.target.value}`)
            } catch (e: unknown) {
                context?.toast(`Failed to create tag, ${e}`)
            } finally {
                refetchTags()
                context?.setLoading(false)
            }
        }
    };
      

    useEffect(() => {
        async function clipboardText() {
            const text = await getClipboardText();
            setClipboardText(text);
        }

        clipboardText();
    }, []);

      

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
            defaultValue={clipboardText}
        />
        <div className="text-red-500 text-xs px-4">If http:// or https:// is not added on the link, it will be assumed to be https://</div>
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
        <div className="flex">
        {isTagsLoading ? <h2>Tags Loading</h2> : <Dropdown 
            buttonLabel="Tags"
            items={tags.data}
            keyLabel="name"
            onItemClick={onDropDownClick}
        />}
        <TextInput id="new_tag" placeholder="insert new tag name here" label="" onKeyDown={createNewTag} />
        </div>
        {isErrorLoading && <h2>Error loading tags</h2>}
        <Button
            type="submit"
            className="bg-blue-700 text-white"
            onClick={formSubmit}
            tooltip="Create Bookmark"
        >
            <CirclePlus />
        </Button>
    </>
}