"use client";

import { collection, orderBy, query } from "firebase/firestore";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../lib/firebase";
import ChatRow from "./ChatRow";
import ModelSelection from "./ModelSelection";
import NewChatBtn from "./NewChatBtn";

const Sidebar = () => {
  const { data: session } = useSession();
  const [chats, loading] = useCollection(
    session &&
      query(
        collection(db, "users", session.user?.email!, "chats"),
        orderBy("createdAt", "asc")
      )
  );

  return (
    <div className="flex p-2 flex-col h-screen justify-center  items-center">
      <div className="flex-1 w-full">
        <div>
          <NewChatBtn />

          <div className="hidden md:inline">
            <ModelSelection />
          </div>
          {loading && (
            <div className="animate-pulse text-center text-white mt-5">
              <p>Loading Chats...</p>
            </div>
          )}
          <div className="flex flex-col space-y-2 my-2">
            {chats?.docs.map((chat) => (
              <ChatRow id={chat.id} key={chat.id} />
            ))}
          </div>
        </div>
      </div>
      {session && (
        // eslint-disable-next-line @next/next/no-img-element
        <div className="relative w-10 h-10 flex justify-center items-center">
          <Image
            src={session?.user?.image!}
            alt="avatar"
            fill
            style={{ objectFit: "fill" }}
            className="h-12 w-12 rounded-full cursor-pointer mx-auto mb-2 hover:opacity-50 "
            onClick={() => {
              signOut();
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
