const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: `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`,
});
const openai = new OpenAIApi(configuration);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User: ${socket.id}에 연결됨`);

  //   socket.on("disconnect", (data) => {
  //     console.log("User Disconnent", socket.id);
  //   });

  socket.on("send_message", (data) => {
    socket.to(data.herName).emit("receive_message", data);
  });

  //   socket.on("send_message", async (data) => {
  //     await openai
  //       .createCompletion({
  //         model: "text-davinci-003",
  //         prompt: data.currMessage,
  //         temperature: 0.9,
  //         max_tokens: 150,
  //         top_p: 1,
  //         frequency_penalty: 0,
  //         presence_penalty: 0.6,
  //       })
  //       .then((result) => {
  //         const aiData = result.data;
  //         const receive_message = {
  //           currMessage: aiData.choices[0].text,
  //         };
  //         console.log("data", data);
  //         console.log("이거 어떻게 먹는거냐 이렇게 먹는거냐?", receive_message);
  //         socket
  //           .to(data.herName)
  //           .emit("receive_message", {
  //             ...data,
  //             currMessage: receive_message,
  //             time:
  //               new Date(Date.now()).getHours() +
  //               ":" +
  //               new Date(Date.now()).getMinutes() +
  //               ":" +
  //               new Date(Date.now()).getSeconds(),
  //             whoSent: false,
  //           });
  //       });
  //   });

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`Uesr ${socket.id} joined herName ${data}`);
  });
});

const PORT = 3001 || process.nev.PORT;

server.listen(PORT, () => {
  console.log(`${PORT} 연결 완료`);
});
