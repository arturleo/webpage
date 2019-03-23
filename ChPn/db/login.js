let mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LoginSchema = new Schema({
	_id : Schema.Types.ObjectId,
	userid: { type: Schema.Types.ObjectId, ref: 'User' },
	time: Date,
    browser: String,
	location: String,
	attempt:{type:Number,enum:{'0','1'}}
});


module.exports =mongoose.model('Test', TestSchema);