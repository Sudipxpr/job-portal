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
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal, Trash2 } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import axios from "axios";
import { toast } from "sonner";
import { COMPANY_API_END_POINT } from "@/utils/constant"; // Make sure this is defined
import { setCompanies } from "@/redux/companySlice"; // Update with actual slice

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector(
    (store) => store.company
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const hasCompanies = Array.isArray(companies) && companies.length > 0;
  const [filterCompany, setFilterCompany] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);

  useEffect(() => {
    if (!hasCompanies) {
      setFilterCompany([]);
      return;
    }

    const filtered = companies.filter((company) => {
      if (!searchCompanyByText) return true;
      return company?.name
        ?.toLowerCase()
        .includes(searchCompanyByText.toLowerCase());
    });

    setFilterCompany(filtered);
  }, [companies, searchCompanyByText, hasCompanies]);

  const handleDelete = async () => {
    try {
      const res = await axios.delete(
        `${COMPANY_API_END_POINT}/delete/${selectedCompanyId}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        dispatch(
          setCompanies(companies.filter((c) => c._id !== selectedCompanyId))
        );
        toast.success("Company deleted successfully!");
      } else {
        toast.error("Failed to delete company.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete company");
    } finally {
      setOpenDialog(false);
      setSelectedCompanyId(null);
    }
  };

  return (
    <div className="my-5">
      <Table>
        <TableCaption>A list of your recent registered companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="font-semibold text-lg bg-gray-100 text-gray-600">Logo</TableHead>
            <TableHead className="font-semibold text-lg bg-gray-100 text-gray-600">Name</TableHead>
            <TableHead className="font-semibold text-lg bg-gray-100 text-gray-600">Date</TableHead>
            <TableHead className="text-right p-1 font-semibold text-lg bg-gray-100 text-gray-600">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!hasCompanies ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                No Companies Listed
              </TableCell>
            </TableRow>
          ) : (
            filterCompany.map((company) => (
              <TableRow key={company._id}>
                <TableCell>
                  <Avatar>
                    <AvatarImage src={company.logo || ""} alt="Company Logo" />
                  </Avatar>
                </TableCell>
                <TableCell className=" text-lg">{company.name}</TableCell>
                <TableCell className=" text-lg">{company.createdAt?.split("T")[0]}</TableCell>
                <TableCell className="text-right p-1">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      <div
                        className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-100 rounded-md"
                        onClick={() => navigate(`/admin/companies/${company._id}`)}
                      >
                        <Edit2 className="w-5" />
                        <span>Edit</span>
                      </div>
                      <div
                        className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-100 rounded-md"
                        onClick={() => {
                          setSelectedCompanyId(company._id);
                          setOpenDialog(true);
                        }}
                      >
                        <Trash2 className="w-5 stroke-red-500" />
                        <span className="text-red-500">Delete</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the company.
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

export default CompaniesTable;