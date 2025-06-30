const CmsContent = require("../../models/cms.model");

exports.getHero = async (req, res) => {
  try {
    const hero = await CmsContent.findOne({ where: { section: "hero" } });

    res.status(200).json({
      success: true,
      data: hero,
    });
  } catch (error) {
    console.error("Error fetching hero section:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

exports.updateHero = async (req, res) => {
  try {
    const { content } = req.body;

    // Check that content is an object with required keys

    let hero = await CmsContent.findOne({ where: { section: "hero" } });

    if (hero) {
      await hero.update({ content });
    } else {
      hero = await CmsContent.create({
        section: "hero",
        content,
        status: true,
      });
    }

    res.status(200).json({
      success: true,
      message: "Hero section updated successfully",
      data: hero,
    });
  } catch (error) {
    console.error("Error updating hero section:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

exports.getWhyChooseUs = async (req, res) => {
  try {
    const section = await CmsContent.findOne({
      where: { section: "whyChooseUs" },
    });

    res.status(200).json({
      success: true,
      data: section,
    });
  } catch (error) {
    console.error("Error fetching Why Choose Us section:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

exports.updateWhyChooseUs = async (req, res) => {
  try {
    const { content } = req.body;

    // Validate structure
    // if (
    //   !content ||
    //   typeof content !== "object" ||
    //   !content.mainImage ||
    //   !Array.isArray(content.features) ||
    //   content.features.length !== 5 ||
    //   !content.features.every((item) => item.image && item.title)
    // ) {
    //   return res.status(400).json({
    //     success: false,
    //     message:
    //       "Invalid content format. Must include mainImage and exactly 5 features with image and title.",
    //   });
    // }

    let section = await CmsContent.findOne({
      where: { section: "whyChooseUs" },
    });

    if (section) {
      await section.update({ content });
    } else {
      section = await CmsContent.create({
        section: "whyChooseUs",
        content,
        status: true,
      });
    }

    res.status(200).json({
      success: true,
      message: "Why Choose Us section updated successfully",
      data: section,
    });
  } catch (error) {
    console.error("Error updating Why Choose Us section:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

exports.getBlogSection = async (req, res) => {
  try {
    const section = await CmsContent.findOne({ where: { section: "blog" } });

    res.status(200).json({
      success: true,
      data: section,
    });
  } catch (error) {
    console.error("Error fetching blog section:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

exports.updateBlogSection = async (req, res) => {
  try {
    const { content } = req.body;

    // Validate
    if (
      !content ||
      typeof content !== "object" ||
      !content.header ||
      !content.headerParagraph ||
      !Array.isArray(content.blogs) ||
      !content.blogs.every((blog) => blog.image && blog.date && blog.paragraph)
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid format. Must include header, headerParagraph, and an array of blogs with image, date, and paragraph.",
      });
    }

    let section = await CmsContent.findOne({ where: { section: "blog" } });

    if (section) {
      await section.update({ content });
    } else {
      section = await CmsContent.create({
        section: "blog",
        content,
        status: true,
      });
    }

    res.status(200).json({
      success: true,
      message: "Blog section updated successfully",
      data: section,
    });
  } catch (error) {
    console.error("Error updating blog section:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

exports.getOurMission = async (req, res) => {
  try {
    const section = await CmsContent.findOne({
      where: { section: "ourMission" },
    });

    res.status(200).json({
      success: true,
      data: section,
    });
  } catch (error) {
    console.error("Error fetching Our Mission section:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

exports.updateOurMission = async (req, res) => {
  try {
    const { content } = req.body;

    if (
      !content ||
      typeof content !== "object" ||
      !content.header ||
      !content.headerDescription ||
      !content.image
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid format. Must include header, headerDescription, and image.",
      });
    }

    let section = await CmsContent.findOne({
      where: { section: "ourMission" },
    });

    if (section) {
      await section.update({ content });
    } else {
      section = await CmsContent.create({
        section: "ourMission",
        content,
        status: true,
      });
    }

    res.status(200).json({
      success: true,
      message: "Our Mission section updated successfully",
      data: section,
    });
  } catch (error) {
    console.error("Error updating Our Mission section:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

exports.getClientReviews = async (req, res) => {
  try {
    const section = await CmsContent.findOne({
      where: { section: "clientReviews" },
    });

    res.status(200).json({
      success: true,
      data: section,
    });
  } catch (error) {
    console.error("Error fetching client reviews:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

exports.updateClientReviews = async (req, res) => {
  try {
    const { content } = req.body;

    // Validate content structure
    // if (
    //   !content ||
    //   typeof content !== "object" ||
    //   !content.header ||
    //   !content.headerDescription ||
    //   !Array.isArray(content.reviews) ||
    //   content.reviews.length > 4 || // Allow up to 4 reviews
    //   !content.reviews.every(
    //     (review) =>
    //       review.name &&
    //       review.photo &&
    //       review.comment &&
    //       typeof review.rating === "number" &&
    //       review.rating >= 1 &&
    //       review.rating <= 5
    //   )
    // ) {
    //   return res.status(400).json({
    //     success: false,
    //     message:
    //       "Invalid format. Must include header, headerDescription, and up to 4 reviews with name, photo, comment, and rating (1–5).",
    //   });
    // }

    let section = await CmsContent.findOne({
      where: { section: "clientReviews" },
    });

    if (section) {
      await section.update({ content });
    } else {
      section = await CmsContent.create({
        section: "clientReviews",
        content,
        status: true,
      });
    }

    res.status(200).json({
      success: true,
      message: "Client Reviews section updated successfully",
      data: section,
    });
  } catch (error) {
    console.error("Error updating client reviews:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

exports.getVehicleRentalService = async (req, res) => {
  try {
    const section = await CmsContent.findOne({
      where: { section: "vehicleRentalService" },
    });

    res.status(200).json({
      success: true,
      data: section,
    });
  } catch (error) {
    console.error("Error fetching vehicle rental service:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

exports.updateVehicleRentalService = async (req, res) => {
  try {
    const { content } = req.body;

    // Validation

    let section = await CmsContent.findOne({
      where: { section: "vehicleRentalService" },
    });

    if (section) {
      await section.update({ content });
    } else {
      section = await CmsContent.create({
        section: "vehicleRentalService",
        content,
        status: true,
      });
    }

    res.status(200).json({
      success: true,
      message: "Vehicle Rental Service section updated successfully",
      data: section,
    });
  } catch (error) {
    console.error("Error updating vehicle rental service:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

exports.getOurCompany = async (req, res) => {
  try {
    const section = await CmsContent.findOne({
      where: { section: "ourCompany" },
    });

    res.status(200).json({
      success: true,
      data: section,
    });
  } catch (error) {
    console.error("Error fetching Our Company section:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

exports.updateOurCompany = async (req, res) => {
  try {
    const { content } = req.body;

    // Validate structure

    let section = await CmsContent.findOne({
      where: { section: "ourCompany" },
    });

    if (section) {
      await section.update({ content });
    } else {
      section = await CmsContent.create({
        section: "ourCompany",
        content,
        status: true,
      });
    }

    res.status(200).json({
      success: true,
      message: "Our Company section updated successfully",
      data: section,
    });
  } catch (error) {
    console.error("Error updating Our Company section:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// a bit

exports.updateTariffRates = async (req, res) => {
  try {
    const { header, paragraph } = req.body;

    const content = {
      header,
      paragraph,
    };

    console.log(content);

    let section = await CmsContent.findOne({
      where: { section: "tariffRates" },
    });

    if (section) {
      await section.update({ content });
    } else {
      section = await CmsContent.create({
        section: "tariffRates",
        content,
        status: true,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Tariff Rates section saved successfully",
      data: section,
    });
  } catch (error) {
    console.error("Error in updateTariffRates:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

exports.getTariffRates = async (req, res) => {
  try {
    const section = await CmsContent.findOne({
      where: { section: "tariffRates" },
    });

    return res.status(200).json({
      success: true,
      data: section.content,
    });
  } catch (error) {
    console.error("Error in getTariffRates:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
exports.getTrekkingSection = async (req, res) => {
  try {
    const section = await CmsContent.findOne({
      where: { section: "trekking" },
    });

    return res.status(200).json({
      success: true,
      data: section.content,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
// controllers/cmsController.js
exports.updateTrekkingSection = async (req, res) => {
  try {
    const { header, headerDescription, image, imageDescription, paragraph } =
      req.body;

    const content = {
      header,
      headerDescription,
      image,
      imageDescription,
      paragraph,
    };

    let section = await CmsContent.findOne({ where: { section: "trekking" } });

    if (section) {
      await section.update({ content });
    } else {
      section = await CmsContent.create({
        section: "trekking",
        content,
        status: true,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Trekking section updated successfully",
      data: section,
    });
  } catch (error) {
    console.error("Error in updateTrekkingSection:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
