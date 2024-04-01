import mongoose from "mongoose";

// const timeSchema = new mongoose.Schema({
// 	hours: {
// 		type: Number,
// 		required: true,
// 		min: 1,
// 		max: 12,
// 	},
// 	minutes: {
// 		type: Number,
// 		required: true,
// 		min: 0,
// 		max: 59,
// 	},
// 	period: {
// 		type: String,
// 		enum: ["AM", "PM"],
// 		required: true,
// 	},
// });

// Create Schema

const ServiceSchema = new mongoose.Schema({
	businessId: [{ type: mongoose.Types.ObjectId, ref: "Business" }],
	title: {
		type: String,
		required: true,
	},
	duration: {
		type: Object,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	startTime: {
		type: String,
		required: true,
	},
	endTime: {
		type: String,
		required: true,
	},
	breakStartTime: {
		type: String,
		required: true,
	},
	breakEndTime: {
		type: String,
		required: true,
	},
	days: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	businessEmail: {
		type: String,
		ref: "Business",
		required: true,
	},
});

// collection part
const Service = mongoose.model("services", ServiceSchema);

export default Service;
