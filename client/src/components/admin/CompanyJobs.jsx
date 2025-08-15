import React from "react";

import Navbar from "../shared/Navbar";

import { Button } from "../ui/button";

import { useNavigate } from "react-router-dom";

import AdminjobsTable from "./AdminjobsTable";
import UseGetAllAdminJobs from "@/hooks/UseGetAllAdminJobs";

const CompanyJobs = () => {
  UseGetAllAdminJobs();

  const navigate = useNavigate();

  return (
    <div>
      <Navbar />
      <div className="pt-16">
        <div className=" max-w-6xl mx-auto my-10">
          <div className="flex items-center justify-between float-end">
            <Button className="" onClick={() => navigate("/admin/jobs/create")}>
              New Job
            </Button>
          </div>
          <AdminjobsTable />
        </div>
      </div>
    </div>
  );
};

export default CompanyJobs;
