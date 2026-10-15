import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    status: {
      type: String,
      enum: ["active", "lead", "inactive"],
      default: "lead",
    },
  },
  { timestamps: { createdAt: true, updatedAt: true } },
);

customerSchema.set("toJSON", {
  virtuals: false,
  transform(_doc, ret) {
    ret.id = String(ret._id);
    ret.createdAt = ret.createdAt?.toISOString?.() || ret.createdAt;
    delete ret._id;
    delete ret.__v;
    delete ret.owner;
    delete ret.updatedAt;
    return ret;
  },
});

export const Customer = mongoose.model("Customer", customerSchema);
