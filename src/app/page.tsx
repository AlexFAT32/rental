import Image from "next/image";
import {ClientOnly} from "@/app/components/client-only";
import {Container} from "@/app/components/container";
import {EmptyState} from "@/app/components/empty-state";
import getListings from "@/app/actions/getListings";
import {ListingCard} from "@/app/components/listings/listing-card";
import getCurrentUser from "@/app/actions/getCurrentUser";
import {SafeListing} from "@/app/types";

export default async function Home() {
  const listings = await getListings()
  const currentUser = await getCurrentUser()


  if(listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No favorites found"
          subtitle="Looks like you have no favorites listings."
          showReset
        />
      </ClientOnly>
    )
  }
  return (
    <ClientOnly >
      <Container>
        <div
          className="
            pt-8
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
          { listings.map((listing) => (
            <ListingCard
              currentUser={currentUser}
              key={listing.id}
              data={listing}
            />
          ))}
        </div>
      </Container>
    </ClientOnly>
  );
}
