import React from "react";
import {
  myNames,
  herNames,
  chatSelsects,
  roomNumbers,
} from "../../store/global/index";
import { useAtom } from "jotai";
import { Link } from "react-router-dom";

function MainPage() {
  const [myName, setMyName] = useAtom(myNames);
  const [herName, setHerName] = useAtom(herNames);
  const [chatSelsect, setChatSelsect] = useAtom(chatSelsects);
  const [roomNumber, setRoomNumber] = useAtom(roomNumbers);

  const handleChange = (e) => {
    console.log("e.target.value :>> ", e.target.value);
    setChatSelsect(e.target.value);
  };
  return (
    <div>
      <select name="choice" onChange={handleChange}>
        <option value="openChat">Open Chat</option>
        <option value="AIChat">AI Chat</option>
      </select>
      {chatSelsect === "openChat" ? (
        <input
          type="text"
          onChange={(e) => {
            setRoomNumber(e.target.value);
          }}
          placeholder="대화할 방의 이름을 적어주세요"
        />
      ) : (
        <input
          type="text"
          onChange={(e) => {
            setHerName(e.target.value);
          }}
          placeholder="대화하고 싶은 상대의 이름"
        />
      )}

      <input
        type="text"
        onChange={(e) => {
          setMyName(e.target.value);
        }}
        placeholder="내 이름"
      />
      <Link
        to={
          chatSelsect === "openChat"
            ? `openChat/${roomNumber}`
            : `AIChat/${herName}`
        }
      >
        <button> Join A Room</button>
      </Link>
    </div>
  );
}

export default MainPage;
