import { useState, useEffect } from "react";
import { getBookmark } from "@/functions/getBookmark";

export default function HTMLViewModal({
    id
}: {
    id: number,
}) {
    const [bookmarkHTML, setBookmarkHTML] = useState("");

    useEffect(() => {
        if (id) {
            const fetchBookmark = async () => {
                const resp = await getBookmark(id);
                setBookmarkHTML(resp.data.html);
            }
            fetchBookmark();
        }
    }, [id]);

    return (
        <>
            <div
                dangerouslySetInnerHTML={{ __html: bookmarkHTML }}
            />
        </>
    );
}
