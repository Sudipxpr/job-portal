import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/Jobslice";
import { useNavigate } from "react-router-dom";

const Herosection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    if (!query.trim()) return; // Prevent empty searches
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      searchJobHandler();
    }
  };

  return (
    <div>
      <div className="p-3 flex flex-col gap-1">
        <h1 className="text-center font-bold text-5xl p-1">
          Get The <span className="text-indigo-600 p-1">Right Job</span>
          <br />You Deserve
        </h1>
        <p className="text-center text-gray-500">
          Find your dream job with us.
        </p>
      </div>

      <div className="flex w-[45%] pl-2 rounded-full items-center gap-4 mx-auto p-4">
        <Input
          type="text"
          placeholder="Search Jobs"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown} // Trigger search on Enter
          className="p-4 outline-none w-full bg-white shadow-lg"
        />
        <Button
          onClick={searchJobHandler}
          className="bg-indigo-600 hover:bg-indigo-700 rounded-lg flex items-center gap-2"
        >
          <Search className="h-5" />
          Search
        </Button>
      </div>
    </div>
  );
};

export default Herosection;
