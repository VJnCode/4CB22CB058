import { BrowserRouter, Routes, Route } from "react-router-dom";
import Feed from "./pages/Feed";
import Trending from "./pages/Trending";
import TopUsers from "./pages/TopUsers";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/top-users" element={<TopUsers />} />
        <Route path="/trending" element={<Trending />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
