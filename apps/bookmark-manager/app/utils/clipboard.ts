import { isValidLink } from "./helper";


export const getClipboardText = async (): Promise<string> => {
    try {
        const text = await navigator.clipboard.readText();
        if (isValidLink(text)) return text;
        return ""
    } catch (error) {
        console.error("Failed to read clipboard contents: ", error);
        return "";
    }
}