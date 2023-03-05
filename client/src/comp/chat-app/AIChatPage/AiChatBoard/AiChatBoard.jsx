import React from "react";
import { useAtom } from "jotai";
import { messageLists } from "../../../store/global";
import styled from "@emotion/styled";
import ScrollToBottom from "react-scroll-to-bottom";

function AiChatBoard() {
  const [messageList, setMessageList] = useAtom(messageLists);
  return (
    <div>
      <BoardBox>
        <ScrollToBottoms>
          {messageList.map((message) => {
            return (
              <MessageBox whoSent={message.whoSent}>
                <div>{message.name}</div>
                <div>
                  {" "}
                  {message.currMessage}
                  {"   "}
                  <div> {message.time}</div>
                </div>
              </MessageBox>
            );
          })}
        </ScrollToBottoms>
      </BoardBox>
    </div>
  );
}

export default AiChatBoard;

const BoardBox = styled.div`
  width: 350px;
  height: 500px;
  border-radius: 10px;
  background-color: white;
  margin-bottom: 100px;
  // display: flex;
  // flex-wrap: wrap;
`;

const MessageBox = styled.div`
  float: ${(props) => (props.whoSent ? "right" : "left")};
  border-radius: 15px;
  margin-left: 80px;
  width: 175px;
  height: 75px;
  font-size: 1opx;
  &::placeholder {
    padding: 15px;
  }
  border: 3px solid ${(props) => (props.whoSent ? "#ebf875" : "#a0edff")};
  margin: 10px;
`;

const ScrollToBottoms = styled(ScrollToBottom)`
  width: 350px;
  height: 500px;
`;
