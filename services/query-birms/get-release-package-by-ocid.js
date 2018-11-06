exports = function (payload, response) {
    const mongodb = context.services.get("mongodb-atlas");
    const releases = mongodb.db("birms").collection("package");
    var ocid = payload.query.ocid || '';
    response.setHeader('content-type', 'application/json');

    return releases.findOne({ "releases.ocid": ocid }).then(doc => {
        if (!doc)
            throw new Error('No record found.');
        doc._id = doc._id.toString();
        response.setBody(JSON.stringify(doc));
    });
};
