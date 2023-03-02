import React, { useEffect } from "react";
import { messageLists } from "../../../store/global";
import { useAtom } from "jotai";

function ChatBoard(props) {
  const [messageList, setMessageList] = useAtom(messageLists);
  const { socket } = props;

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((messageList) => [...messageList, data]);
      console.log(messageList);
    });
  }, [socket]);

  return (
    <div>
      {messageList.map((messsageData) => {
        return (
          <div key={`${messsageData.myName}${messsageData.time}`}>
            <div>
              <>{messsageData.myName}</>
            </div>

            <>{messsageData.currMessage}</>

            <>{messsageData.time}</>
          </div>
        );
      })}
    </div>
  );
}

export default ChatBoard;
