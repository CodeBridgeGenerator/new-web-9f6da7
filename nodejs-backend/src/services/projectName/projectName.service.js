const { ProjectName } = require('./projectName.class');
const createModel = require('../../models/projectName.model');
const hooks = require('./projectName.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"],
    multi: ["create"],
  };

  // Initialize our service with any options it requires
  app.use('/projectName', new ProjectName(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('projectName');

  service.hooks(hooks);
};