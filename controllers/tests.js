const {Test} = require("../models/test");

const { HttpError, ctrlWrapper } = require("../helpers");





const getAll = async (req, res, next) => {
    const { _id: owner } = req.user;
    const {page = 1, limit = 20} = req.query;
    const skip = (page - 1) * limit;
    // const result = await Test.find({ owner }, "-createdAt -updatedAt", { skip, limit }).populate("owner", "email subscription");
    const result = await Test.find();
    
        res.json(result)

};

 
const getById = async (req, res, next) => {
    
    const { id } = req.params;
    const result = await Test.findById(id);
    if (!result) {
        throw HttpError(404, "Not found");
    };

    res.json(result)

};

const add = async (req, res, next) => { 
        const {_id: owner} = req.user;
        const result = await Test.create({...req.body, owner});
        res.status(201).json(result)
};



const updateById = async (req, res, next) => {

    
    const { id } = req.params;
    const result = await Test.findByIdAndUpdate(id, req.body, { new: true });
    if (!result) {
        throw HttpError(404, "Not found");
      
    }
    res.json(result);
 
};

const updateFavorite = async (req, res, next) => {

    
    const { id } = req.params;
    const result = await Test.findByIdAndUpdate(id, req.body, { new: true });
   
    if (!result) {
        throw HttpError(404, "Not found");
      
    }
    res.json(result);
 
};

const deleteById = async (req, res, next) => {
        const { id } = req.params;
        const result = await Test.findByIdAndRemove(id);
        if (!result) {
            throw HttpError(404, "Not found");
        }
        res.json({
            message: "Delete success"
        })
  
};

module.exports = {
    getAll: ctrlWrapper(getAll),
    getById: ctrlWrapper(getById),
    add: ctrlWrapper(add),
    updateById: ctrlWrapper(updateById),
    updateFavorite: ctrlWrapper(updateFavorite),
    deleteById: ctrlWrapper(deleteById),
};