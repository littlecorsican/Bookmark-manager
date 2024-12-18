import Button from "../Shared/Button"
import TextInput from "../Shared/TextInput"
import Textarea from "../Shared/Textarea"
import { createTag } from "@/functions/createTag"
import { useRef, useContext, useEffect } from "react"
import { GlobalContext } from "@/context/GlobalContext"
import { TagsProps } from "@/types/types"

export default function AddTagModal({
    closeAddTagModal,
    refetchTags,
}: {
    closeAddTagModal: ()=> void
    refetchTags: ()=> TagsProps
}) {

    const titleRef = useRef<HTMLInputElement>(null);
    const context = useContext(GlobalContext);

    useEffect(() => {
        titleRef.current?.focus();
    }, []);

    async function formSubmit() {
        try {
            if (!titleRef.current?.value) return
            context?.setLoading(true)
            await createTag({
                name: titleRef?.current?.value
            })
            context?.toast(`Created tag ${titleRef?.current?.value}`)
        } catch (e: unknown) {
            context?.toast(`Failed to create tag`)
        } finally {
            refetchTags()
            context?.setLoading(false)
            closeAddTagModal()
        }
        
    }

    return <>
    <h2 className="text-xl font-semibold">Create New Bookmark</h2>
        <p className="mt-2"></p>
        <TextInput
            id="title"
            placeholder="Please input title"
            label="Title"
            ref={titleRef}
        />
        <Button
            type="submit"
            className="bg-blue-700 text-white"
            onClick={formSubmit}
        >
            Create Tag
        </Button>
    </>
}