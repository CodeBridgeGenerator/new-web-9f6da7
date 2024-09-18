const assert = require('assert');
const app = require('../../src/app');

describe('\'projectName\' service', () => {
  it('registered the service', () => {
    const service = app.service('projectName');

    assert.ok(service, 'Registered the service (projectName)');
  });
});
