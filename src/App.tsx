import { Route, Routes } from "react-router";
import "./App.css";
import { Dashboard } from "./pages/Dashboard/index.tsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
