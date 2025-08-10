import React from "react";
import { Label } from "./ui/label";

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Kolkata", "Mumbai", "Pune"],
  },
  {
    filterType: "Job Role",
    array: [
      "Frontend Developer",
      "Backend Developer",
      "Mern Developer",
      "Data Analyst",
      "UI/UX Designer",
      "Mobile Developer",
    ],
  },
  {
    filterType: "Salary",
    array: ["0-0.4 LPA", "0.42-1 LPA", "1-5 LPA", "5-20 LPA"],
  },
];

const FilterCard = ({ selectedFilters, onFilterChange }) => {
  const handleCheckboxChange = (filterType, item) => {
    const currentSelections = selectedFilters[filterType] || [];
    if (currentSelections.includes(item)) {
      onFilterChange(
        filterType,
        currentSelections.filter((i) => i !== item)
      );
    } else {
      onFilterChange(filterType, [...currentSelections, item]);
    }
  };

  const clearAllFilters = () => {
    filterData.forEach((data) => {
      onFilterChange(data.filterType, []);
    });
  };

  return (
    <div className="w-full bg-white p-5 rounded-md">
      <div className="flex items-center justify-between mb-3">
        <h1 className="font-bold text-lg">Filter Jobs</h1>
        <button
          onClick={clearAllFilters}
          className="text-sm text-blue-600 hover:underline cursor-pointer"
        >
          Clear All
        </button>
      </div>
      <hr className="mb-3" />
      {filterData.map((data, index) => (
        <div key={index} className="my-4">
          <h1 className="font-semibold text-lg">{data.filterType}</h1>
          {data.array.map((item, idx) => {
            const id = `${data.filterType}-${item}`;
            const checked =
              selectedFilters[data.filterType]?.includes(item) || false;

            return (
              <div className="flex items-center space-x-2 my-2" key={idx}>
                <input
                  type="checkbox"
                  id={id}
                  checked={checked}
                  onChange={() => handleCheckboxChange(data.filterType, item)}
                  className="cursor-pointer"
                />
                <Label
                  htmlFor={id}
                  className="cursor-pointer hover:text-blue-600 transition"
                >
                  {item}
                </Label>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default FilterCard;
