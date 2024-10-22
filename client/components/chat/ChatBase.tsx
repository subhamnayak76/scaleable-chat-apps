"use client";
import React, { useState, useEffect, useMemo, Fragment } from "react";
import ChatNav from "./ChatNav";
import ChatUserDialog from "./ChatUserDialog";
import ChatSidebar from "./ChatSidebar";
import Chats from "./Chats";
import { json } from "stream/consumers";

export default function ChatBase({
  group,
  users,
  oldMessages,
}: {
  group: GroupChatType ;
  users: Array<GroupChatUserType> | [];
  oldMessages: Array<MessageType> | [];
}) {
  const [open, setOpen] = useState(true);
  const [chatUser, setChatUser] = useState<GroupChatUserType>();
  useEffect(() => {
    
    const data = localStorage.getItem(group.id);
    console.log("Data from localStorage:", data);
    console.log("Group ID:", group.id);
    console.log(group);


    if (data) {
      try {
        const pData = JSON.parse(data);
        setChatUser(pData);
      } catch (error) {
        console.error("Failed to parse chat user data from localStorage:", error);
      }
    } else {
      console.log("No data found in localStorage for this group ID.");
    }
  }, [group.id]);
  
  
  console.log("The chat user is", chatUser);
  return (
    <div className="flex">
      <ChatSidebar users={users} />
      <div className="w-full md:w-4/5 bg-gradient-to-b from-gray-50 to-white">
        {open ? (
          <ChatUserDialog open={open} setOpen={setOpen} group={group} />
        ) : (
          <ChatNav chatGroup={group} users={users} user={chatUser} />
        )}

        {/* Messages */}
        <Chats oldMessages={oldMessages} group={group} chatUser={chatUser} />
      </div>
    </div>
  );
}