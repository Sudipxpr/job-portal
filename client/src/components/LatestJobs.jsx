import React from "react";
import LatestJobCard from "./LatestJobCard";
import { useSelector } from "react-redux";

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);

  return (
    <div className="max-w-7xl mx-auto my-5">
      <h1 className="mx-5 text-3xl font-bold">
        Latest & Top <span className="text-indigo-600">Job Openings</span>
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-5">
        {!allJobs || allJobs.length === 0 ? (
          <span>No jobs available</span>
        ) : (
          allJobs.slice(0, 6).map((job) => (
            <LatestJobCard key={job._id} job={job} />
          ))
        )}
      </div>
    </div>
  );
};

export default LatestJobs;
