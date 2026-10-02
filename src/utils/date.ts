import { format, parseISO } from 'date-fns';

export function formatDate(iso: string): string {
  return format(parseISO(iso), 'MMM d, yyyy');
}