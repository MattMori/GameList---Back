const mongoose = require('mongoose');

const esquema = new mongoose.Schema(
  { 
    gameId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      default: '',
    },
    comment: {
      type: String,
      default: '',
    }
  },
  {
    timestamps: true
  }
);

esquema.index({ gameId: 1 }); 
const EsquemaComments = mongoose.models.comment || mongoose.model('Comments', esquema);
module.exports = EsquemaComments;
