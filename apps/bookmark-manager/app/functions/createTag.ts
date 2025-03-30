import { API } from "@/utils/API";

export async function createTag({ name }: { name: string }) {
    try {

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
