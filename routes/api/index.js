const express = require("express");
const userRoutes = require("./userRoutes");
const authRoutes = require("./authRoutes");
const ROUTES = require("../routes");
const authUser = require("../../utils/auth");
const WhiteUsers = require("../../models/whiteUsersModel");

const router = express.Router();

// router.use(ROUTES.USERS, userRoutes);
router.use(ROUTES.AUTH, authRoutes);

router.use("/user", async (req, res) => {
  // await new Promise((res, rej) => {
  //   setTimeout(res,4000)
  // })
  const tk = req.headers.authorization ?? null;
  const user = await authUser(req, tk);

  if (!user) return res.status(401).json(null)
  const hiddenAttr = ["password", "_id", "__v", "stripeId", "currentSub", "model"]
  for (let attr of hiddenAttr) delete user[attr];

  user.isWhite = !! await WhiteUsers.findOne({ email: user.email });

  res.json(user);
});

router.use((req, res) => {
  res.status(404).json({ error: "Endpoint Not Found" });
});

module.exports = router;
