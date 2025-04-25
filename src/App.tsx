import { BrowserRouter, Routes, Route } from "react-router-dom";
import CoinPage from "./views/coin/ui/CoinPage";
import QueryProvider from "./app/ReactQueryProvider";
import { Provider } from "react-redux";
import { store } from "./app/store";

export const App = () => {
  return (
    <QueryProvider>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/:coinId" element={<CoinPage />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </QueryProvider>
  );
};

export default App;
