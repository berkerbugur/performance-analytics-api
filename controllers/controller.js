const model = require('../model');
const mongoose = require('mongoose');


const getAnalyticData = (req, resp) => {
    const mQuery = {$and: []};

    let {startDate, endDate} = req.query;

    if (!startDate) {
        startDate = new Date();
        startDate.setMinutes(startDate.getMinutes() - 30);
    }

    endDate = endDate ? endDate : new Date();

    if (startDate) mQuery.$and.push({createdAt: {$gt: startDate}});
    if (endDate) mQuery.$and.push({createdAt: {$lte: endDate}});


    console.log(startDate + ' - ' + endDate + ' - ' + mQuery);

    model.AnalyticDataModel.find(mQuery).then(analyticDataList => {
        resp.json(analyticDataList);
    }).catch(err => {
        console.log(`Cannot get analytic data. Reason: ${err}`);
    })
}

const createAnalyticData = (req, resp) => {
    model.AnalyticDataModel.create({
        _id: new mongoose.Types.ObjectId(),
        ttfb: req.ttfb,
        fcp: req.fcp,
        domLoad: req.domLoad,
        windowLoad: req.windowLoad
    }).then(data => {
        return resp.json(data);
    }).catch(err => {
        console.log(`Cannot create analytic data. Reason: ${err}`);
    });
}

module.exports = {
    getAnalyticData,
    createAnalyticData
};