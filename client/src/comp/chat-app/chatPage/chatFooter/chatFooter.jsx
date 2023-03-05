import React, { useState } from "react";
import {
  myNames,
  herNames,
  messageLists,
  roomNumbers,
} from "../../../store/global/index";
import { useAtom } from "jotai";
import styled from "@emotion/styled";

function ChatFooter(props) {
  const [myName, setMyName] = useAtom(myNames);
  const [roomNumber, setRoomNumber] = useAtom(roomNumbers);
  const [messageList, setMessageList] = useAtom(messageLists);
  const { socket } = props;
  const [currMessage, setCurrMessage] = useState("");
  const sendFunction = (e) => {
    if (currMessage !== "") {
      const messageData = {
        myName: myName,
        roomNumber: roomNumber,
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
    <FooterBox>
      <InputButton
        value={currMessage}
        type="text"
        placeholder="대화하고 싶은 내용을 적어주세요."
        onChange={(e) => {
          setCurrMessage(e.target.value);
        }}
      />
      <Buttom onClick={sendFunction}> 보내기</Buttom>
    </FooterBox>
  );
}

export default ChatFooter;

const FooterBox = styled.div`
  display: flex;
`;
const InputButton = styled.input`
  border-radius: 15px;
  margin-left: FooterBox px;
  width: 400px;
  height: 35px;
  font-size: 20px;
  &::placeholder {
    padding: 15px;
  }
  border: 3px solid #28cf75;
`;

const Buttom = styled.button`
  border-radius: 15px;
  width: 175px;
  height: 45px;
  font-size: 30px;
  margin-right: 10px
  &::placeholder {
    padding: 15px;
  }
  border: 3px solid #00a9fe;
`;
