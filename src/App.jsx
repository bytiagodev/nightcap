import { Routes, Route } from "react-router-dom";

function DoorPage() {
  return <p>Nightcap</p>;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<DoorPage />} />
    </Routes>
  );
}
