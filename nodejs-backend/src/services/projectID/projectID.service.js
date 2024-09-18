const { ProjectID } = require('./projectID.class');
const createModel = require('../../models/projectID.model');
const hooks = require('./projectID.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"],
    multi: ["create"],
  };

  // Initialize our service with any options it requires
  app.use('/projectID', new ProjectID(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('projectID');

  service.hooks(hooks);
};