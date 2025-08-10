import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { useSelector } from "react-redux";

const AppliedJob = () => {
  const { allAppliedJobs } = useSelector((store) => store.job);

  // Badge color handler
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "accepted":
        return "bg-green-200 text-green-900 hover:bg-green-100";
      case "rejected":
        return "bg-red-200 text-red-900 hover:bg-red-100";
      case "pending":
        return "bg-yellow-200 text-yellow-900 hover:bg-yellow-100";
      default:
        return "bg-gray-200 text-gray-900 hover:bg-gray-100";
    }
  };

  // Sort by newest date first
  const sortedJobs = [...allAppliedJobs].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <div className="p-4">
      <Table>
        <TableCaption>A list of jobs you have applied for</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedJobs.length <= 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-gray-500">
                You haven't applied for any job yet.
              </TableCell>
            </TableRow>
          ) : (
            sortedJobs.map((appliedJob) => (
              <TableRow key={appliedJob._id} className="hover:bg-gray-50">
                <TableCell>
                  {new Date(appliedJob.createdAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </TableCell>
                <TableCell className="font-medium">
                  {appliedJob.job.title}
                </TableCell>
                <TableCell>{appliedJob.job.company.name}</TableCell>
                <TableCell className="text-right">
                  <Badge
                    className={`${getStatusColor(appliedJob.status)} capitalize`}
                  >
                    {appliedJob.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJob;
