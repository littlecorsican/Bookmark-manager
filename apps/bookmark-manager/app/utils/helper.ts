import { API } from "./API";
import { BookmarkProps } from "@/types/types";

export function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
  

export async function getTitleAndHTML(url: string) {
  try {
    const response = await fetch(url);
    const htmlContent = await response.text();
    
    // Use regex to extract the title from the HTML.
    const titleMatch = htmlContent.match(/<title>(.*?)<\/title>/i);
    const title = titleMatch ? titleMatch[1] : "";
    console.log("Extracted title:", title);

    return {
      title,
      html: htmlContent,
    }
  } catch (error) {
    console.error("error", error);
    return {
      title: "",
      html: "",
    }
  }
  
}

export const openUrl = (url: string, id: number) => {
  window.open(url, "_blank", "noopener,noreferrer");

  fetch(`${API.analytic}/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).catch((error) => {
    console.error("Failed to send analytics:", error);
  });
};

export const exportBookmarks = async (bookmarks: BookmarkProps[]) => {
  try {
    const csvContent = [
      ['Title', 'URL', 'Description', 'Tags', 'Visit Count', 'Last Visited'],
      ...bookmarks.map(bookmark => [
        bookmark.title,
        bookmark.url,
        bookmark.description || '',
        bookmark.tags.map(tag => tag.name).join(', '),
        bookmark.count.toString(),
        bookmark.last_visited ? new Date(bookmark.last_visited).toISOString() : ''
      ])
    ].map(row => row.map(field => `"${field.replace(/"/g, '""')}"`).join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `bookmarks_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Failed to export bookmarks:", error);
    throw new Error("Failed to export bookmarks");
  }
};

export const importBookmarks = () => {
  return new Promise<BookmarkProps[]>((resolve, reject) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv';
    
    input.onchange = async (event) => {
      try {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (!file) {
          reject(new Error("No file selected"));
          return;
        }

        const text = await file.text();
        const lines = text.split('\n');
        const headers = lines[0].split(',').map(h => h.replace(/"/g, '').trim());
        
        const bookmarks: BookmarkProps[] = lines.slice(1).map((line, index) => {
          const values = line.split(',').map(v => v.replace(/"/g, '').trim());
          return {
            id: index + 1, // Temporary ID
            title: values[0] || '',
            url: values[1] || '',
            description: values[2] || '',
            tags: values[3] ? values[3].split(',').map(name => ({ id: name.trim(), name: name.trim() })) : [],
            count: parseInt(values[4]) || 0,
            last_visited: values[5] ? new Date(values[5]) : new Date()
          };
        });

        resolve(bookmarks);
      } catch (error) {
        reject(error);
      }
    };

    input.click();
  });
};