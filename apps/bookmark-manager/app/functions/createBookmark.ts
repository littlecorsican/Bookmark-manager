import { API } from "@/utils/API";
import { TagProps } from "@/types/types";

export async function createBookmark(
    { 
        title,
        description,
        url,
        tags
    }:
    { 
        title: string,
        description: string,
        url: string,
        tags: TagProps[]
    }
) {
    try {

        /**
         * TODO
         * zod parse
         * get title from link
         * 
         */

        // CHECK IF BOOKMARK WITH THAT URL ALREADY EXISTS

        const response_check_url = await fetch(`${API.bookmark}`,
            {
                method: "POST",
                body: JSON.stringify({
                    url: url.toLocaleLowerCase()
                })
            }
        )
        // const response_check_url_json = response_check_url.json()
        const statusCode = response_check_url.status;
        console.log("statusCode", statusCode)

        if (statusCode !== 404) {
            throw new Error("Bookmark with that url alredy created");
        }


        // find its title if did not input
        let newTitle = title
        if (newTitle === "") {
            const response = await fetch(API.title,
                {
                    method: "POST",
                    body: JSON.stringify({
                        url
                    })
                }
            )
            if (!response.ok) throw new Error("Failed to create bookmark");
            const response2 = await response.json()
            newTitle = response2.title
        }


        const response = await fetch(API.bookmarks, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
                title: newTitle,
                description,
                url,
                tags
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData?.message || "Failed to create bookmark");
        }

        const response_json = await response.json();

        return response_json;
    } catch (e: unknown) {
        if (e instanceof Error) {
            console.error("Error creating bookmark:", e.message);
            throw new Error(`Error creating bookmark: ${e.message}`);
        } else {
            console.error("Unknown error occurred:", e);
            throw new Error("Unknown error occurred while creating bookmark");
        }
    }
}
