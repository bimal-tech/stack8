const Label = require("../models/labels.model");

class LabelService {

    addLabel = async (data) => {
        // data['type'] = "brand";
        let label = new Label(data);
        return await label.save();
    }

    getAllLabels = (filter, limit=10000) => {
        return Label.find(filter)
        .sort({_id: "desc"})
        .limit(limit);
    }

    getLabelById = (id) => {
        return Label.findById(id);
    }

    getLabelBySlug = (slug) => {
        return Label.findOne({
            slug: slug
        });
    }

    updateLabel = (filter, data) => {
        return Label.updateMany(filter, {
            $set: data
        });
    }

    updateLabelById = (id, data) => {
        return Label.findByIdAndUpdate(id, {
            $set: data
        });
    }
    deleteLabelById = (id) => {
        return Label.findByIdAndDelete(id);
    }

}

module.exports = LabelService;