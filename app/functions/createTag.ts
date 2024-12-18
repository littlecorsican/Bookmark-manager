import { API } from "@/utils/API";

export async function createTag({ name }: { name: string }) {
    try {

        // check if tag of that name exist first
        const response_check_name = await fetch(`${API.tag}\\${name.toLocaleLowerCase()}`)
        const response_check_name_json = response_check_name.json()
        const statusCode = response_check_name.status;
        console.log("response_check_name", response_check_name, response_check_name_json, statusCode)

        if (statusCode !== 404) {
            throw new Error("Tag with that name alredy created");
        }

        // if no, proceed to create tag

        const response = await fetch(API.tags, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData?.message || "Failed to create tag");
        }

        const response_json = await response.json();

        return response_json;
    } catch (e: unknown) {
        if (e instanceof Error) {
            console.error("Error creating tag:", e.message);
            throw new Error(`Error creating tag: ${e.message}`);
        } else {
            console.error("Unknown error occurred:", e);
            throw new Error("Unknown error occurred while creating tag");
        }
    }
}
