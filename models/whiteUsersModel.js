const mongoose = require("mongoose");

const whiteUsersSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },

});

whiteUsersSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const WhiteUsers = mongoose.model("whiteUsers", whiteUsersSchema);

module.exports = WhiteUsers;
