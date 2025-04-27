import { useState } from "react";
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

const tabs: { id: NavTabId; label: string }[] = [
  { id: "dashboard", label: "Dashboard" },
  { id: "blocks", label: "Blocks" },
  { id: "transactions", label: "Transactions" },
  { id: "accounts", label: "Accounts" },
  { id: "tokens", label: "Tokens" },
  { id: "nfts", label: "NFTs" },
  { id: "validators", label: "Validators" },
  { id: "analytics", label: "Analytics" },
];

export const NavTabs = () => {
  const [activeTab, setActiveTab] = useState<NavTabId>("dashboard");
  return (
    <nav className="nav-tabs">
      <ul className="nav-tabs__list">
        {tabs.map(tab => (
          <li
            key={tab.id}
            className={`nav-tabs__item ${activeTab === tab.id ? "nav-tabs__item--active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavTabs;
