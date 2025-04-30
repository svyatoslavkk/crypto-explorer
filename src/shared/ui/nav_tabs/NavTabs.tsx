import { useLocation, useNavigate } from "react-router-dom";
import "./NavTabs.scss";

export type NavTabId =
  | "dashboard"
  | "blocks"
  | "transactions"
  | "accounts"
  | "tokens"
  | "nfts"
  | "validators"
  | "analytics";

const tabs: { id: NavTabId; label: string; path: string }[] = [
  { id: "dashboard", label: "Dashboard", path: "/" },
  { id: "blocks", label: "Blocks", path: "/blocks" },
  { id: "transactions", label: "Transactions", path: "/txs" },
  { id: "accounts", label: "Accounts", path: "/accounts" },
  { id: "tokens", label: "Tokens", path: "/tokens" },
  { id: "nfts", label: "NFTs", path: "/nfts" },
  { id: "validators", label: "Validators", path: "/validators" },
  { id: "analytics", label: "Analytics", path: "/analytics" },
];

const tabPaths = tabs.map(tab => tab.path.split("/")[1]).filter(Boolean);

export const NavTabs = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isDashboardPath = (() => {
    const match = /^\/([^/]+)$/.exec(location.pathname);
    if (!match) return false;
    const firstSegment = match[1];
    return !tabPaths.includes(firstSegment);
  })();

  return (
    <nav className="nav-tabs">
      <ul className="nav-tabs__list">
        {tabs.map(tab => {
          const isActive =
            tab.id === "dashboard" ? isDashboardPath : location.pathname.startsWith(tab.path);
          return (
            <li
              key={tab.id}
              className={`nav-tabs__item ${isActive ? "nav-tabs__item--active" : ""}`}
              onClick={() => {
                if (!isActive) navigate(tab.path);
              }}
            >
              {tab.label}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default NavTabs;
