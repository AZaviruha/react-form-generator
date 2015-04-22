<h2>Changelog</h2>

#### 0.2.1
* Fixed `isHidden` for `text` and `textarea` primitive.
* Fixed `isFormValid`.

#### 0.2.0
* Added `blur` event handler for all standard primitives.
* Added `focus` event handler for all standard primitives.
* Added layout "Header".
* Added `alphabetic` validator
* Replaced all standard validators to "empty-or-valid" model.
(removed implicit "required" behavior.)
* Added unit-tests for all tools.
* Added documentation for "Composite validation".
* Added documentation for "Complex routing".
* Bugfix: nested `or` and `and` now works.

#### 0.1.1
* Removed `node-sass` from dev-dependencies (crashes on Windows).

#### 0.1.0
* `isReadOnly` is deprecated now. Use `isDisabled` instead.
* Added `buildRouter` helper (`src/tools/routing.js`)
* Configured unit-tests. Added `gulp test` task. 

#### 0.0.1 Initial version.
