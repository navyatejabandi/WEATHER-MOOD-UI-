export function formatCurrentTime(date: Date = new Date()): string {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
}

export function formatShortDate(date: Date = new Date()): string {
  return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
}

export function formatFullDate(date: Date = new Date()): string {
  return date.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}

export function formatCurrentMonthYear(date: Date = new Date()): string {
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

export function getRelativeOrFormattedDate(timestamp: string): string {
  const d = new Date(timestamp);
  const now = new Date();
  
  const isToday =
    d.getDate() === now.getDate() &&
    d.getMonth() === now.getMonth() &&
    d.getFullYear() === now.getFullYear();

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const isYesterday =
    d.getDate() === yesterday.getDate() &&
    d.getMonth() === yesterday.getMonth() &&
    d.getFullYear() === yesterday.getFullYear();

  const timeStr = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

  if (isToday) {
    return `Today | ${timeStr}`;
  } else if (isYesterday) {
    return `Yesterday | ${timeStr}`;
  }
  return `${formatShortDate(d)} | ${timeStr}`;
}
