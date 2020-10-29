# ember-computed-enum

`ember-computed-enum` translates an field containing a "magic number" into
it's human-readable analogue, and provides named properties to easily check
for any given state.

## Installation

ember install ember-computed-enum

## Usage

The addon can be used in two different ways.

For full functionality, use the addon...

### as a Mixin (with `enumNameIsValue` properties)

```js
import { computedEnumMixin } from 'ember-computed-enum';

myEnumValues = ['foo', 'bar', 'baz'];

MyClassWithAnEnum = Ember.Object.extend(
  computedEnumMixin('myEnum', 'enumValRaw', myEnumValues),
  {
    // ... your other properties
  }
);

o = MyClassWithAnEnum.create({ enumValRaw: 0 });
o.get('enumValRaw'); // -> 0
o.get('myEnum');  // -> 'foo'

o.get('myEnumIsFoo');  // -> true
o.get('myEnumIsBar');  // -> false
o.get('myEnumIsBaz');  // -> false
```

In cases where the `enumNameIsValue` properties aren't needed,
the addon can also be used...

## as a simple property (without `enumNameIsValue` properties)

```js
import { computedEnum } from 'ember-computed-enum';

myEnumValues = ['foo', 'bar', 'baz'];

MyClassWithAnEnum = Ember.Object.extend({
  myEnum: computedEnum('enumValRaw', myEnumValues)
});


o = MyClassWithAnEnum.create({ enumValRaw: 0 });
o.get('enumValRaw'); // -> 0
o.get('myEnum');  // -> 'foo'

o.get('myEnumIsFoo');  // -> undefined
o.get('myEnumIsBar');  // -> undefined
o.get('myEnumIsBaz');  // -> undefined
```


### Models

The addon works with any Ember Objects, including ember-data models. To use
with Ember models, store the raw value of the enum in one field:

```js
// app/models/person.js

import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  genderCode: DS.attr('number')
});
```

Then add a computed enum that references the raw value:

```js
// app/models/person.js

import DS from 'ember-data';

import { computedEnumMixin } from 'ember-computed-enum';

export default DS.Model.extend(
  computedEnumMixin('gender', 'genderCode', ['male', 'female', 'other']),
  {
    name: DS.attr('string'),
    genderCode: DS.attr('number')
  }
);
```

If you want to assign the raw value to a different fieldname than
that assigned by the API, you can create a simple Serializer. For
example, if our API returns a gender code in a field named `gender`,
we could make `Person.gender` contain the decoded value and store
the raw, coded version by creating a serializer like this:

```js
// app/serializers/person.js

import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  attrs: {
    genderCode: 'gender'  // map the API's "gender" field to the "genderCode" field on the model
  }
});
```

### Custom Enum Values

By default, `ember-computed-enum` assumes enum values are zero-indexed integers (0, 1, 2...),
but other values can be used by passing in an object mapping enum names to values.
For example, if "gender" were coded as 'm', 'f', and 'o', your model might look like:

```js
// app/models/person.js

import DS from 'ember-data';

import { computedEnumMixin } from 'ember-computed-enum';

genderEnum = {'male': 'm', 'female', 'f', 'other': 'o'};

export default DS.Model.extend(
  computedEnumMixin('gender', 'genderCode', genderEnum),
  {
    name: DS.attr('string'),
    genderCode: DS.attr('string')
  }
);
```

---

The rest of this README outlines the details of collaborating on this Ember addon.

## Development Installation

* `git clone <repository-url>` this repository
* `cd ember-computed-enum`
* `npm install`
* `bower install`

## Running Tests

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).
