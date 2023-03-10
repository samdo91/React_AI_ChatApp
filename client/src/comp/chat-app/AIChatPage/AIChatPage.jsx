import React, { useEffect, useState } from "react";
/*useParams를 사용할까도 했지만 그보다는 그냥 전역관리 되어 있는 내 이름과 그녀의 이름을 가져오는게 
좋을 것이라 판단 */
import { myNames, herNames, messageLists } from "../../store/global/index";
import { useAtom } from "jotai";
import { Configuration, OpenAIApi } from "openai";
import AiChatBoard from "./AiChatBoard/AiChatBoard";
import styled from "@emotion/styled";
import Header from "../header/header";
// const { Configuration, OpenAIApi } = require("openai");

// import slack from "@slack/web-api";
// const client = new slack.WebClient("TOKEN");
// delete client["axios"].defaults.headers["User-Agent"];

function AIChatPage() {
  const configuration = new Configuration({
    apiKey: `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`,
  });
  const openai = new OpenAIApi(configuration);

  const [myName, setMyName] = useAtom(myNames);
  const [herName, setHerName] = useAtom(herNames);
  const [currMessage, setCurrMessage] = useState("");
  const [messageList, setMessageList] = useAtom(messageLists);

  const sendMessage = async () => {
    await openai
      .createCompletion({
        model: "text-davinci-003",
        prompt:
          messageList.length < 1
            ? `안녕 내 이름은 ${myName}이고 너의 이름은 ${herName}이야. 우리 대화 할거야. 나에게 인사해주겠니, ${herName}야`
            : currMessage,
        temperature: 0.9,
        max_tokens: 150,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0.6,
      })
      .then((result) => {
        const aiData = result.data;
        const aiCurrMessage = aiData.choices[0].text;

        const data = {
          name: herName,
          currMessage: aiCurrMessage,
          time:
            new Date(Date.now()).getHours() +
            ":" +
            new Date(Date.now()).getMinutes() +
            ":" +
            new Date(Date.now()).getSeconds(),
          whoSent: false,
        };

        setMessageList([...messageList, data]);
        console.log("messageList", messageList);
      });
  };

  useEffect(() => {
    sendMessage();
  }, []);

  useEffect(() => {
    if (
      messageList.length >= 2 &&
      messageList[messageList.length - 1].whoSent === true
    ) {
      sendMessage();
    }
    setCurrMessage("");
  }, [messageList]);

  const sendFunction = () => {
    if (currMessage !== "") {
      const data = {
        name: myName,
        currMessage: currMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes() +
          ":" +
          new Date(Date.now()).getSeconds(),
        whoSent: true,
      };

      setMessageList([...messageList, data]);
      console.log("messageList :>> ", messageList[messageList.length - 1]);
    }
  };

  return (
    <div>
      <Header />
      <AIChatPageBox>
        <AiChatBoard />
        <FooterBox>
          <InputButton
            value={currMessage}
            type="text"
            placeholder="그녀에게 보낼 말"
            onChange={(e) => {
              setCurrMessage(e.target.value);
            }}
          />
          <Buttom onClick={sendFunction}>전송</Buttom>
        </FooterBox>
      </AIChatPageBox>
    </div>
  );
}

export default AIChatPage;

const AIChatPageBox = styled.div`
  height: 1000px;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  justify-content: center;
  background-color: #a992fa;
`;

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
