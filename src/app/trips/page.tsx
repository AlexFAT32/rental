import { EmptyState } from "@/app/components/empty-state";
import { ClientOnly } from "@/app/components/client-only";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getReservations from "@/app/actions/getReservations";
import {TripsClient} from "@/app/trips/trips-client";

export type TripClientProps = {

}


const TripsPage= async () => {
  const currentUser = await getCurrentUser()

  if(!currentUser) {
    return (
      <ClientOnly>
        <EmptyState
          title="Unauthorized"
          subtitle="Please login"
        />
      </ClientOnly>
    )
  }

  const reservations = await getReservations({userId: currentUser.id})

  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No trips found"
          subtitle="Looks like you havent reserved any trips"
        />
      </ClientOnly>
    )
  }


  return (
    <ClientOnly>
      <TripsClient
        reservations={reservations}
        currentUser={currentUser}
      />
    </ClientOnly>
  )
}


export default TripsPage
