import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema(
    {
        fname: { type: String, required: false },
        lname: { type: String, required: false },
        emailorphone: { type: String, required: false },
        phone: { type: String, required: false },
        password: { type: String, required: false },
        cpassword: { type: String, required: false },
        dob: { type: String, required: false },
        checked: { type: Boolean, required: false },
    },
    {
        timestamps: true,
    }
);

const UserDetailsDataModel = mongoose.model("Signupdata", ProfileSchema);

export default UserDetailsDataModel;
