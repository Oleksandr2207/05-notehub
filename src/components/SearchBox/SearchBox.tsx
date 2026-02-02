export default function SearchBox({ onSearch }: { onSearch: (v: string) => void }) {
  return (
    <input
      className="input"
      type="text"
      placeholder="Search notes"
      onChange={(e) => onSearch(e.target.value)}
    />
  );
}