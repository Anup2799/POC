import { BrowserRouter, Routes, Route } from "react-router-dom";

import Assets from "./pages/Assets";
import Home from "./pages/Home";
import Whitepapers from "./pages/Whitepapers";
import Patents from "./pages/Patents";
import CardDetailsA from "./pages/CardDetailsA";
import CardDetails from "./pages/CardDetails";
import CardDetailsW from "./pages/CardDetailsW";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/Assets" element={<Assets />} />

          <Route path="/pages/whitepapers" element={<Whitepapers />} />
          <Route path="/pages/patents" element={<Patents />} />
          <Route path="/CardDetailsURLA/:cardId" element={<CardDetailsA />} />
          <Route path="/pages/CardDetails/:cardId" element={<CardDetails />} />
          <Route path="/pages/CardDetailsW/:cardId" element={<CardDetailsW />} />


          <Route index element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
