import React, { useEffect } from "react";
import axios from "axios";
const Postitem = (value) => {
  const { _id, authorid, typeofevent, eventname, link, date } = value.value;

  const AcceptPost = async (e) => {
    console.log(e);
    try {
      const response = await axios.post("http://localhost:5000/accept", { e });
      if (response) {
        alert("Post verified");
      } else {
        alert("internal issue");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const RejectPost = async (e) => {
    console.log(e);
    const data = { e };
    try {
      const response = await axios.delete("http://localhost:5000/deletepost", {
        data,
      });
      if (response) {
        alert("post Deleted");
      } else {
        console.log("post has been deleted");
      }
    } catch (err) {
      alert("internal serverissue");
    }
  };
  return (
    <div className=" center ">
      <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <h1 className="text-red-500">{`User:${authorid}`}</h1>
        <p className="mb-3 mt-3 font-normal text-black-500 ">
          {`Event Name:${eventname}`}
        </p>
        <a
          href={link}
          className="inline-flex items-center text-blue-600 hover:underline"
        >
          Link of the event
          <svg
            className="w-3 h-3 ms-2.5 rtl:rotate-[270deg]"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 18"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"
            />
          </svg>
        </a>
        <h1 className="mt-3 text-yellow-500">{`Event Date:${date}`}</h1>
        <br></br>
        <button
          className="btn btn-primary mx-5 my-2"
          onClick={() => {
            return AcceptPost(_id);
          }}
        >
          Accept
        </button>
        <button
          className="btn btn-primary mx-5 my-2 "
          onClick={() => {
            return RejectPost(_id);
          }}
        >
          Reject
        </button>
      </div>
    </div>
  );
};

export default Postitem;
