import React, { useEffect, useState } from "react";
import axios from "axios";
import { Checkbox, Button, Label, TextInput, Textarea } from "flowbite-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import EnquiryList from "./enq/enquiryList";

// import { get } from "../../server/App/route/web/enquiryRoutes";

export default function Enquiry() {
  const [enquiryList, setEnquiryList] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    id: "",
  });

  const saveEnquiry = (e) => {
    e.preventDefault();
    if (formData._id) {
      //
      axios
        .put(
          `http://localhost:3000/api/website/enquiry/update/${formData._id}`,
          formData,
        )
        .then((res) => {
          console.log(res.data);
          toast.success("enquiry updated successfully", {
            autoClose: 5000,
          });
          setFormData({
            name: "",
            email: "",
            phone: "",
            message: "",
            _id: "",
          });
          getAllEnquiry();
        });
    } else {
      axios
        .post("http://localhost:3000/api/website/enquiry/insert", formData)
        .then((res) => {
          console.log(res.data);
          toast.success("Data saved successfully", {
            autoClose: 3000,
          });
          setFormData({
            name: "",
            email: "",
            phone: "",
            message: "",
          });

          getAllEnquiry(); // Refresh the list after saving
        });
    }
  };

  const getAllEnquiry = () => {
    axios
      .get("http://localhost:3000/api/website/enquiry/enquiryList")
      .then((res) => {
        return res.data;
      })
      .then((finalData) => {
        if (finalData.status) {
          setEnquiryList(finalData.enquiryList);
        }
      });
    // axios
    //   .get("http://localhost:3000/api/website/enquiry/enquiryList")
    //   .then((res) => res.data)
    //   .then((finalData) => {
    //     if (finalData.status && Array.isArray(finalData.enquiryList)) {
    //       setEnquiryList(finalData.enquiryList);
    //     } else {
    //       setEnquiryList([]);
    //     }
    //   });
  };

  const getValue = (e) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    setFormData((oldData) => ({
      ...oldData,
      [inputName]: inputValue,
    }));
  };

  useEffect(() => {
    getAllEnquiry();
  }, []);

  return (
    <div>
      <ToastContainer />
      <h2 className="text-2xl font-extrabold text-amber-600 text-center">
        User Enquiry
      </h2>
      <div className="grid grid-cols-[30%_70%] gap-10">
        <div className="bg-gray-300 p-4">
          <h2 className="text-2xl font-bold">Enquiry form</h2>
          <form onSubmit={saveEnquiry}>
            <div className="py-3">
              <Label htmlFor="name" value="Your Name" />
              <TextInput
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={getValue}
                placeholder="Enter your Name"
                required
                autoComplete="name"
              />
            </div>
            <div className="py-3">
              <Label htmlFor="email" value="Your email" />
              <TextInput
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={getValue}
                placeholder="Enter your email"
                required
                autoComplete="email"
              />
            </div>
            <div className="py-3">
              <Label htmlFor="phone" value="Your phone" />
              <TextInput
                type="text"
                id="phone"
                value={formData.phone}
                onChange={getValue}
                name="phone"
                placeholder="Enter your phone"
                required
                autoComplete="tel" // Add this line
              />
            </div>
            <div className="py-3">
              <Label htmlFor="message" value="Your message" />
              <Textarea
                name="message"
                id="message"
                value={formData.message}
                onChange={getValue}
                placeholder="Leave a message..."
                required
                rows={4}
              />
            </div>
            <div className="py-3">
              <Button type="submit" className="w-full bg-blue-600">
                Submit
              </Button>
            </div>
          </form>
        </div>
        <EnquiryList
          data={enquiryList}
          getAllEnquiry={getAllEnquiry}
          setFormData={setFormData}
        />
      </div>
    </div>
  );
}
