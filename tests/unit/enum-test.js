import { test, module } from 'ember-qunit';
import Ember from 'ember';
import { computedEnum, computedEnumMixin } from 'ember-computed-enum';

module('computed-enum');

test('enumGetSet', function(assert) {
  var o = Ember.Object.extend({
    myEnum: computedEnum('enumValRaw', ['foo', 'bar', 'baz'])
  }).create({enumValRaw: 0});

  assert.equal(o.get('enumValRaw'), 0);
  assert.equal(o.get('myEnum'), 'foo');

  o.set('myEnum', 'bar');
  assert.equal(o.get('myEnum'), 'bar');
  assert.equal(o.get('enumValRaw'), 1);
});

test('mixinCreatesIsProps', function(assert) {
  var myMixin = computedEnumMixin('myEnum', 'enumValRaw', ['foo', 'bar', 'baz']);
  var o = Ember.Object.extend(myMixin, {myProp: 'bla'}).create({enumValRaw: 0});

  assert.equal(o.get('myEnum'), 'foo');
  assert.equal(o.get('myEnumIsFoo'), true);
  assert.equal(o.get('myEnumIsBar'), false);
  assert.equal(o.get('myEnumIsBaz'), false);

  o.set('myEnum', 'bar');
  assert.equal(o.get('myEnum'), 'bar');
  assert.equal(o.get('enumValRaw'), 1);
  assert.equal(o.get('myEnumIsFoo'), false);
  assert.equal(o.get('myEnumIsBar'), true);
  assert.equal(o.get('myEnumIsBaz'), false);
});
