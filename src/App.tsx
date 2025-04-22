import { BrowserRouter, Routes, Route } from "react-router-dom";
import CoinPage from "./views/coin/ui/CoinPage";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:coinId" element={<CoinPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
