import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainMenu from "./pages/MainMenu";

// Module pages (stubs — fill these in per module)
import IngredientsModule from "./modules/01-ingredients";
import MiseEnPlaceModule from "./modules/02-mise-en-place";
import InstantSpicesModule from "./modules/03-instant-spices";
import SpiceCombinationsModule from "./modules/04-spice-combinations";
import SkewersModule from "./modules/05-skewers";
import LayerCakeModule from "./modules/06-layer-cake";
import CrackingEggsModule from "./modules/07-cracking-eggs";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/modules/ingredients/*" element={<IngredientsModule />} />
        <Route path="/modules/mise-en-place/*" element={<MiseEnPlaceModule />} />
        <Route path="/modules/instant-spices/*" element={<InstantSpicesModule />} />
        <Route path="/modules/spice-combinations/*" element={<SpiceCombinationsModule />} />
        <Route path="/modules/skewers/*" element={<SkewersModule />} />
        <Route path="/modules/layer-cake/*" element={<LayerCakeModule />} />
        <Route path="/modules/cracking-eggs/*" element={<CrackingEggsModule />} />
      </Routes>
    </BrowserRouter>
  );
}
