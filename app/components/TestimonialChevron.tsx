"use client";

export default function TestimonialChevron({
  direction,
  label,
  disabled,
  onClick,
  className,
}: {
  direction: "left" | "right";
  label: string;
  disabled: boolean;
  onClick: () => void;
  className: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className={`absolute top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center text-[#750000] transition-opacity hover:text-[#5B0706] disabled:cursor-default disabled:opacity-30 disabled:hover:text-[#750000] ${className}`}
    >
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <path
          d={direction === "left" ? "M13.5 5.5 8 11l5.5 5.5" : "M8.5 5.5 14 11l-5.5 5.5"}
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
