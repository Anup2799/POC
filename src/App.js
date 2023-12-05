import { BrowserRouter, Routes, Route } from "react-router-dom";
import Details from "./pages/Details"; // Rename the import to avoid conflict
import Assetshowcase from "./pages/Assetshowcase";
import Home from "./pages/Home";
import Whitepapers from "./pages/Whitepapers";
import Patents from "./pages/Patents";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
        <Route path="/home" element={<Home />} /> 
          <Route path="/Assetshowcase" element={<Assetshowcase />} />
          <Route path="/details" element={<Details />} /> 
          <Route path="/pages/whitepapers" element={<Whitepapers />} />
          <Route path="/pages/patents" element={<Patents />} />

          <Route index element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
