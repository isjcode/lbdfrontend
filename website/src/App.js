import "./assets/styles/App.css";
import Home from "./pages/home";
import { BrowserRouter , Routes, Route } from "react-router-dom";
import { UserContext } from "./UserContext";
import { useContext, useEffect, useMemo, useState } from "react";

function App() {
  const [user, setUser ] = useState(null);

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
            </Routes>
          </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
