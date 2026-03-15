import React from "react";

import {
  Table,
  TableHead,
  TableHeadCell,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "flowbite-react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

export default function EnquiryList({ data = [], getAllEnquiry, setFormData }) {
  let deleteRow = (id) => {
    axios
      .delete(`http://localhost:3000/api/website/enquiry/delete/${id} `)
      .then((res) => {
        toast.success("deleted successfully");
        getAllEnquiry();
        console.log(res.data);
      });
    alert("deleted a row with id " + id);
  };

  let editRow = (id) => {
    alert("editing a row with id " + id);

    axios
      .get(`http://localhost:3000/api/website/enquiry/single/${id}`)
      .then((res) => {
        let data = res.data;
        setFormData(data.enquiry);
      });
  };
  return (
    <div className="bg-gray-200 p-4">
      <ToastContainer />
      <h2 className="text-2xl font-bold">Enquiry list</h2>
      <div className="overflow-x-auto">
        <Table hoverable>
          <TableHead>
            <TableRow>
              <TableHeadCell>Sr. No</TableHeadCell>
              <TableHeadCell>Name</TableHeadCell>
              <TableHeadCell>Email</TableHeadCell>
              <TableHeadCell>Phone</TableHeadCell>
              <TableHeadCell>Message</TableHeadCell>
              <TableHeadCell>Actions</TableHeadCell>
            </TableRow>
          </TableHead>

          <TableBody className="divide-y">
            {data.length >= 1 ? (
              data.map((item, index) => {
                return (
                  <TableRow
                    key={item._id}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {index + 1}
                    </TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{item.phone}</TableCell>
                    <TableCell>{item.message}</TableCell>
                    <TableCell className="flex">
                      <Button
                        className="bg-red-500 "
                        onClick={() => deleteRow(item._id)}
                      >
                        Delete
                      </Button>
                      <Button
                        color="success"
                        onClick={() => editRow(item._id)}
                        className="bg-blue-500 text-amber-50 ml-2"
                      >
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  No enquiries found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
