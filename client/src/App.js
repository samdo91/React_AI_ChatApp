import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./comp/store/router/router.jsx";

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
