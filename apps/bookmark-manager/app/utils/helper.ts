import { API } from "./API";

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


export const exportBookmarks=()=>{
  fetch(`${API.analytic}/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).catch((error) => {
    console.error("Failed to send analytics:", error);
  });
}

export const importBookmarks=()=>{
  fetch(`${API.analytic}/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).catch((error) => {
    console.error("Failed to send analytics:", error);
  });
}