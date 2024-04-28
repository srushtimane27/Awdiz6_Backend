import mongoose,{Schema} from "mongoose";

const empSchema = new Schema({
    name: String,
    id: Number,
    salary: Number,
    gender: String
});

const EmpSchema = mongoose.model("employee", empSchema);

export default EmpSchema;