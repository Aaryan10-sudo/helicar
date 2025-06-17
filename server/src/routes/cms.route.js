const express = require("express");
const cmsrouter = express.Router();
const cmsController = require("../controller/cms.controller");

const isAuthenticated = require("../middleware/isAuthenticated");
const { isAuthorized } = require("../middleware/isAuthorized");

cmsrouter.get("/hero", cmsController.getHero);

cmsrouter.put(
  "/hero",
  isAuthenticated,
  isAuthorized("admin"),
  cmsController.updateHero
);

cmsrouter.get("/why-choose-us", cmsController.getWhyChooseUs);
cmsrouter.put(
  "/why-choose-us",
  isAuthenticated,
  isAuthorized("admin"),
  cmsController.updateWhyChooseUs
);
cmsrouter.get("/blog", cmsController.getBlogSection);

cmsrouter.put(
  "/blog",
  isAuthenticated,
  isAuthorized("admin"),
  cmsController.updateBlogSection
);
cmsrouter.get("/our-mission", cmsController.getOurMission);

cmsrouter.put(
  "/our-mission",
  isAuthenticated,
  isAuthorized("admin"),
  cmsController.updateOurMission
);

cmsrouter.get("/client-reviews", cmsController.getClientReviews);

cmsrouter.put(
  "/client-reviews",
  isAuthenticated,
  isAuthorized("admin"),
  cmsController.updateClientReviews
);

cmsrouter.get("/rent-vechicle", cmsController.getVehicleRentalService);
cmsrouter.put(
  "/rent-vechicle",
  isAuthenticated,
  isAuthorized("admin"),
  cmsController.updateVehicleRentalService
);
cmsrouter.get("/our-company", cmsController.getOurCompany);

cmsrouter.put(
  "/our-company",
  isAuthenticated,
  isAuthorized("admin"),
  cmsController.updateOurCompany
);
cmsrouter.get("/tariff-rates", cmsController.getTariffRates);

cmsrouter.put(
  "/tariff-rates",
  isAuthenticated,
  isAuthorized("admin"),
  cmsController.updateTariffRates
);

cmsrouter.get("/trekking", cmsController.getTrekkingSection);

cmsrouter.put(
  "/trekking",
  isAuthenticated,
  isAuthorized("admin"),
  cmsController.updateTrekkingSection
);

module.exports = cmsrouter;
