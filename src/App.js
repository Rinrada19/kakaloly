import React, { useState } from "react";
import "./styles/custom.scss";

function App() {
  const [navOpen, setNavOpen] = useState(false);

  const toggleNav = () => {
    setNavOpen(!navOpen);
  };

  return (
    <div className="App">
      <header className="header">
        <h1>My Website</h1>
        <div className="hamburger" onClick={toggleNav}>
          ☰
        </div>
        <nav className={navOpen ? "show" : ""}>
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
        </nav>
      </header>
      <main className="main-content">
        <section>
          <h1 className="text-primary">Welcome to My App</h1>
          <h2 className="text-secondary">Subtitle Here</h2>
          <h3 className="text-hot-pink">Section Heading</h3>
          <p>
            This paragraph should use the Inter font with the specified size.
          </p>
          <a
            className="btn btn-primary"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </section>
        <aside className="sidebar">
          <h3>Sidebar</h3>
          <p>Additional content here.</p>
        </aside>
      </main>
      <footer className="footer">
        <p>Footer content &copy; 2024</p>
      </footer>
    </div>
  );
}

export default App;
