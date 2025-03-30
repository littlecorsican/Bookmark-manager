import Button from "../Shared/Button"
import TextInput from "../Shared/TextInput"
import Textarea from "../Shared/Textarea"
import { createTag } from "@/functions/createTag"
import { useRef, useContext, useEffect } from "react"
import { GlobalContext } from "../Client"
import { TagsProps } from "@/types/types"
import { CirclePlus } from 'lucide-react';

export default function AddTagModal({
    closeAddTagModal,
}: {
    closeAddTagModal: ()=> void
}) {

    const titleRef = useRef<HTMLInputElement>(null);
    const context = useContext(GlobalContext);

    useEffect(() => {
        titleRef.current?.focus();
    }, []);

    async function formSubmit() {
        try {
            const tagName = titleRef.current?.value
            if (!tagName) return
            context?.setLoading(true)
            await createTag({
                name: tagName
            })
            context?.toast(`Created tag ${tagName}`)
        } catch (e: unknown) {
            context?.toast(`Failed to create tag, ${e}`)
        } finally {
            context?.refetchTags()
            context?.setLoading(false)
            closeAddTagModal()
        }
        
    }

    return <>
    <h2 className="text-xl font-semibold">Create New Tag</h2>
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
            tooltip="Create Tag"
        >
            <CirclePlus />
        </Button>
    </>
}