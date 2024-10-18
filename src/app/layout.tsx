import type { Metadata } from "next";
import { Nunito, Agdasima } from "next/font/google";
import "./globals.css";
import {Navbar} from "@/app/components/navigation/navbar";
import {Modal} from "@/app/components/modals/modal";
import {ClientOnly} from "@/app/components/client-only";
import {RegisterModal} from "@/app/components/modals/register-modal";
import {ToasterProvider} from "@/app/providers/toaster-provider";
import {LoginModal} from "@/app/components/modals/login-modal";
import getCurrentUser from "@/app/actions/getCurrentUser";
import {RentModal} from "@/app/components/modals/rent-modal";

const font = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Airbnb",
  description: "Airnbnb clone site",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser()
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <RentModal  />
          <RegisterModal />
          <LoginModal />
          {/*<Modal isOpen={true} title={"Hello"} actionLabel={"Send Somebody"}  />*/}
          <Navbar currentUser={currentUser}  />

        </ClientOnly>
        <div className="pb-20">
          {children}
        </div>
      </body>
    </html>
  );
}
