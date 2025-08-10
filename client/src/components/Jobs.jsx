import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

const Jobs = () => {
  const { allJobs } = useSelector((store) => store.job);

  const [selectedFilters, setSelectedFilters] = useState({});

  const handleFilterChange = (filterType, values) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterType]: values,
    }));
  };

  const filteredJobs = allJobs.filter((job) => {
    if (
      selectedFilters.Location &&
      selectedFilters.Location.length > 0 &&
      !selectedFilters.Location.some(
        (loc) => loc.toLowerCase() === job.location?.toLowerCase()
      )
    )
      return false;

    if (
      selectedFilters["Job Role"] &&
      selectedFilters["Job Role"].length > 0 &&
      !selectedFilters["Job Role"].some(
        (role) => role.toLowerCase() === job.title?.toLowerCase()
      )
    )
      return false;

    if (selectedFilters.Salary && selectedFilters.Salary.length > 0) {
      const salaryMatches = selectedFilters.Salary.some((range) => {
        switch (range) {
          case "0-0.4 LPA":
            return job.salary <= 0.4;
          case "0.42-1 LPA":
            return job.salary >= 0.42 && job.salary <= 1;
          case "1-5 LPA":
            return job.salary >= 1 && job.salary <= 5;
          case "5-20 LPA":
            return job.salary >= 5 && job.salary <= 20;
          default:
            return false;
        }
      });

      if (!salaryMatches) return false;
    }

    return true;
  });

  return (
    <div>
      <Navbar />
      <div className="pt-20 max-w-7xl mx-auto px-3">
        <div className="flex flex-col md:flex-row gap-5">
          {/* Sidebar */}
          <div className="hidden md:block w-1/5">
            <FilterCard
              selectedFilters={selectedFilters}
              onFilterChange={handleFilterChange}
            />
          </div>

          {/* Job List */}
          {filteredJobs.length <= 0 ? (
            <span className="text-gray-500 text-sm">Jobs not Found</span>
          ) : (
            <motion.div
              className="flex-1 h-[98vh] overflow-y-auto pb-5 "
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredJobs.map((job) => (
                  <motion.div
                    key={job?._id}
                    variants={itemVariants}
                    whileHover={{ scale: 1.0 }}
                    whileTap={{ scale: 0.99 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    style={{ originX: 0.5, originY: 0.5 }}
                  >
                    <Job job={job} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
