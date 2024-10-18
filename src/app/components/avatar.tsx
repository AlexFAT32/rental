'use client';
import Image  from "next/image";

interface AvatarProps {
  src?: string | null
}
export const Avatar = ({src}: AvatarProps ) => {
  return (
    <Image
      className="rounded-full"
      src={src || '/images/placeholder.jpg'}
      alt="Avatar"
      width={30}
      height={30}
      />

  )
}
