import React from "react";
import {
  myNames,
  herNames,
  chatSelsects,
  roomNumbers,
} from "../../store/global/index";
import { useAtom } from "jotai";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import Header from "../header/header";
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
      <Header />
      <MainPageBox>
        {chatSelsect === "openChat" ? (
          <InPut
            type="text"
            chatSelsect={chatSelsect}
            onChange={(e) => {
              setRoomNumber(e.target.value);
            }}
            placeholder="대화할 방의 이름을 적어주세요"
          />
        ) : (
          <InPut
            type="text"
            chatSelsect={chatSelsect}
            onChange={(e) => {
              setHerName(e.target.value);
            }}
            placeholder="대화하고 싶은 상대의 이름"
          />
        )}

        <InPut
          type="text"
          onChange={(e) => {
            setMyName(e.target.value);
          }}
          placeholder="내 이름"
        />
        <ButtonBox>
          <SelectButton name="choice" onChange={handleChange}>
            <option value="openChat">Open Chat</option>
            <option value="AIChat">AI Chat</option>
          </SelectButton>

          <Link
            to={
              chatSelsect === "openChat"
                ? `openChat/${roomNumber}`
                : `AIChat/${herName}`
            }
          >
            <Button> Join A Room</Button>
          </Link>
        </ButtonBox>
      </MainPageBox>
    </div>
  );
}

export default MainPage;

const MainPageBox = styled.div`
  height: 1000px;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  justify-content: center;
  background-color: #a992fa;
`;

const InPut = styled.input`
  margin: 70px;
  border: 3px solid
    ${(props) =>
      props.chatSelsect === "openChat"
        ? "#f148fb;"
        : props.chatSelsect === "AIChat"
        ? "#08F7FE;"
        : "#13CA91"};
  border-radius: 15px;
  width: 450px;
  height: 75px;
  font-size: 30px;
  &::placeholder {
    padding: 15px;
  }
`;

const ButtonBox = styled.div`
  display: flex;
`;

const Button = styled.button`
  border-radius: 15px;
  margin-left: 80px;
  width: 175px;
  height: 75px;
  font-size: 30px;
  &::placeholder {
    padding: 15px;
  }

  border: 3px solid #fc6e22;
`;
const SelectButton = styled.select`
  border-radius: 15px;
  width: 175px;
  height: 75px;
  font-size: 30px;
  &::placeholder {
    padding: 15px;
  }
  border: 3px solid #00a9fe;
`;
