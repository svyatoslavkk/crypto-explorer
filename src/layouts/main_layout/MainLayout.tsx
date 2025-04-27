import { useParams, Outlet } from "react-router-dom";
import "./MainLayout.scss";
import { Column, Header, NavTabs } from "../../shared";

export const MainLayout = () => {
  const { coinId } = useParams();

  return (
    <main className="main-layout">
      <Column gap={0}>
        <Header />
        <NavTabs />
      </Column>
      <section className="main-layout__container">
        <Outlet context={{ coinId }} />
      </section>
    </main>
  );
};

export default MainLayout;
