const Enquiry = require("../models/enquiry.model");
const {
  createEnquiryService,
  getAllEnquiryService,
  deleteEnquiryService,
} = require("../services/enquiry.service");

exports.createEnquiry = async (req, res, next) => {
  const enquiryData = req.body;
  try {
    const result = await createEnquiryService(enquiryData);
    res.status(200).json({
      success: true,
      message: "Enquiry Submitted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error submitting enquiry",
      error: error.message,
    });
  }
};

exports.getAllEnquiry = async (req, res, next) => {
  try {
    const result = await getAllEnquiryService();
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching enquiry",
      error: error.message,
    });
  }
};

exports.deleteEnquiry = async (req, res, next) => {
  const id = req.query.id;
  try {
    const result = await deleteEnquiryService(id);
    res.status(200).json({
      success: true,
      message: "Enquiry deleted successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
