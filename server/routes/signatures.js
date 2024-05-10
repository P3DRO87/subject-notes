const { Router } = require("express");

const { validateJWT } = require("../middlewares/validate-jwt");
const {
   getAllSignatures,
   createNewSingnature,
   updateSignatureName,
   deleteSignature,
   getSignature,
} = require("../controllers/signatures");
const { validateFields } = require("../middlewares/validate-fields");
const { check } = require("express-validator");

const router = Router();

router.get("/:id", [validateJWT], getSignature);

router.get("/", [validateJWT], getAllSignatures);

router.post(
   "/new",
   [
      validateJWT,
      check("name", "The name signature is required").not().isEmpty(),
      validateFields,
   ],
   createNewSingnature
);

router.put(
   "/update-name/:id",
   [
      validateJWT,
      check("name", "The name signature is required").not().isEmpty(),
      check("id", "Invalid signature id").isMongoId(),
      validateFields,
   ],
   updateSignatureName
);

router.delete(
   "/delete/:id",
   [validateJWT, check("id", "Invalid signature id").isMongoId()],
   deleteSignature
);

module.exports = router;
