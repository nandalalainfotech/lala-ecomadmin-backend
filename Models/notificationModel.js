import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
    {
        prodname: { type: String, required: false },
        imageId: { type: String, required: false },
        fname: { type: String, required: true },
        reqmessage: { type: String, required: true },
        productId: { type: String, required: true },
    },
    {
        timestamps: true,
    },
);

const NotificationProduct = mongoose.model("notification", notificationSchema);
export default NotificationProduct;
