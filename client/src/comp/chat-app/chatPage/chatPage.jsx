import React, { useEffect } from "react";
//rfce
import { myNames, herNames } from "../../store/global/index";
import io from "socket.io-client";
import { useAtom } from "jotai";
import ChatBoard from "./chatBoard/chatBoard";
import ChatFooter from "./chatFooter/chatFooter";

//소켓 연결
const socket = io.connect("http://localhost:3001");

function ChatPage() {
  const [myName, setMyName] = useAtom(myNames);
  const [herName, setHerName] = useAtom(herNames);

  useEffect(() => {
    /*myname가 비어있지 않고 herName가 비어있지 않으면 사용된다. 
    여기서 emit은 보내는 것이다.특히 첫번째 파라미터는 이밴트 이름 그리고 두번쨰 파라미터는 이밴트로 발생시킬 무언가나 값이다.
     그러면 이제 서버에서 emit를 받으려고 할것이다. */

    if (myName !== "" && herName !== "") {
      socket.emit("join_room", herName);
    }
  }, []);

  return (
    <div>
      <ChatBoard socket={socket} />
      <ChatFooter socket={socket} />
    </div>
  );
}

export default ChatPage;
