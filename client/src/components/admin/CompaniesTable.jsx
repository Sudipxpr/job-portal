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
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector(
    (store) => store.company
  );

  const navigate=useNavigate();
  const hasCompanies = Array.isArray(companies) && companies.length > 0;
  const [filterCompany, setFilterCompany] = useState([]);

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
                      <div className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-100 rounded-md" onClick={()=>navigate(`/admin/companies/${company._id}`)}>
                        <Edit2 className="w-5" />
                        <span>Edit</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;
