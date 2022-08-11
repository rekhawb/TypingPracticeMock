const db = require('../config/connection');
const { User,Paragraph,Donation } = require('../models');
const userSeeds = require('./userSeeds.json');
const paragraphData = require('./paragraphData.json');
const donationData = require('./donationData.json');

db.once('open', async () => {
  await User.deleteMany({});
  await User.create(userSeeds);

  await Paragraph.deleteMany({});
  await Paragraph.create(paragraphData);

  await Donation.deleteMany({});
  await Donation.create(donationData);

  console.log('all done!');
  process.exit(0);
});
