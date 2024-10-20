'use client';

export interface MenuItemProps {
  onClick: () => void
  label: string
}
export const MenuItem = ({onClick, label}: MenuItemProps) => {
  return (
    <div
      onClick={onClick}
      className="
        px-4
        py-3
        hover:bg-neutral-100
        transition
        font-semibold
      "
    >
      {label}
    </div>
  )
}
