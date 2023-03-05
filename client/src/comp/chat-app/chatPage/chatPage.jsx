import React, { useEffect } from "react";
//rfce
import { myNames, herNames, roomNumbers } from "../../store/global/index";
import io from "socket.io-client";
import { useAtom } from "jotai";
import ChatBoard from "./chatBoard/chatBoard";
import ChatFooter from "./chatFooter/chatFooter";
import Header from "../header/header";
import styled from "@emotion/styled";

//소켓 연결
const socket = io.connect("http://localhost:3001");

function ChatPage() {
  const [myName, setMyName] = useAtom(myNames);
  const [roomNumber, setroomNumber] = useAtom(roomNumbers);

  useEffect(() => {
    /*myname가 비어있지 않고 herName가 비어있지 않으면 사용된다. 
    여기서 emit은 보내는 것이다.특히 첫번째 파라미터는 이밴트 이름 그리고 두번쨰 파라미터는 이밴트로 발생시킬 무언가나 값이다.
     그러면 이제 서버에서 emit를 받으려고 할것이다. */

    if (myName !== "" && roomNumber !== "") {
      socket.emit("join_room", roomNumber);
    }
  }, []);

  return (
    <div>
      <Header />
      <ChatPageBox>
        <ChatBoard socket={socket} />
        <ChatFooter socket={socket} />
      </ChatPageBox>
    </div>
  );
}

export default ChatPage;

const ChatPageBox = styled.div`
  height: 1000px;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  justify-content: center;
  background-color: #a992fa;
`;
