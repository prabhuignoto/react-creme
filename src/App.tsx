import React from "react";
import AppRoutes from "./app-routes";
import "./App.scss";
import { SidebarHome } from "./demo/sidebar/sidebar";
import "./design/colors.scss";
import "./design/layout.scss";
import "./design/list.scss";
import Footer from "./Footer";

const Logo = () => (
  <div className="rc-demo-app-logo">
    {/* <span className="rc-demo-logo-icon-wrapper"><LogoIcon /></span> */}
    React Creme
  </div>
);

const GithubLink = () => (
  <div className="rc-demo-app-github-link">
    <a href="http://github.com">
      <img
        src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
        alt="github"
      />
    </a>
  </div>
);

function App() {
  return (
    <div className="app">
      <aside className="app-aside">
        <SidebarHome />
      </aside>
      <section className="app-main-section">
        <header className="app-header">
          <Logo />
          <GithubLink />
        </header>
        <AppRoutes />
        <Footer />
      </section>
    </div>
  );
}

export default App;
