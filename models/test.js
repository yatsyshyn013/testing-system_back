const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi = require("joi");
const testSchema = new Schema({
    testName: {
        type: String,
        required: [true, 'Set name for your test'],
    },
    test: {
        type: Array,
        required: [true, 'Set data for your test'],
    },
    favorite: {
        type: Boolean,
        default: false,
    },
      owner: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
});

testSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
    testName: Joi.string().required(),
    test: Joi.array().required().items(
        Joi.object({
            question: Joi.string().required(),
            correct_answer: Joi.string().required(),
            incorrect_answers: Joi.array().required(),
        })
    ),
    favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required(),
})

const schemas = {
    addSchema, 
    updateFavoriteSchema,
}

const Test = model("test", testSchema);

module.exports = {
    Test,
    schemas,
};


