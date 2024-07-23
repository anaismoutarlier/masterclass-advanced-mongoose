const { Router } = require("express");
const { User } = require("../db");
const router = Router();

router.post("/", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.create({
      username,
      email,
      password,
    });

    res.json({ result: true, user });
  } catch (error) {
    console.error(error);
    res.json({ result: false, error: error.message, stack: error.stack });
  }
});

// NE JAMAIS FAIRE DANS UN VRAI PROJET
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id).populate("likedPosts");
  console.log(user, "User age: ", user.age);
  res.json({ result: true, user });
});
module.exports = router;
