import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { JOB_API_END_POINT } from "@/utils/constant";
import { useSelector } from "react-redux";
import UseGetJobById from "@/hooks/UseGetJobById.jsx";

const EditJob = () => {
  const params = useParams();
  UseGetJobById(params.id);

  const { singleJob } = useSelector((store) => store.job);

  const [input, setInput] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    experience: "",
    jobType: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.put(
        `${JOB_API_END_POINT}/update/${params.id}`,
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (singleJob) {
      setInput({
        title: singleJob.title ?? "",
        description: singleJob.description ?? "",
        location: singleJob.location ?? "",
        salary: singleJob.salary ?? "",
        experience: singleJob.experience ?? "",
        jobType: singleJob.jobType ?? "",
      });
    }
  }, [singleJob]);

  return (
    <div>
      <Navbar />
      <div className="pt-16">
        <div className="max-w-xl mx-auto my-10">
          <form onSubmit={submitHandler}>
            <div className="flex items-center gap-5 p-8">
              <Button
                onClick={() => navigate("/admin/jobs")}
                className="flex items-center gap-2 text-gray-700 hover:text-gray-800 font-semibold"
                variant="outline"
              >
                <ArrowLeft />
                <span>Back</span>
              </Button>
              <h1 className="font-bold text-xl">Edit Job</h1>
            </div>

            <div className="grid grid-cols-2 gap-4 p-5">
              <div>
                <Label>Job Title</Label>
                <Input
                  type="text"
                  name="title"
                  value={input.title ?? ""}
                  onChange={changeEventHandler}
                />
              </div>
              <div>
                <Label>Description</Label>
                <Input
                  type="text"
                  name="description"
                  value={input.description ?? ""}
                  onChange={changeEventHandler}
                />
              </div>
              <div>
                <Label>Location</Label>
                <Input
                  type="text"
                  name="location"
                  value={input.location ?? ""}
                  onChange={changeEventHandler}
                />
              </div>
              <div>
                <Label>Salary</Label>
                <Input
                  type="number"
                  name="salary"
                  value={input.salary ?? ""}
                  onChange={changeEventHandler}
                  min={0}
                />
              </div>
              <div>
                <Label>Experience (years)</Label>
                <Input
                  type="number"
                  name="experience"
                  value={input.experience ?? ""}
                  onChange={changeEventHandler}
                  min={0}
                />
              </div>
              <div>
                <Label>Job Type</Label>
                <Input
                  type="text"
                  name="jobType"
                  value={input.jobType ?? ""}
                  onChange={changeEventHandler}
                />
              </div>
            </div>

            {loading ? (
              <Button className="w-full my-4">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please Wait
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full my-4 bg-indigo-500 shadow-lg shadow-indigo-500/50 hover:bg-indigo-500/90 font-bold"
              >
                Update Job
              </Button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditJob;
