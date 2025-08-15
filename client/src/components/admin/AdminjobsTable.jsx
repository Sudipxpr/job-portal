import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { setAllAdminJobs } from "@/redux/Jobslice";
import { useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Eye, MoreHorizontal, Trash2, Pencil } from "lucide-react";

const AdminJobsTable = () => {
  const navigate = useNavigate();
  const { allAdminJobs } = useSelector((state) => state.job);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);

  const filteredJobs = allAdminJobs?.filter((job) =>
    job?.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async () => {
    try {
      const res = await axios.delete(
        `${JOB_API_END_POINT}/delete/${selectedJobId}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        dispatch(
          setAllAdminJobs(
            allAdminJobs.filter((job) => job._id !== selectedJobId)
          )
        );
        toast.success("Job deleted successfully!");
      } else {
        toast.error("Failed to delete job.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete job");
    } finally {
      setOpenDialog(false);
      setSelectedJobId(null);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <Input
          placeholder="Search jobs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-1/3 py-2"
        />
      </div>

      <table className="w-full border">
        <thead>
          <tr className="border-b bg-gray-100">
            <th className="p-2 text-left">Title</th>
            <th className="p-2 text-left">Company</th>
            <th className="p-2 text-left">Location</th>
            <th className="p-5 text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredJobs?.length > 0 ? (
            filteredJobs.map((job) => (
              <tr key={job._id} className="border-b">
                <td className="p-2">{job.title}</td>
                <td className="p-2">{job.company?.name}</td>
                <td className="p-2">{job.location}</td>
                <td className="p-2 float-right">
                  <div className="flex items-center gap-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <button
                          aria-label="Open actions menu"
                          disabled={!job._id}
                        >
                          <MoreHorizontal />
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="w-36">
                        <div
                          className="flex items-center w-fit gap-2 p-2 cursor-pointer hover:bg-gray-100 rounded-md"
                          onClick={() =>
                            navigate(`/admin/jobs/${job._id}/applicants`)
                          }
                          role="button"
                          tabIndex={0}
                        >
                          <Eye className="w-4" />
                          <span>Applicants</span>
                        </div>
                        <div
                          className="flex items-center w-fit gap-2 p-2 cursor-pointer hover:bg-gray-100 rounded-md"
                          onClick={() => navigate(`/admin/jobs/edit/${job._id}`)}
                          role="button"
                          tabIndex={0}
                        >
                          <Pencil className="w-4" />
                          <span>Edit</span>
                        </div>
                        <div
                          className="flex items-center w-fit gap-2 p-2 cursor-pointer hover:bg-gray-100 rounded-md"
                          onClick={() => {
                            setSelectedJobId(job._id);
                            setOpenDialog(true);
                          }}
                          role="button"
                        >
                          <Trash2 className="w-4 stroke-red-500" />
                          <span className="text-red-500">Delete</span>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center text-gray-500 p-4">
                No jobs found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the job
              posting.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Confirm Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminJobsTable;
