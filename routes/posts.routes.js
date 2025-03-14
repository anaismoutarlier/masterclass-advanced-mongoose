const { Router } = require("express");
const { Post } = require("../db");
const router = Router();

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const post = await Post.findById(id).populate("likedBy");

  res.json({ result: true, post });
});
module.exports = router;
