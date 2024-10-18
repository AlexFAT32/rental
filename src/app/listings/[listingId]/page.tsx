import getListingById from "@/app/actions/getListingById";
import {ClientOnly} from "@/app/components/client-only";
import {EmptyState} from "@/app/components/empty-state";
import getCurrentUser from "@/app/actions/getCurrentUser";
import {ListingClient} from "@/app/listings/[listingId]/listing-client";
import getReservations from "@/app/actions/getReservations";

interface IParams {
  listingId?: string
}

const ListingPage = async ({params}: {params: IParams}) => {
  const listing = await getListingById(params)
  const reservations = await getReservations({listingId: params.listingId})
  const currentUser = await getCurrentUser()


  if(!listing || !currentUser) {
    return (
      <ClientOnly>
        <EmptyState
          title="No listing found"
          subtitle="Looks like you have not created a listing yet."
        />
      </ClientOnly>
    )
  }
  return (
    <ClientOnly>
      <ListingClient
        listing={listing}
        currentUser={currentUser}
        reservations={reservations}
      />
    </ClientOnly>
  )
}

export default ListingPage
