import React from "react";
import { Badge } from "./ui/badge";
import { Avatar, AvatarImage } from "./ui/avatar";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

const LatestJobCard = ({ job }) => {
    const navigate = useNavigate();
  return (
    <div className="mx-2 p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer hover:shadow-2xl transition-shadow">
      <div className="flex items-center gap-3 mb-2">
        <Avatar>
          <AvatarImage
            src={job?.company?.logo || ""}
            alt={job?.company?.name || "Company Logo"}
          />
        </Avatar>
        <h1 className="font-medium text-lg">{job?.company?.name || "Company Name"}</h1>
      </div>

      <p className="text-sm text-gray-500">{job?.location || "India"}</p>

      <div>
        <h1 className="font-bold text-lg my-2">{job?.title || "Job Title"}</h1>
        <p className="text-gray-600 text-sm">{job?.description || "No description provided"}</p>
      </div>

      <div className="flex items-center gap-2 mt-4">
        <Badge className={"text-blue-700 font-bold"} variant="ghost">
          {job?.position ? `${job.position} positions` : "Positions N/A"}
        </Badge>
        <Badge className={"text-red-500 font-bold"} variant="ghost">
          {job?.jobType || "Job Type N/A"}
        </Badge>
        <Badge className={"text-purple-700 font-bold"} variant="ghost">
          {job?.salary ? `${job.salary} LPA` : "Salary N/A"}
        </Badge>
      </div>
      <div className="flex items-center justify-between mt-4">
              <Button
                variant="outline"
                className="border border-gray-300 hover:bg-gray-600 bg-gray-500 text-white hover:text-white w-1/3"
                onClick={() => navigate(`/description/${job?._id}`)}
              >
                Details
              </Button>
             
            </div>
    </div>
  );
};

export default LatestJobCard;
