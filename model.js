const mongoose = require('mongoose');

const AnalyticDataModel = mongoose.model(
    'AnalyticData',
    new mongoose.Schema({
            _id: mongoose.Schema.Types.ObjectId,
            ttfb: Number,
            fcp: Number,
            domLoad: Number,
            windowLoad: Number
        },
        {
            collection: 'performanceAnalytics',
            timestamps: true,
        }));

module.exports = {
    AnalyticDataModel,
}