'use client'

import {SafeReservation, SafeUser} from "@/app/types";
import {FC, useCallback, useState} from "react";
import {Container} from "@/app/components/container";
import {Heading} from "@/app/components/heading";
import {useRouter} from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import {ListingCard} from "@/app/components/listings/listing-card";

export type TripsClientProps = {
  reservations: SafeReservation[],
  currentUser: SafeUser
}

export const TripsClient: FC<TripsClientProps> = ({
  reservations,
  currentUser
}: any) => {

  const router = useRouter()
  const [deletingId, setDeletingId] = useState('')

  const onCancel = useCallback((id: string) => {
    setDeletingId('')

    axios.delete(`/api/reservations/${id}`)
      .then(() => {
        toast.success('Reservation cancelled')
        router.refresh()
      })
      .catch(() => {
        toast.error('Something went wrong')
      })
      .finally(() => {
        setDeletingId('')
      })
  }, [])

  return (
    <Container>
      <div className="
        pt-4
      ">
        <Heading
          title="Trips"
          subtitle="Where you've been and where you're going"
        />
        <div
          className="
          mt-10
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
        "
        >

          {reservations.map((reservation: any) => (
            <ListingCard
              key={reservation.id}
              data={reservation.listing}
              reservation={reservation}
              actionId={reservation.id}
              onAction={onCancel}
              disabled={deletingId === reservation.id}
              actionLabel="Cancel reservation"
              currentUser={currentUser}
            />
          ))}

        </div>
      </div>
    </Container>
  )
}
