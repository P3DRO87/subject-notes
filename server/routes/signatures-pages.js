const { Router } = require("express");

const { validateJWT } = require("../middlewares/validate-jwt");
const { validateFields } = require("../middlewares/validate-fields");
const { check } = require("express-validator");
const {
   addNewSignaturePage,
   getAllSignaturesPages,
} = require("../controllers/signatures-pages");

const router = Router();

router.post(
   "/:id/new",
   [validateJWT, check("id", "Invalid signature id").isMongoId(), validateFields],
   addNewSignaturePage
);

router.get(
   "/:id/all",
   [validateJWT, check("id", "Invalid signature id").isMongoId(), validateFields],
   getAllSignaturesPages
);

module.exports = router;
