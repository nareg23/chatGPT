"use client";

import { collection, orderBy, query } from "firebase/firestore";
import { useSession, signOut } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../lib/firebase";
import ChatRow from "./ChatRow";
import NewChatBtn from "./NewChatBtn";

const Sidebar = () => {
  const { data: session } = useSession();
  const [chats, leading, error] = useCollection(
    session &&
      query(
        collection(db, "users", session.user?.email!, "chats"),
        orderBy("createdAt", "asc")
      )
  );

  return (
    <div className="flex p-2 flex-col h-screen">
      <div className="flex-1">
        <div>
          {/* new chat */}
          <NewChatBtn />

          <div>{/* ModalSelection */}</div>
          {/* map ChatRows */}
          {chats?.docs.map((chat) => (
            <ChatRow id={chat.id} key={chat.id} />
          ))}
        </div>
      </div>
      {session && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={session?.user?.image!}
          alt="avatar"
          className="h-12 w-12 rounded-full cursor-pointer mx-auto mb-2 hover:opacity-50 "
          onClick={() => {
            signOut();
          }}
        />
      )}
    </div>
  );
};

export default Sidebar;
