'use client'
interface ListingCategoryProps {
  icon: any
  label: string
  description: string
}

export const ListingCategory = ({icon: Icon, label, description}: ListingCategoryProps) => {
  return (
    <div
      className="
        flex
        flex-col
        gap-6
      "
    >
      <div
        className="
          flex
          flex-row
          items-center
          gap-4
        "
      >
        <Icon size={40} className="text-neutral-600" />
        <div
          className="flex flex-col"
        >
          <div
            className="
              text-lg
              font-semibold
              text-neutral-800
            "
          >
            {label}
          </div>
          <div
            className="
              font-light
              text-neutral-500
            "
          >
            {description}
          </div>
        </div>
      </div>
    </div>
  )
}
