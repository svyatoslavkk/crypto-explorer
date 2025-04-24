import { BrowserRouter, Routes, Route } from "react-router-dom";
import CoinPage from "./views/coin/ui/CoinPage";
import QueryProvider from "./app/ReactQueryProvider";

export const App = () => {
  return (
    <QueryProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/:coinId" element={<CoinPage />} />
        </Routes>
      </BrowserRouter>
    </QueryProvider>
  );
};

export default App;
