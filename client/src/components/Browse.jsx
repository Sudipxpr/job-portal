
import React from "react";
import Navbar from "./shared/Navbar";
import Job from "./Job";
import { useSelector } from "react-redux";

const Browse = () => {
  const { allJobs, searchedQuery } = useSelector((state) => state.job);

  // Match only Role or Company name
  const matchesSearch = (job, query) => {
    const lowerQuery = query.toLowerCase();
    return (
      job.title?.toLowerCase().includes(lowerQuery) ||
      job.company?.name?.toLowerCase().includes(lowerQuery)
    );
  };

  // Only filter when there's a search query
  const filteredJobs = searchedQuery.trim()
    ? allJobs.filter((job) => matchesSearch(job, searchedQuery))
    : [];

  return (
    <div>
      <Navbar />
      <div className="pt-20 max-w-7xl mx-auto p-6">
        {searchedQuery.trim() ? (
          <>
            <h1 className="text-xl font-bold my-10">
              Search Results ({filteredJobs.length})
            </h1>

            {filteredJobs.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredJobs.map((job) => (
                  <Job key={job._id} job={job} />
                ))}
              </div>
            ) : (
              <p className="text-red-500 text-lg">
                No jobs found matching "{searchedQuery}"
              </p>
            )}
          </>
        ) : (
          <p className="text-gray-500">Please enter a search term.</p>
        )}
      </div>
    </div>
  );
};

export default Browse;
