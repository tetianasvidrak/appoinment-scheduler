import { Route, Routes } from "react-router";
import "./App.css";
import Scheduler from "./components/Scheduler/index.tsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Scheduler />} />
    </Routes>
  );
}

export default App;
