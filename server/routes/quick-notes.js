const { Router } = require("express");
const { validateJWT } = require("../middlewares/validate-jwt");
const {
   getNotes,
   getNote,
   addNewNote,
   updateNote,
   deleteNote,
} = require("../controllers/quick-notes");
const { validateFields } = require("../middlewares/validate-fields");
const { check } = require("express-validator");

const router = Router();

router.get("/", [validateJWT, validateFields], getNotes);

router.get(
   "/:id",
   [validateJWT, check("id", "Invalid note id").isMongoId(), validateFields],
   getNote
);

router.post(
   "/new",
   [
      validateJWT,
      check("title", "Title  is required").not().isEmpty(),
      check("content", "Content  is required").not().isEmpty(),
      validateFields,
   ],
   addNewNote
);

router.put(
   "/update/:id",
   [validateJWT, check("id", "Invalid note id").isMongoId(), validateFields],
   updateNote
);

router.delete(
   "/delete/:id",
   [validateJWT, check("id", "Invalid note id").isMongoId(), validateFields],
   deleteNote
);

module.exports = router;
