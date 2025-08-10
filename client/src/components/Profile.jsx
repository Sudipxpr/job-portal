import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact2, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJob from "./AppliedJob";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/UseGetAppliedJobs";

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  if (!user) return <div className="text-center py-10">Loading profile...</div>;

  const { fullname, email, phoneNumber, profile } = user;
  const { bio, skills, resume, resumeOriginalName } = profile || {};
  const hasSkills = Array.isArray(skills) && skills.length > 0;
  const hasResume = !!resume;

  return (
    <>
      <Navbar />

      <div className="pt-16 max-w-4xl mx-auto bg-white border border-gray-300 rounded-2xl my-20 p-5">
        {/* Top Section: Avatar + Bio */}
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="w-20 h-20 mb-4">
              <AvatarImage
                src={
                  user?.profile?.profilePhoto ||
                  "https://ui-avatars.com/api/?name=User"
                }
                alt="User avatar"
              />
            </Avatar>
            <div>
              <h1 className="font-medium text-xl">{fullname}</h1>
              <p className="text-gray-600">{bio || "No bio available"}</p>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={() => setOpen(true)}
            aria-label="Edit Profile"
            title="Edit Profile"
          >
            <Pen size={16} />
          </Button>
        </div>

        {/* Contact Information */}
        <div className="my-5 space-y-3">
          <div className="flex items-center gap-4">
            <Mail />
            <span>{email || "Not provided"}</span>
          </div>
          <div className="flex items-center gap-4">
            <Contact2 />
            <span>{phoneNumber || "Not provided"}</span>
          </div>

          {/* Skills */}
          <div>
            <h2 className="font-bold my-2 text-gray-700">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {hasSkills ? (
                skills.map((skill, index) => (
                  <Badge
                    key={index}
                    className="bg-cyan-500 h-7 font-bold text-md rounded-2xl px-4 cursor-pointer"
                  >
                    {skill}
                  </Badge>
                ))
              ) : (
                <span>NA</span>
              )}
            </div>
          </div>

          {/* Resume */}
          <div className="grid w-full max-w-sm gap-2 pt-3">
            <Label className="text-gray-700 text-md font-bold">Resume</Label>
            {hasResume ? (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={resume}
                className="text-blue-500 hover:underline"
              >
                {resumeOriginalName || "View Resume"}
              </a>
            ) : (
              <span>NA</span>
            )}
          </div>
        </div>
      </div>

      {/* Applied Jobs */}
      <div className="max-w-5xl my-5 mx-auto bg-white rounded-2xl p-4">
        <h1 className="text-xl font-semibold mb-4">Applied Jobs</h1>
        <AppliedJob />
      </div>

      {/* Profile Update Dialog */}
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </>
  );
};

export default Profile;
