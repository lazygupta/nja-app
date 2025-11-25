import mongoose, { Schema, model, models } from "mongoose";

const MemberSchema = new Schema(
  {
    membershipType: String,

    // Personal details
    name: String,
    dob: String,
    permanentAddress: String,
    correspondenceAddress: String,

    country: String,
    state: String,
    city: String,

    education: String,
    experience: String,
    religion: String,
    gender: String,
    bloodGroup: String,
    maritalStatus: String,

    // Contact details
    mobile: String,
    whatsapp: String,
    email: String,
    website: String,
    designation: String,

    twitter: String,
    facebook: String,
    instagram: String,

    // Family details
    mother: String,
    father: String,
    spouse: String,
    children: Number,

    // Legal
    crime: String,

    // File uploads (you will store URLs later)
    photo: String,
    signature: String,
    idProof: String,
    ugCert: String,
    characterCert: String,

    paymentAmount: { type: Number, default: 100 }, // or 600, etc.
    paymentReference: { type: String, default: "" },
    paymentReceipt: { type: String, default: "" },
    paymentStatus: {
      type: String,
      enum: ["not_sent", "sent", "uploaded", "verified"],
      default: "not_sent",
    },

    // Admin fields (for future)
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    memberIdCardNumber: {
      type: String,
      default: "",
    },
    finalDesignation: {
      type: String,
      default: "",
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default models.Member || model("Member", MemberSchema);
