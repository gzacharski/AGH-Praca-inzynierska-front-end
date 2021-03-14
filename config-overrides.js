const { alias } = require("react-app-rewire-alias");

module.exports = function override(config) {
  alias({
    "@components": "src/main/components",
    "@assets": "src/assets/",
  })(config);

  return config;
};
