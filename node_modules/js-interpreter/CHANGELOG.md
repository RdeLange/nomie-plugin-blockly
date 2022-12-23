# Changelog

**Disclaimer:** This changelog is NOT created by the original author of JS
Interpreter, instead it is created by examining the changes made to the
original repo of JS-Interpreter, to identify new features, bug fixes and
breaking changes.

The version is chosen based on the type of changes according to the
[semver](https://semver.org/) guidelines.

## [4.0.0] - 2022-12-06

Commit: [05d55b8](https://github.com/NeilFraser/JS-Interpreter/tree/05d55b8)

### Added

- Bump Acorn from 0.4.1 to 0.5.0
- Expose VALUE_IN_DESCRIPTOR symbol

### Removed

- Remove support for ES3 from Acorn
- Remove ES6 's' and 'y' flags from Acorn's Regexp

### Changed

- Fold special numbers into special values
- Factor out location object encoding/decoding.
- Throw real errors during init

## [3.0.0] - 2022-08-23

Commit: [c4c5736](https://github.com/NeilFraser/JS-Interpreter/tree/c4c5736)

### Added

- Add script for compiling acorn_interpreter.js
- Add getters and setters for stateStack.
- Add support for sparse arrays in Array polyfills
- Add function names to error stack
- Add a 'stack' property to errors.

### Fixed

- Fix missing node type when scope spidering.
- Fix serialization/deserialization.
- Fix 'this' bug in Function wrapper.
- Fix RegExp.test not updating lastIndex
- Fix unusual RegExp constructor patterns.

### Changed

- Explicitly `close()` finished RegExp workers.
- Switch from blacklist to whitelist of node types
- Decompose (de)serialize functions.
- Recompile compressed file to be ES5.
- Remove start/end props from deserialized polyfills
- Compress location data in serialization format
- Use globalThis to allow import to work
- Safety check if top node is CallExpression

## [2.3.1] - 2021-08-11

Commit: [054c7d4](https://github.com/NeilFraser/JS-Interpreter/tree/054c7d4)

### Added

No change is added in this commit, just a few demos are updated, this version
is published to stay up to speed with the commit hash of the original repo.

## [2.3.0] - 2021-04-06

Commit: [cb740ed](https://github.com/NeilFraser/JS-Interpreter/tree/cb740ed)

### Added

- Add timeout for executing polyfills.
- Add .name property to functions
- Add placeholder getter/setter functions on props
- Add announcement newsgroup address
- Use polyfills for Array functions.
- Support ‘null’ for ‘this’ value in strict mode.

### Fixed

- Use Object.defineProperty instead of assignment.
- Fix attributes on Function.prototype
  - ‘typeof Function.prototype’ was reporting ‘object’, should be a ‘function’
- Handle ‘new’ calls on primitives.
- Catch calling date function on non-dates
- Catch invalid arguments on string’s localeCompare
- Called function should determine strict mode

### Removed

- Remove enumerability from most global properties.

### Changes

- New version of acorn
- In non-strict mode `this` needs to be boxed when calling a function.
- ‘window’ and ‘self’ are the only two enumerable properties on the global object.

## [2.2.0] - 2020-02-18

Commit: [d20cb5a](https://github.com/NeilFraser/JS-Interpreter/tree/d20cb5a)

### Added

- Partial support of JSON.stringify args.
  - Support pretty printing. Support array filtering. Do not support function
    replacers (this would need to be a polyfill).

### Fixed

- Fix security hole in getOwnPropertyDescriptor
- Fix some JS Doc types
- Throw error where getter/setter not supported
  - There are several places where getters and setters are not handled
    correctly.  Such as array’s `.length`.  If a getter or setter is
    encountered in one of these places, throw an error, rather than performing
    invalid behaviour.

### Removed

- Don’t set __proto__ prop when exporting an object
  - __proto__ is a magic property in most runtimes, but not in JS-Interpreter.
- Remove .isObject property
  - This property dates back to when primitives were also wrapped as objects
    and a way to distinguish objects and primitives was needed.  Hopefully this
    change will also annoy @XmiliaH  :)

### Changes

- Split scopes into scope object and data object
  - Previously a scope object was a regular object with two extra properties
    tacked on: strict and parentScope.  Issue #183 proved that sometimes one
    needs multiple scopes with different parentScope values.  This PR creates a
    scope object with the above two properties, as well as a third property
    (‘.object’) that points to the regular object.  This allows two scopes to
    have different parentScopes, while sharing the same object for variables.
  - Minor API change for advanced threading and serialization.


## [2.1.0] - 2020-02-10

Commit: [28ba7f2](https://github.com/NeilFraser/JS-Interpreter/tree/28ba7f2)

### Added

- Non-constructable functions don’t have .prototype
  - Previously escape.prototype was set to undefined.  Now it is not defined.
- Add self-interpreter demo.

### Fixed

- Use iteration (not recursion) for polyfill steps.
- Revert "Remove unneeded error class"
  - Resovles #177
- Fix alert(true.toString())
  - Previously booleans and strings (but not numbers) would return ‘undefined’.
- Fix String and Number constructors with no arg.
  - Previously alert(Number()) -> NaN and alert(String()) -> ‘undefined’.
- Move constructor creation into createFunctionBase_
  - Fixes #175

### Removed

- Remove ancient constants.

## [2.0.0] - 2020-02-10

Commit: [d6809ac](https://github.com/NeilFraser/JS-Interpreter/tree/d6809ac)

- Initial version created from the original repo
