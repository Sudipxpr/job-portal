import React, { useEffect, useState } from "react";
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
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminjobsTable = () => {
  const { searchCompanyByText, loading: companyLoading, error: companyError } = useSelector(
    (store) => store.company
  );
  const { allAdminJobs, loading: jobsLoading, error: jobsError } = useSelector(
    (store) => store.job
  );

  const navigate = useNavigate();
  const [filteredJobs, setFilteredJobs] = useState(allAdminJobs || []);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (!Array.isArray(allAdminJobs) || allAdminJobs.length === 0) {
      setFilteredJobs([]);
      return;
    }

    const searchText = searchCompanyByText?.toLowerCase() || "";

    if (searchText) setIsSearching(true);
    else setIsSearching(false);

    const filtered = allAdminJobs.filter((job) => {
      if (!searchText) return true;

      const companyName = job?.company?.name?.toLowerCase() || "";
      const jobTitle = job?.title?.toLowerCase() || "";

      return companyName.includes(searchText) || jobTitle.includes(searchText);
    });

    setFilteredJobs(filtered);
  }, [allAdminJobs, searchCompanyByText]);

  // Handle loading and error states first
  if (companyLoading || jobsLoading) {
    return <div className="text-center p-5">Loading jobs...</div>;
  }

  if (companyError || jobsError) {
    return (
      <div className="text-center text-red-600 p-5">
        Error loading jobs. Please try again later.
      </div>
    );
  }

  return (
    <div className="my-5">
      <Table>
        <TableCaption>A list of your posted Jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="font-semibold text-lg bg-gray-100 text-gray-600">
              Company Name
            </TableHead>
            <TableHead className="font-semibold text-lg bg-gray-100 text-gray-600">
              Role
            </TableHead>
            <TableHead className="font-semibold text-lg bg-gray-100 text-gray-600">
              Date
            </TableHead>
            <TableHead className="text-right p-1 text-lg bg-gray-100 text-gray-600 font-semibold">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* No jobs at all */}
          {allAdminJobs.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                No Jobs Listed
              </TableCell>
            </TableRow>
          )}

          {/* No matches after search */}
          {allAdminJobs.length > 0 && filteredJobs.length === 0 && isSearching && (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                No jobs matched your search "{searchCompanyByText}"
              </TableCell>
            </TableRow>
          )}

          {/* Show filtered jobs */}
          {filteredJobs.map((job) => (
            <TableRow key={job._id ?? job.title}>
              <TableCell className="text-lg">{job.company?.name ?? "-"}</TableCell>
              <TableCell className="text-lg">{job.title ?? "-"}</TableCell>
              <TableCell className="text-lg">
                {job.createdAt ? new Date(job.createdAt).toLocaleDateString() : "-"}
              </TableCell>
              <TableCell className="text-right p-1">
                <Popover>
                  <PopoverTrigger asChild>
                    <button aria-label="Open actions menu" disabled={!job._id}>
                      <MoreHorizontal />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-32">
                   
                    <div
                      className="flex items-center w-fit gap-2 p-2 cursor-pointer hover:bg-gray-100 rounded-md"
                      onClick={() => job._id && navigate(`/admin/jobs/${job._id}/applicants`)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if ((e.key === "Enter" || e.key === " ") && job._id) {
                          navigate(`/admin/jobs/${job._id}/applicants`);
                        }
                      }}
                    >
                      <Eye className="w-4" />
                      <span>Applicants</span>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminjobsTable;
