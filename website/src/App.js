import "./assets/styles/App.css";
import Home from "./pages/home";
import SearchResults from "./pages/searchresults/searchResults";
import Movie from "./pages/movie/movie";
import Review from "./pages/review";
import User from "./pages/user";
import UserFilms from "./pages/user/films";
import UserReviews from "./pages/user/reviews";
import UserFollowers from "./pages/user/followers";
import UserFollowees from "./pages/user/followees";
import NewList from "./pages/user/newlist";
import List from "./pages/user/list";
import UserSettings from "./pages/user/usersettings";
import UserLists from "./pages/user/lists";
import UserNews from "./pages/user/usernews";
import NewNews from "./pages/user/newnews";
import News from "./pages/news";
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
              <Route path="/user/:username/lists" element={<UserLists />} />
              <Route path="/user/:username/followers" element={<UserFollowers />} />
              <Route path="/user/:username/followees" element={<UserFollowees />} />
              <Route path="/user/:username/newlist" element={<NewList />} />
              <Route path="/user/:username/list" element={<List />} />
              <Route path="/user/:username/settings" element={<UserSettings />} />
              <Route path="/user/:username/news" element={<UserNews />} />
              <Route path="/user/:username/news/new" element={<NewNews />} />
              <Route path="/news" element={<News />} />
            </Routes>
          </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
