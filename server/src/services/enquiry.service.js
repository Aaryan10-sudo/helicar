const Enquiry = require("../../models/enquiry.model");

async function createEnquiryService(enquiryData) {
  try {
    return await Enquiry.create(enquiryData);
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getAllEnquiryService() {
  try {
    return await Enquiry.findAll({});
  } catch (error) {
    throw new Error(error.message);
  }
}

async function deleteEnquiryService(id) {
  try {
    const result = await Enquiry.destroy({ where: { id } });
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  createEnquiryService,
  getAllEnquiryService,
  deleteEnquiryService,
};
