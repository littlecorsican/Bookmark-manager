import Button from "../Shared/Button"
import { createTag } from "@/functions/createTag"
import { useRef, useContext, useEffect } from "react"
import { GlobalContext } from "@/context/GlobalContext"
import { TagsProps } from "@/types/types"
import { deleteBookmark } from "@/functions/deleteBookmark"

export default function ConfirmDeleteModal({
    closeConfirmDeleteModal,
    refetchBookmarks,
    id
}: {
    closeConfirmDeleteModal: ()=> void
    openConfirmDeleteModal: ()=> void
    refetchBookmarks: ()=> TagsProps
    id: number
}) {

    const titleRef = useRef<HTMLInputElement>(null);
    const context = useContext(GlobalContext);

    useEffect(() => {
        titleRef.current?.focus();
    }, []);

    async function formSubmit() {
        try {
            context?.setLoading(true)
            await deleteBookmark({
                id
            })
            context?.toast(`Deleted Bookmark `)
        } catch (e: unknown) {
            context?.toast(`Failed to create Bookmark`)
        } finally {
            refetchBookmarks()
            context?.setLoading(false)
            closeConfirmDeleteModal()
        }
        
    }

    return <>
    <h2 className="text-xl font-semibold">Confirm Delete Bookmark?</h2>
        <p className="mt-2"></p>
        <div className="flex justify-evenly">
            <Button
                type="submit"
                className="bg-blue-700 text-white"
                onClick={formSubmit}
            >
                Yes
            </Button>
            <Button
                type="submit"
                className="bg-blue-700 text-white"
                onClick={closeConfirmDeleteModal}
            >
                No
            </Button>
        </div>
    </>
}