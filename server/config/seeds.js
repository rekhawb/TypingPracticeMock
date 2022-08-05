const db = require('../config/connection');
const { User,Paragraph } = require('../models');
const userSeeds = require('./userSeeds.json');
const paragraphData = require('./paragraphData.json');

db.once('open', async () => {
  await User.deleteMany({});
  await User.create(userSeeds);

  await Paragraph.deleteMany({});
  await Paragraph.create(paragraphData);

  console.log('all done!');
  process.exit(0);
});
