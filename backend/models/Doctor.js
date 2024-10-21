const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  specialization: {
    type: String,
    required: true,
  },
  doctors: [
    {
      name: {
        type: String,
        required: true,
      },
      slots: {
        type: [String],
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model('Doctor', doctorSchema);
