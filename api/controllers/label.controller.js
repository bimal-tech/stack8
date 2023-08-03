const LabelService = require("../services/label.service");
const { successResponse, errorResponse, createSlug } = require("../utilities/helpers");
const svc = new LabelService();

const labelAdd = async (req, res, next) => {
    try{
        let data = req.body;
        if(req.file){
            data.image = req.file.filename;
        }
        data['slug'] = createSlug(data.title);

        let success = await svc.addLabel(data)
        if(success) {
            res.json(successResponse(data, "label Created Successfully."));
        } else {
            res.json(errorResponse("Error while creating label."))
        }
    } catch(error) {
        next({status: 400, msg: JSON.stringify(error)})
    }
}

const labelUpdate = async (req,res,next) => {
    try{
        let data = req.body;
        if(req.file){
            data.image = req.file.filename;
        }
        let success = await svc.updateLabelById(req.params.id, data)
        if(success) {
            res.json(successResponse(data, "label updated Successfully."));
        } else {
            res.json(errorResponse("Error while updating label."))
        }
    } catch(error) {
        next({status: 400, msg: JSON.stringify(error)})
    }
}

const labelList = async (req,res, next) => {
    let type = req.query.type ?? null;
    let status = req.query.status ?? null;
    let limit = req.query.limit ?? 1000;

    let filter = {};
    if(type) {
        filter['type'] =  type;
    }
    if(status) {
        filter['status'] = status;
    }
    let result = await svc.getAllLabels(filter, limit);
    if(result) {
        res.json(successResponse(result, "Fetched Successfully."));
    } else {
        res.json(errorResponse("Error while fetching label."))
    }
}
const getLabelById = async (req, res, next) => {
    try {
        let label = await svc.getLabelById(req.params.id);
        if(label) {
            res.json(successResponse(label, "Fetched Successfully."));
        } else {
            res.json(errorResponse("Error while fetching label."))
        }
    } catch(error) {
        next({status: 500, msg: JSON.stringify(error)});
    }
}
const labelDelete = async (req, res, next) => {
    try {
        let success = await svc.deleteLabelById(req.params.id);
        if(success) {
            res.json(successResponse(null, "Label deleted Successfully."));
        } else {
            res.json(errorResponse("Error while deleting label."))
        }
    } catch(error) {
        next({status: 500, msg: JSON.stringify(error)});
    }
}

const getLabelBySlug = async (req, res, next) => {
    try {
        let label = await svc.getLabelBySlug(req.params.slug);
        if(label) {
            res.json(successResponse(label, "Fetched Successfully."));
        } else {
            res.json(errorResponse("Error while fetching label."))
        }
    } catch(error) {
        next({status: 500, msg: JSON.stringify(error)});
    }
}

module.exports = {
    labelAdd,
    labelUpdate,
    labelList,
    getLabelById,
    labelDelete,
    getLabelBySlug
}