import { useEffect, useState } from "react";
import "./App.css";
import FilterPost from "./components/FilterPost";
import Login from "./components/Login";

function App() {
  const [user, setuser] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("admintoken")) {
      setuser(true);
    } else {
      setuser(false);
    }
  }, [user]);

  return <div>{user ? <FilterPost /> : <Login />}</div>;
}

export default App;
