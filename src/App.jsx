import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainMenu from "./pages/MainMenu";

// Module pages (stubs — fill these in per module)
import IngredientsModule from "./modules/01-ingredients";
import MiseEnPlaceModule from "./modules/02-mise-en-place";
import InstantSpicesModule from "./modules/03-instant-spices";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/modules/ingredients/*" element={<IngredientsModule />} />
        <Route path="/modules/mise-en-place/*" element={<MiseEnPlaceModule />} />
        <Route path="/modules/instant-spices/*" element={<InstantSpicesModule />} />
      </Routes>
    </BrowserRouter>
  );
}
