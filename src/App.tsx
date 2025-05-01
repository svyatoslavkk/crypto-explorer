import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./views/dashboard/ui/Dashboard";
import QueryProvider from "./app/ReactQueryProvider";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { MainLayout } from "./layouts";
import { Blocks, Txs } from "./views";

export const App = () => {
  return (
    <QueryProvider>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route path="/:coinId" element={<Dashboard />} />
              <Route path="/blocks" element={<Blocks />} />
              <Route path="/txs" element={<Txs />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </QueryProvider>
  );
};

export default App;
