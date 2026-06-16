"use client";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  count?: number;
}

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search...",
  count,
}: SearchBarProps) {
  return (
    <div className="relative">
      {/* Search icon */}
      <svg
        className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-valo-muted pointer-events-none"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <circle cx={11} cy={11} r={8} />
        <path d="m21 21-4.35-4.35" strokeLinecap="round" />
      </svg>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full cut-tr-sm border border-valo-border bg-valo-surface pl-10 pr-4 py-2.5 font-body text-sm text-valo-text placeholder-valo-muted focus:border-valo-red/50 focus:outline-none transition-colors"
      />

      {count !== undefined && value && (
        <span className="absolute right-3.5 top-1/2 -translate-y-1/2 font-mono text-xs text-valo-muted">
          {count}
        </span>
      )}
    </div>
  );
}
