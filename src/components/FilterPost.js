import React, { useEffect, useState } from "react";
import axios from "axios";
import Postitem from "./Postitem";
import YearDropdown from "./YearDropdown";
const FilterPost = () => {
  const [posts, setposts] = useState([]);
  useEffect(() => {
    // loadData();
  }, posts);

  const handleLogout = () => {
    localStorage.removeItem("admintoken");
    alert("logged out successfully");
    window.location.reload();
  };
  const loadData = async () => {
    try {
      const response = await axios.post("http://localhost:5000/getallposts");
      setposts(response.data);
    } catch {}
  };
  return (
    <div>
      <div>
        <YearDropdown />
        <button
          className="btn btn-primary absolute top-0 right-2  "
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      <div>
        {!posts.length ? (
          <h1>NO post to show</h1>
        ) : (
          posts.map((elem) => {
            return (
              <div className="flex items-center justify-center ">
                <Postitem value={elem} reload={loadData} />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default FilterPost;
