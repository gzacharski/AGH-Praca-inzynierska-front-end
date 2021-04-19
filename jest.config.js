const { defaults } = require('jest-config');

module.exports = {
   moduleDirectories: [...defaults.moduleDirectories, 'src'],
};
