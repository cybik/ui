import { moduleFor, test } from 'ember-qunit';
import SuperAdapter from '../../../application/adapter';

moduleFor('adapter:job', 'Unit | Adapter | job', {
  // Specify the other units that are required for this test.
  // needs: ['adapter:application']
});

test('it exists', function (assert) {
  let adapter = this.subject();

  assert.ok(adapter);
});

test('it wraps non-array payload with model name', function (assert) {
  let adapter = this.subject();

  SuperAdapter.prototype.handleResponse = function (status, headers, data, requestData) {
    assert.deepEqual(data, { job: { id: 1234 } });
    assert.equal(status, 'status');
    assert.equal(headers, 'headers');
    assert.equal(requestData, 'requestData');
  };

  adapter.handleResponse('status', 'headers', { id: 1234 }, 'requestData');
});

test('it wraps array payload with model name', function (assert) {
  let adapter = this.subject();

  SuperAdapter.prototype.handleResponse = function (status, headers, data, requestData) {
    assert.deepEqual(data, { jobs: [{ id: 1234 }] });
    assert.equal(status, 'status');
    assert.equal(headers, 'headers');
    assert.equal(requestData, 'requestData');
  };

  adapter.handleResponse('status', 'headers', [{ id: 1234 }], 'requestData');
});