import mongoose from "mongoose";
 
const { Schema } = mongoose;
 
const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, minlength: 2 },
    email: { type: String, required: true, trim: true, lowercase: true, unique: true },
    passwordHash: { type: String, required: true, select: false },
    role: { type: String, enum: ["user", "admin"], default: "user" }
  },
  { timestamps: true }
);
 
// Enlever passwordHash quand on fait res.json(user)
userSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.passwordHash;
    return ret;
  }
});
 
export const User = mongoose.model("User", userSchema);
 