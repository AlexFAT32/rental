import {Container} from "@/app/components/container";

'use-client'
import {SafeListing, SafeUser} from "@/app/types";
import {Heading} from "@/app/components/heading";
import {ListingCard} from "@/app/components/listings/listing-card";

export type FavoriteClientProps = {
  listings: SafeListing[]
  currentUser: SafeUser
}

export const FavoritesClient = ({listings, currentUser}: FavoriteClientProps) => {


  return (
    <Container>
      <Heading
        title="Favorites"
        subtitle="List of places you have favorited"
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
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            currentUser={currentUser}
            data={listing}
          />
        ))}
      </div>
    </Container>
  )

}
