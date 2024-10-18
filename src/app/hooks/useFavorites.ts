import {SafeUser} from "@/app/types";
import {useRouter} from "next/navigation";
import useLoginModal from "@/app/hooks/useLoginModal";
import React, {useCallback, useMemo} from "react";
import axios from "axios";
import toast from "react-hot-toast";


interface IUseFavorites {
  listingId: string
  currentUser?: SafeUser | null

}

const useFavorites = ({listingId, currentUser}: IUseFavorites) => {
  const router = useRouter()
  const loginModal = useLoginModal()

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || []
    return list.includes(listingId)
  }, [currentUser, listingId])

  const toggleFavorite = useCallback(async (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    e.stopPropagation()

    if (!currentUser) {
      return loginModal.onOpen()
    }

    try {
      let request
      if (hasFavorited) {
        request = () =>  axios.delete(`/api/favorites/${listingId}`)
      } else {
        request = () => axios.post(`/api/favorites/${listingId}`)
      }

      const response = await request()


      if (!response.status || response.status !== 200) {
        toast.error(`Something went wrong`)
      }
      router.refresh()
      toast.success('Success')
    } catch (error) {
      toast.error('Something went wrong')
    }
  }, [currentUser, hasFavorited, listingId, loginModal])

  return {
    hasFavorited,
    toggleFavorite
  }
}

export default useFavorites
