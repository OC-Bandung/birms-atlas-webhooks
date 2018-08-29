exports = function (payload, response) {

  const mongodb = context.services.get("mongodb-atlas");
  const releases = mongodb.db("birms").collection("error");
  var q = payload.query.q || '{}';
  var fromId = payload.query.fromId || '';
  var limit = +(payload.query.limit) || 20;

  response.setHeader('content-type', 'application/json');

  var query;
  if (fromId === '') {
    query = q;
  } else {
    query = '{ \"$and\": [ {\"_id\": {\"$gt\": { \"$oid\": \"' + fromId + '\"}}},' + q + ' ] }';
  }

  releases.find(EJSON.parse(query)).limit(limit).toArray().then(docs => {
    docs.map(doc => {
      doc._id = doc._id.toString();
    });
    response.setBody(JSON.stringify(docs));
  });

};