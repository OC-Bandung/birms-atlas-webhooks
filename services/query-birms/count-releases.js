exports = function (payload, response) {

    const mongodb = context.services.get("mongodb-atlas");
    const releases = mongodb.db("birms").collection("release");
    var q = payload.query.q || '{}';
    response.setHeader('content-type', 'text/plain');

    return releases.count(EJSON.parse(q)).then((num_returned) => {
        response.setBody(num_returned.toString());
    });

};