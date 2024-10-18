'use client'

import React, {useCallback, useMemo} from "react";
import {Listing, Reservation} from "@prisma/client";
import {SafeListing, SafeReservation, SafeUser} from "@/app/types";
import {useRouter} from "next/navigation";
import useCountries from "@/app/hooks/useCountries";
import {Button} from "@/app/components/button";
import {format} from "date-fns";
import Image from "next/image";
import {HeartButton} from "@/app/components/heart-button";


interface ListingCardProps {
  data: SafeListing
  reservation?: SafeReservation
  onAction?: (id: string) => void
  disabled?: boolean
  actionLabel?: string
  actionId?: string
  currentUser?: SafeUser | null
}
export const ListingCard = ({ data, reservation, onAction, disabled, actionLabel, actionId = "", currentUser }: ListingCardProps) => {
  const router = useRouter()
  const { getByValue } = useCountries()

  const location = getByValue(data.locationValue)

  const handleCancel = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()

    if(disabled){
      return
    }

    onAction?.(actionId)

  }, [onAction, actionId, disabled])

  const price = useMemo(() => {
    if (!reservation) {
      return data.price
    }
    return reservation.totalPrice
  }, [])

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null
    }

    const start = new Date(reservation.startDate)
    const end = new Date(reservation.endDate)

    return `${format(start, 'PP')} - ${format(end, 'PP')}`
  }, [reservation])

  return (
    <div
      onClick={() => router.push(`/listings/${data.id}`)}
      className="col-span-1 cursor-pointer group"
    >
      <div
        className="
          flex
          flex-col
          gap-2
          w-full
          h-full
        "
      >
        <div
          className="
            aspect-square
            w-full
            relative
            overflow-hidden
            rounded-xl
          "
        >
          <Image
            fill
            alt="Listing"
            src={data.imageSrc}
            className="
              object-cover
              h-full
              w-full
              group-hover:scale-110
              transition
            "
          />
          <div
            className="
              absolute
              top-3
              right-3
            "
          >
          <HeartButton
            listingId={data.id}
            currentUser={currentUser}
          />
          </div>
        </div>
        <div
          className="
            font-semibold
            text-lg
            truncate
            text-gray-800
          "
        >
          {location?.region}, {location?.label}
        </div>
        <div
          className="
            font-light
            text-neutral-500
          "
        >
          {reservationDate || data.category}
        </div>
        <div
          className="
            flex
            flex-row
            items-center
            gap-1
          "
        >
          <div
            className="
              font-semibold
              text-neutral-800
            "
          >
            $ {price}
          </div>
          {!reservation && (
            <div
              className="
                font-light
                flex
                flex-row
                items-center
                gap-1
              "
            >
              <div
                className="
                  text-neutral-600
                "
              >
                night
              </div>
            </div>
          )}
        </div>
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  )
}
