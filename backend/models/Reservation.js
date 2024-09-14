const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

// Define the Reservation schema
const ReservationSchema = new mongoose.Schema({
  reservationId: { 
    type: Number, 
    unique: true 
  },
  userId: { 
    type: String, 
    required: true 
  },
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true 
  },
  phone: { 
    type: String, 
    required: true 
  },
  date: { 
    type: Date, 
    required: true 
  },
  time: { 
    type: String, 
    required: true 
  },
  seats: { 
    type: Number, 
    required: true 
  },
  paymentSlip: { 
    type: String, 
    required: true 
  }, // Path to the uploaded file

  status: {
    type: String,
    default: 'pending',
  },

});

// Apply the auto-increment plugin to the schema
ReservationSchema.plugin(AutoIncrement, { inc_field: 'reservationId' });

// Create the model
module.exports = mongoose.model('Reservation', ReservationSchema);
