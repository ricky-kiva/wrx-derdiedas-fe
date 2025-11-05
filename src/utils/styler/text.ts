export function formatDisplayUsername(name: string): string {
  const parts = name
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (parts.length === 0) return '';

  const first = parts[0];
  const rest = parts.slice(1);

  const firstFormatted =
    first.length > 8
      ? `${first.slice(0, 7)}.,`
      : `${first.charAt(0).toUpperCase()}${first.slice(1)}`;

  if (rest.length === 0) return firstFormatted;

  const initials = rest.map((w) => w.charAt(0).toUpperCase()).join('');

  return `${firstFormatted} ${initials}.`;
}
