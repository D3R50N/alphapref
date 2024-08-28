const authUser = require("../../utils/auth");

exports.index = async (req, res) => {
  try {
    const user = await authUser(req);
    return res
      .render("profile", {
        user,
      });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await authUser(req);
    var { name, old_password, password } = req.body;
    name = name.trim();
    old_password = old_password.trim();
    password = password.trim();

    if (name && name.length) {
      user.name = name;
    }
    if (password && password.length) {
      if (!old_password && old_password.length) {
        return res.render("profile", {user, error: "Ancien mot de passe requis." });
      }
      if (!(await user.comparePassword(old_password))) {
        return res.render("profile", { user, error: "Ancien mot de passe incorrect" });
      }
      if(password.length < 6) {
        return res.render("profile", {user, error: "Le mot de passe doit avoir 6 caractères" });
      }
      user.password = password;
    }
    await user.save();
    return res.render("profile", {
      user,
    });
  } catch (err) {
    res.render("profile", {user, error: err.message });
  }
}