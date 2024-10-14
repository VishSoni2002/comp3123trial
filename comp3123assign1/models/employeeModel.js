const mongoose = require('mongoose');

const EmployeeSchema = mongoose.Schema({
    first_name: { type: String },
    last_name: { type: String },
    email: { type: String, required: true },
    position: { type: String },
    salary: { type: Number },
    date_of_joining: { type: Date },
    department: { type: String },
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})

module.exports = mongoose.model('Employee', EmployeeSchema)