let mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TestSchema = new Schema({
	_id : Schema.Types.ObjectId,
	userid: { type: Schema.Types.ObjectId, ref: 'User' },
	problemType: { type: Number, required: true, enum: ['1','2']},
    question: String,
    ratio: [{type: String}],
    rightAnswer: { type: Number, enum: ['0','1','2','3'] },
    pinyin: [{
		first:String,
		seconf:String,
		tone: {type:number,enum:['1','2','3','4']}
	}] ],
	answer: [{type: Number, enum: ['0','1','2','3']}],
	result: [{type: Number, enum: ['0','1']}],
	resultcount: {
		right: Number,
		pinyin: Number,
		character: Number,
		unfinished: Number
	}
});


module.exports =mongoose.model('Test', TestSchema);