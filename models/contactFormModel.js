const mongoose = require("mongoose");

const contactFormSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },

});

contactFormSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const ContactForm = mongoose.model("contactForm", contactFormSchema);

module.exports = ContactForm;
