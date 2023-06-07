import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  avatarUrl: String,
  socialOnly: { type: Boolean, default: false },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String },
  location: String,
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }], // 사용자는 많은 댓글을 가질 수 있음 (배열)
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
});

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 5);
});

const User = mongoose.model("User", userSchema);
export default User;
