import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const Job = ({ job }) => {
  const navigate = useNavigate();

  const daysAgo = (mongodbTime) => {
    if (!mongodbTime) return null;
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-200 transition hover:shadow-2xl">
      {/* Top row: date  */}
      <div className="flex items-center justify-between p-2 border-b">
        <p className="text-sm text-gray-500">
          {daysAgo(job?.createdAt) === 0
            ? "Today"
            : `${daysAgo(job?.createdAt)} days ago`}
        </p>
      </div>

      {/* Company logo + name */}
      <div className="flex items-center gap-2 my-2">
        <Button variant="ghost" size="icon" className="p-0">
          <Avatar>
            <AvatarImage
              src={job?.company?.logo || ""}
              alt={job?.company?.name || "Company Logo"}
            />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-lg">
            {job?.company?.name || "Unknown Company"}
          </h1>
          <p className="text-sm text-gray-600">{job?.location || "India"}</p>
        </div>
      </div>

      {/* Job title + description */}
      <div>
        <h1 className="font-bold text-md my-2">
          {job?.title || "Untitled Job"}
        </h1>
        <p className="text-sm text-gray-600 line-clamp-2">
          {job?.description || "No description available."}
        </p>
      </div>

      {/* Badges */}
      <div className="flex items-center gap-2 mt-4 flex-wrap">
        <Badge className="text-blue-700 font-bold" variant="ghost">
          {job?.position ? `${job.position} positions` : "N/A"}
        </Badge>
        <Badge className="text-red-500 font-bold" variant="ghost">
          {job?.jobType || "Unknown Type"}
        </Badge>
        <Badge className="text-purple-700 font-bold" variant="ghost">
          {job?.salary ? `${job.salary} LPA` : "Not disclosed"}
        </Badge>
      </div>

      {/* Action buttons */}
      <div className="flex items-center justify-between mt-4">
        <Button
          variant="outline"
          className="border border-gray-300 hover:bg-gray-100"
          onClick={() => navigate(`/description/${job?._id}`)}
        >
          Details
        </Button>
      </div>
    </div>
  );
};

export default Job;
