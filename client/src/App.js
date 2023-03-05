import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./comp/store/router/router.jsx";
import styled from "@emotion/styled";
function App() {
  return (
    <DIV className="App">
      <RouterProvider router={router} />
    </DIV>
  );
}

export default App;

const DIV = styled.div`
  text-align: center;
`;
