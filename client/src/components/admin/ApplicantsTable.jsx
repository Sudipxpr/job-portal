import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import axios from "axios";

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
  // eslint-disable-next-line no-unused-vars
  const { applicants, loading, error } = useSelector(
    (store) => store.application
  );

  const statusHandler = async (status, id) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status }
      );
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong.");
    }
  };

  const applications = applicants?.applications || [];

  return (
    <div>
      <Table>
        <TableCaption>A list of your recently applied users</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="font-semibold text-lg bg-gray-100 text-gray-600">
              Full Name
            </TableHead>
            <TableHead className="font-semibold text-lg bg-gray-100 text-gray-600">
              Email
            </TableHead>
            <TableHead className="font-semibold text-lg bg-gray-100 text-gray-600">
              Contact
            </TableHead>
            <TableHead className="font-semibold text-lg bg-gray-100 text-gray-600">
              Resume
            </TableHead>
            <TableHead className="font-semibold text-lg bg-gray-100 text-gray-600">
              Application Date
            </TableHead>
            <TableHead className="font-semibold text-lg bg-gray-100 text-gray-600 text-right">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                No applicants found.
              </TableCell>
            </TableRow>
          ) : (
            applications.map((item) => {
              const applicant = item?.applicant || {};
              const profile = applicant?.profile || {};

              // applied date as "08 August 2025"
              const appliedDate = item?.createdAt
                ? new Date(item.createdAt).toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })
                : "NA";

              return (
                <TableRow key={item._id}>
                  <TableCell className=" text-lg">
                    {applicant.fullname || "NA"}
                  </TableCell>
                  <TableCell className=" text-lg">
                    {applicant.email || "NA"}
                  </TableCell>
                  <TableCell className=" text-lg">
                    {applicant.phoneNumber || "NA"}
                  </TableCell>
                  <TableCell className=" text-lg">
                    {profile.resume ? (
                      <a
                        className="text-blue-600 underline"
                        href={profile.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {profile.resumeOriginalName || "Resume"}
                      </a>
                    ) : (
                      "NA"
                    )}
                  </TableCell>
                  <TableCell className=" text-lg">{appliedDate}</TableCell>
                  <TableCell className="text-right">
                    <Popover>
                      <PopoverTrigger asChild>
                        <button aria-label="Open actions menu">
                          <MoreHorizontal />
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="w-32">
                        {shortlistingStatus.map((status) => (
                          <div
                            key={status}
                            onClick={() => statusHandler(status, item._id)}
                            className="px-4 py-2 cursor-pointer hover:bg-gray-100 rounded-md"
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                statusHandler(status, item._id);
                              }
                            }}
                          >
                            {status}
                          </div>
                        ))}
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
