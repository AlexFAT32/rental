'use client'
import {SafeUser} from "@/app/types";
import useCountries from "@/app/hooks/useCountries";
import {HeartButton} from "@/app/components/heart-button";
import {Heading} from "@/app/components/heading";
import Image from "next/image";

interface ListingHeadProps {
  title: string
  imageSrc: string
  locationValue: string
  id: string
  currentUser?: SafeUser | null
}

export const ListingHead = ({
  title,
  imageSrc,
  locationValue,
  id,
  currentUser
}: ListingHeadProps) => {
  const { getByValue } = useCountries()
  const location = getByValue(locationValue)

  return (
    <>
      <Heading title={title} subtitle={`${location?.region}, ${location?.label}`} />
      <div
        className="
          w-full
          h-[60vh]
          overflow-hidden
          rounded-xl
          relative
        "
      >
        <Image
          alt="Image"
          src={imageSrc}
          fill
          className="
            object-cover
            w-full
            h-full
          "
        />
        <div
          className="
            absolute
            top-5
            right-5
          "
        >
          <HeartButton
            listingId={id}
            currentUser={currentUser}
          />
        </div>
      </div>

    </>
  )
}
