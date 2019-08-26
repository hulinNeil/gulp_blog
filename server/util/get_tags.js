const { Tags } = require('./mongodb');

module.exports = async () => {
  let result = await Tags.find().select('tag num');
  return JSON.parse(JSON.stringify(result));
}