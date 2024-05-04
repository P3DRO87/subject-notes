const { Router } = require("express");
const {
   loginUser,
   registerUser,
   validateToken,
   googleLogin,
} = require("../controllers/user");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");

const router = Router();

router.post("/login", loginUser);

router.post("/google", googleLogin);

router.post(
   "/register",
   [
      check("name", "Name is required").not().isEmpty(),
      check("email", "Invalid email").isEmail(),
      check("password", "Password should be more than 5 characters").isLength({ min: 6 }),
      validateFields,
   ],
   registerUser
);

router.get("/renew-session", [validateJWT], validateToken);

module.exports = router;
