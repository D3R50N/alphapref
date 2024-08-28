const config = require("../../config/config");
const { e400 } = require("../../middlewares/errorHandler");
const ContactForm = require("../../models/contactFormModel");
const User = require("../../models/userModel");
const authUser = require("../../utils/auth");



exports.index = async (req, res) => {
  try {
    const user = await authUser(req);
    // const name = req.query.name || user.email;
    // const image = user.image;
    return res.render("index", { chromeUrl :config.alphaprefChromeUrl, firefoxUrl : config.alphaprefFirefoxUrl, user });
  } catch (err) {
    console.log(err.message);
    req.error = err;
    e400(req, res);
  }
};

exports.formContact = async (req, res) => {
  try {
    const { email, name, message } = req.body;
    const contactForm = new ContactForm({ email, name, message });
    await contactForm.save();

    return res.send("Message envoyé avec succès.");
  } catch (err) {
    console.log(err.message);
   return res.send("Erreur lors de l'envoi du message.");
  }
}