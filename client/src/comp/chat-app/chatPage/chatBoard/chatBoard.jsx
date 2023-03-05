import React, { useEffect } from "react";
import { messageLists } from "../../../store/global";
import { useAtom } from "jotai";
import styled from "@emotion/styled";
import ScrollToBottom from "react-scroll-to-bottom";

function ChatBoard(props) {
  const [messageList, setMessageList] = useAtom(messageLists);
  const { socket } = props;

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log("data :>> ", data);
      setMessageList((messageList) => [...messageList, data]);
      console.log(messageList);
    });
  }, [socket]);

  return (
    <BoardBox>
      <ScrollToBottoms>
        {messageList.map((messageData) => {
          return (
            <MessageBox
              whoSent={messageData.whoSent}
              key={`${messageData.myName}${messageData.time}`}
            >
              <div>
                <>{messageData.myName}</>
              </div>

              <>{messageData.currMessage}</>

              <>{messageData.time}</>
            </MessageBox>
          );
        })}
      </ScrollToBottoms>
    </BoardBox>
  );
}

export default ChatBoard;

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
  // display: flex;
  // justify-content: ${(props) => (props.whoSent ? "flex-start" : "flex-end")};
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
