const routes = require("next-routes")();

routes
  .add("/contribute/contribute", "/contribute/contribute")
  .add("/contributers/:address", "/contribute/show")
  .add("/charity/new", "/charity/new")
  .add("/charity/charities", "/charity/charities");

module.exports = routes;
