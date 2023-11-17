import mongoose from "mongoose";
const countrySchema = new mongoose.Schema(
    {
        Country: { type: String, required: false },
        Code: { type: String, required: false },
        zone: { type: String, required: false },
        checked: { type: Boolean, required: false },
    },
    {
        timestamps: true,
    }
);
const CountryModel = mongoose.model("Countrydetails", countrySchema);
export default CountryModel;
