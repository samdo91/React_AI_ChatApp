import React, { useState } from "react";
import { myNames, herNames, messageLists } from "../../../store/global/index";
import { useAtom } from "jotai";

function ChatFooter(props) {
  const [myName, setMyName] = useAtom(myNames);
  const [herName, setHerName] = useAtom(herNames);
  const [messageList, setMessageList] = useAtom(messageLists);
  const { socket } = props;
  const [currMessage, setCurrMessage] = useState("");
  const sendFunction = (e) => {
    if (currMessage !== "") {
      const messageData = {
        myName: myName,
        herName: herName,
        currMessage: currMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes() +
          ":" +
          new Date(Date.now()).getSeconds(),
        whoSent: false,
      };
      console.log(messageData);
      setMessageList((messageList) => [
        ...messageList,
        { ...messageData, whoSent: true },
      ]);
      socket.emit("send_message", messageData);
      setCurrMessage("");
    }
  };

  return (
    <div>
      <input
        value={currMessage}
        type="text"
        placeholder="대화하고 싶은 내용을 적어주세요."
        onChange={(e) => {
          setCurrMessage(e.target.value);
        }}
      />
      <button onClick={sendFunction}> 보내기</button>
    </div>
  );
}

export default ChatFooter;
