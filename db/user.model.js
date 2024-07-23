const mongoose = require("mongoose");
const moment = require("moment");

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
      validate: {
        validator: val =>
          /^[a-zA-Z0–9._-]+@[a-zA-Z0–9.-]+\.[a-zA-Z]{2,4}$/.test(val),
        message: ({ value }) => `${value} is not a valid email address.`,
      },
    },
    password: {
      type: String,
      select: false,
      // this = document
      required: () => this.status !== "pending",
    },
    type: {
      type: String,
      enum: ["admin", "user", "moderator"],
      default: "user",
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female", "non-binary"],
    },
    status: {
      type: String,
      enum: ["active", "inactive", "pending"],
      default: "pending",
      select: false,
    },
    birthdate: Date,
    likedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "posts" }],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

UserSchema.virtual("age").get(function () {
  // this = document
  if (!this.birthdate) return null;

  return moment().diff(this.birthdate, "years");
});

module.exports = mongoose.model("users", UserSchema);
