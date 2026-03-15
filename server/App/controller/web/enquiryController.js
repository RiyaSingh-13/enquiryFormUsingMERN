const enquiryModel = require("../../model/userEnquiryModel");

let enquiryInsert = (req, res) => {
  let { name, email, phone, message } = req.body;
  console.log(req.body);
  let enquiry = new enquiryModel({
    name,
    email,
    phone,
    message
  });

  enquiry.save()
    .then(() => {
      res.status(200).json({
        status: true,
        message: "Enquiry saved successfully"
      });
      console.log("Data inserted");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        status: false,
        message: "Enquiry not saved: " + err.message
      });
    });
};

let enquiryList = async (req, res) => {
  try {
    let enquiry = await enquiryModel.find();
    res.status(200).json({
      status: true,
      enquiryList: enquiry
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Error fetching enquiries"
    });
  }
};

let enquiryDelete = async (req, res) => {
  try {
    let enquiryId = req.params.id;
    let delEnquiry = await enquiryModel.deleteOne({ _id: enquiryId });
    res.status(200).json({
      status: true,
      message: "Enquiry deleted successfully",
      id: enquiryId
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Error deleting enquiry"
    });
  }
};

let enquiryUpdate = async (req, res) => {
  try {
    let enquiryID = req.params.id;
    let { name, email, phone, message } = req.body;
    let updateObj = {
      name,
      email,
      phone,
      message
    };
    let updateEnquiry = await enquiryModel.updateOne(
      { _id: enquiryID },
      { $set: updateObj }
    );
    res.status(200).json({
      status: true,
      message: "Enquiry updated successfully",
      updateEnquiry
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Error updating enquiry"
    });
  }
};

let enquirySingleRow = async (req, res) => {
  try {
    let enId = req.params.id;
    let enquiry = await enquiryModel.findOne({ _id: enId });
    res.status(200).json({
      status: true,
      enquiry
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Error fetching enquiry"
    });
  }
};

module.exports = {
  enquiryInsert,
  enquiryList,
  enquiryDelete,
  enquiryUpdate,
  enquirySingleRow
};