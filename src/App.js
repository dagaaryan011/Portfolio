import { useEffect } from "react";

function App() {
  useEffect(() => {
   
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname);
    }

    
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="App">
      <NavBar />
      <Banner />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
