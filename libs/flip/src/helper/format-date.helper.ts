/**
 * 
 * @returns formatted date YYYY-MM-DD HH:mm 
 */
export function formatDate(date: Date): string{
  const pad = (num: number): string => num.toString().padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
};