import "./assets/styles/App.css";
import Home from "./pages/home";
import SearchResults from "./pages/searchresults/searchResults";
import Movie from "./pages/movie/movie";
import { BrowserRouter , Routes, Route } from "react-router-dom";
import { UserContext } from "./UserContext";
import { useEffect, useState } from "react";

function App() {
  const [ user, setUser ] = useState(null);

  useEffect(() => {
      const userData = localStorage.getItem("userData");
      if (userData) {
        setUser(JSON.parse(userData));
      }
  }, []);




  return (
    <div className="App">
      <BrowserRouter> 
          <UserContext.Provider value={{user, setUser}}>
            <Routes>
              <Route path="/" exact element={<Home />} /> 
              <Route path="/search" element={<SearchResults />} />
              <Route path="/movie" element={<Movie />} />
            </Routes>
          </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
