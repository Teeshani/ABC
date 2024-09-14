const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserGemsSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  gems: { type: Number, default: 0 }
});

module.exports = mongoose.model('UserGems', UserGemsSchema);

