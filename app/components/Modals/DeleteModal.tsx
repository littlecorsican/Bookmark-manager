import Button from "../Shared/Button"
import { useRef, useContext, useEffect } from "react"
import { GlobalContext } from "@/context/GlobalContext"

export default function DeleteModal({
    name,
    type,
    id,
    closeModal,
    refetch,
    deleteFunc
}: {
    name: string,
    type: string,
    id: number,
    closeModal: ()=> void,
    refetch: ()=> void,
    deleteFunc: (id)=>void
}) {

    const titleRef = useRef<HTMLInputElement>(null);
    const context = useContext(GlobalContext);

    useEffect(() => {
        titleRef.current?.focus();
    }, []);

    async function formSubmit() {
        try {
            context?.setLoading(true)
            await deleteFunc({ id })
            context?.toast(`Deleted ${type} ${name}`)
        } catch (e: unknown) {
            context?.toast(`Failed to delet ${type}`)
        } finally {
            refetch()
            context?.setLoading(false)
            closeModal()
        }
        
    }

    return <>
        <h2 className="text-xl font-semibold">Confirm Delete {type}?</h2>
        <p className="mt-2">Are you sure you want to delete {name}?</p>
        <Button
            type="button"
            className="bg-green-700 text-white"
            onClick={formSubmit}
        >
            Yes
        </Button>
        <Button
            type="button"
            className="bg-red-500 text-white"
            onClick={closeModal}
        >
            No
        </Button>
    </>
}