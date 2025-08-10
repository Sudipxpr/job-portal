import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authslice";
import { toast } from "sonner";

const MAX_FILE_SIZE_MB = 5;

const UpdateProfileDialog = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);

  const [loading, setLoading] = useState(false);

  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.join(", ") || "",
  });

  const [resume, setResume] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);

  const changeEventHandler = (e) => {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validateFile = (file, type) => {
    if (!file) return true;

    const isImage = type === "image";
    const isPdf = type === "pdf";
    const sizeValid = file.size / 1024 / 1024 <= MAX_FILE_SIZE_MB;

    if (!sizeValid) {
      toast.error(`${file.name} is larger than ${MAX_FILE_SIZE_MB}MB.`);
      return false;
    }

    if (isImage && !file.type.startsWith("image/")) {
      toast.error("Profile photo must be an image.");
      return false;
    }

    if (isPdf && file.type !== "application/pdf") {
      toast.error("Resume must be a PDF.");
      return false;
    }

    return true;
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!input.fullname.trim() || !input.email.trim()) {
      toast.error("Name and Email are required.");
      return;
    }

    if (
      !validateFile(resume, "pdf") ||
      !validateFile(profilePhoto, "image")
    ) {
      return;
    }

    const formData = new FormData();
    formData.append("fullname", input.fullname.trim());
    formData.append("email", input.email.trim());
    formData.append("phoneNumber", input.phoneNumber.trim());
    formData.append("bio", input.bio.trim());
    formData.append("skills", input.skills.trim());

    if (resume) formData.append("resume", resume);
    if (profilePhoto) formData.append("profilePhoto", profilePhoto);

    try {
      setLoading(true);
      const res = await axios.post(
        `${USER_API_END_POINT}/profile/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        setOpen(false);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const renderField = (label, name, type = "text", placeholder = "") => (
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor={name} className="text-right">{label}</Label>
      <Input
        id={name}
        name={name}
        type={type}
        value={input[name]}
        onChange={changeEventHandler}
        placeholder={placeholder}
        disabled={loading}
        className="col-span-3"
      />
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={submitHandler}>
          <div className="grid gap-4 py-4">
            {renderField("Name", "fullname")}
            {renderField("Email", "email", "email")}
            {renderField("Phone", "phoneNumber", "text")}
            {renderField("Bio", "bio")}
            {renderField("Skills", "skills", "text", "e.g., HTML, CSS, JS")}

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="profilePhoto" className="text-right">
                Profile Photo
              </Label>
              <Input
                id="profilePhoto"
                name="profilePhoto"
                type="file"
                accept="image/*"
                onChange={(e) => setProfilePhoto(e.target.files?.[0])}
                disabled={loading}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="resume" className="text-right">
                Resume (PDF)
              </Label>
              <Input
                id="resume"
                name="resume"
                type="file"
                accept="application/pdf"
                onChange={(e) => setResume(e.target.files?.[0])}
                disabled={loading}
                className="col-span-3"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="submit"
              className="w-full my-4 bg-indigo-600 hover:bg-indigo-700"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Update"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileDialog;
