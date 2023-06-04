const mongoose = require('mongoose');
const recipeSchema = new mongoose.Schema({
name:{
       type: String,
       required: 'This fild is required.'
   },

description:{
    type: String,
    required: 'This fild is required.'
},
emial:{
    type: String,
    required: 'This fild is required.'
},
ingredients:{
    type: Array,
    required: 'This fild is required.'
},
category:{
    type: String,
    enum: ['Thai','American','Pakistani' ,'Chines','Indian'],
    required: 'This fild is required.'
},
image:{
    type: String,
    required: 'This fild is required.'
},
});

recipeSchema.index({name: 'text', description: 'text'});
//wildcard Indexing
//recipeSchema.index({"$**": 'text'});


module.exports = mongoose.model('Recipe', recipeSchema);