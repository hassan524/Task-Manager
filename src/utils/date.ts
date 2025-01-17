export function getCurrentDate() {
    const now = new Date();
  
    const month = now.getMonth() + 1; 
    const day = now.getDate();
    const year = now.getFullYear();
  
    let hours = now.getHours();
    const ampm = hours >= 12 ? 'pm' : 'am';
  
    hours = hours % 12 || 12; 
  
    return `Created At ${day}/${month}/${year} at ${hours}${ampm}`;
  }
  