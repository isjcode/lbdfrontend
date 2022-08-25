import "./assets/styles/App.css";
import Home from "./pages/home";
import SearchResults from "./pages/searchresults/searchResults";
import Movie from "./pages/movie/movie";
import Review from "./pages/review";
import User from "./pages/user";
import UserFilms from "./pages/user/films";
import UserReviews from "./pages/user/reviews";
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
              <Route path="/review" element={<Review />} />
              <Route path="/user/:username" element={<User />} />
              <Route path="/user/:username/films" element={<UserFilms />} />
              <Route path="/user/:username/reviews" element={<UserReviews />} />
              <Route path="/user/:username/lists" element={<UserReviews />} />
            </Routes>
          </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
