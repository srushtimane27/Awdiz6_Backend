import mongoose, { Schema } from "mongoose";

const empSchema = new Schema({
    name: String,
    email: String,
    age: Number,
});

const EmpSchema = mongoose.model("Employee", empSchema);

export default EmpSchema;