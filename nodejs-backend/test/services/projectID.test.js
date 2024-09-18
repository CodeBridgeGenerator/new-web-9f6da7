const assert = require('assert');
const app = require('../../src/app');

describe('\'projectID\' service', () => {
  it('registered the service', () => {
    const service = app.service('projectID');

    assert.ok(service, 'Registered the service (projectID)');
  });
});
