import { createBrowserRouter } from "react-router-dom";
import MainPage from "../../chat-app/mainpage/mainPage";
import ChatPage from "../../chat-app/chatPage/chatPage";
import AIChatPage from "../../chat-app/AIChatPage/AIChatPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "AIChat/:herName",
    element: <AIChatPage />,
  },
  {
    path: "openChat/:roomNumber",
    element: <ChatPage />,
  },
]);
