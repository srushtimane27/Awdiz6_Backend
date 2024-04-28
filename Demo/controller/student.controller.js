import mongoose, {Schema} from "mongoose";

const studentSchema = new Schema({
    email: String,
    password: String,
});

const StudentSchema = mongoose.model("student", studentSchema);

export default StudentSchema;


