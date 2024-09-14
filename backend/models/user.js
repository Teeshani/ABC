const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const userSchema = new mongoose.Schema({
  userId: { type: Number, unique: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  type: { type: String, default: 'customer' },
});

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

// Add auto-increment to userId
userSchema.plugin(AutoIncrement, { inc_field: 'userId' });

const User = mongoose.model('User', userSchema);
module.exports = User;

