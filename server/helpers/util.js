
/*
      Get a new object or set of objects with only the
      properties specified.
      
      * Expects:
          dbResults     an object or array of objects.
          props         an object with keys of the desired properties
                        on the source object, and values as the desired
                        name of the property on the destination object.
                          {existingPropName : newPropName}

                          e.g. { _id: id } 
                        Select only the _id property, and rename it id.
      * Returns:
          The same number of objects, with only the 
          properties selected in props array
*/

var selectProperties = function (dbResults, props) {
  if (typeof props !== 'object' || props === null) return dbResults;

  if ( Array.isArray(dbResults) ) {
    return dbResults.map(function(oldObj){
      return Object.keys(props).reduce(function(newObj, key){
        newObj[props[key]] = oldObj[key];
        return newObj;
      },{});
    });
  } else {
    return Object.keys(props).reduce(function(newObj, key){
        newObj[props[key]] = dbResults[key];
        return newObj;
    },{});
  }
}

var defaultWhichProperties = function (dbResults) {
  var defaultProps = {
    _id : 'id',
    question : 'question',
    createdBy : 'createdBy',
    type : 'type',
    thingA : 'thingA',
    thingB : 'thingB',
    thingAVoteCount : 'thingAVoteCount',
    thingBVoteCount : 'thingBVoteCount',
    tags : 'tags',
    votesFrom : 'votesFrom'
  };
  return selectProperties(dbResults, defaultProps);
};





module.exports = {
  selectProperties  : selectProperties,
  defaultWhichProperties : defaultWhichProperties
};