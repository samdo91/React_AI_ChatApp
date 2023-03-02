import React from "react";
import { useAtom } from "jotai";
import { messageLists } from "../../../store/global";

function AiChatBoard() {
  const [messageList, setMessageList] = useAtom(messageLists);
  return (
    <div>
      {messageList.map((message) => {
        return (
          <div>
            <div>{message.name}</div>
            <div>
              {" "}
              {message.currMessage}
              {"   "}
              <div> {message.time}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default AiChatBoard;
