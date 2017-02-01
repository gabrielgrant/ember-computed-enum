import Ember from 'ember';

function normalizeEnum(enum_) {
  if (Ember.isArray(enum_)) {
    // convert to object mapping key to array index
    enum_ = enum_.reduce((acc, cur, i) => {
      acc[cur] = i;
      return acc;
    }, {});
  }
  return enum_;
}

function computedEnum(rawPropName, enum_) {
  enum_ = normalizeEnum(enum_);
  var v2k = new Map(Object.keys(enum_).map(k => [enum_[k], k]));
  return Ember.computed(rawPropName, {
    get() {
      return v2k.get(this.get(rawPropName));
    },
    set(_, value) {
      this.set(rawPropName, Ember.get(enum_, value));
      return value;
    }
  });
}

function computedEnumMixin(enumPropName, rawPropName, enum_) {
  enum_ = normalizeEnum(enum_);
  var properties = {};
  properties[enumPropName] = computedEnum(rawPropName, enum_);
  for (var k in enum_) {
    var propName = enumPropName + 'Is' + Ember.String.capitalize(k);
    properties[propName] = Ember.computed.equal(rawPropName, enum_[k]);
  }
  // it seems a POJO can be used in place of a Ember.Mixin both in
  // Object.extend() and Object.reopen(), so just return that
  return properties;
}

export { computedEnum, computedEnumMixin };
