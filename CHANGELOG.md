# Changelog

## [1.1.0](https://github.com/timohubois/harvest-monday-integration-chrome-extension/compare/v1.0.0...v1.1.0) (2023-11-03)


### Features

* **main.js, popup.js:** add event listener, refactor popup.js structure ([8336a30](https://github.com/timohubois/harvest-monday-integration-chrome-extension/commit/8336a30f79e65c1f549a85b5daaa2ac38a349f55))
* **main.js:** load main.js only on subdomains of monday.com ([3a57631](https://github.com/timohubois/harvest-monday-integration-chrome-extension/commit/3a576316c9db7cad6a9c97ce9ccc926681dcfc58))
* **main.js:** use await for maybeAddTimerButtonToPulse function, don't show warning at console ([33cbe65](https://github.com/timohubois/harvest-monday-integration-chrome-extension/commit/33cbe65cd381fc8822c79eb8c77a1853d1284955))
* **popup.html:** remove loading="lazy" ([4a8bcc3](https://github.com/timohubois/harvest-monday-integration-chrome-extension/commit/4a8bcc359214f5c422ff1bb1167293512d03737c))
* **popup.js:** sync changes to iframe when storage change ([29c420f](https://github.com/timohubois/harvest-monday-integration-chrome-extension/commit/29c420f56362d174d80ef432dfe610842443bdec))
* **popup:** initial commit ([ba939c6](https://github.com/timohubois/harvest-monday-integration-chrome-extension/commit/ba939c667e3375fd4c2e5c8da723a477757f1e96))
* **release.yml:** add new version ([9113bf9](https://github.com/timohubois/harvest-monday-integration-chrome-extension/commit/9113bf950e5715e60c7eef75cd05d1531aab660f))
* **release.yml:** add new version ([40731e2](https://github.com/timohubois/harvest-monday-integration-chrome-extension/commit/40731e260fd99ba430e3a70c7b1100f064f5e78c))
* **resetStorage:** reset the store when window location does not contains monday.com ([012741f](https://github.com/timohubois/harvest-monday-integration-chrome-extension/commit/012741f08a33e405f6c62c7f0e9ec17e82e290d4))
* **scripts:** dynamic import platform script only when needed ([69d53de](https://github.com/timohubois/harvest-monday-integration-chrome-extension/commit/69d53de7f2349a995ddd23201747267828c5a483))
* **updateStore:** update store on every url change ([89b6f7e](https://github.com/timohubois/harvest-monday-integration-chrome-extension/commit/89b6f7e4e104dbffc80a8de63d55303d14cdb028))
* **workflows:** add extra-files ([64ac47a](https://github.com/timohubois/harvest-monday-integration-chrome-extension/commit/64ac47abbc7d9cf7f6949ab7af037cf474e3a07c))
* **workflows:** add main.yml ([ed4e0a9](https://github.com/timohubois/harvest-monday-integration-chrome-extension/commit/ed4e0a9faaea973df53ec3a9931485e411dc7bdf))
* **workflows:** add release.yml ([4880b78](https://github.com/timohubois/harvest-monday-integration-chrome-extension/commit/4880b780f6702213238c6b2cb063c77fc96b5a8f))
* **workflows:** bundle and add download to release ([4197a7e](https://github.com/timohubois/harvest-monday-integration-chrome-extension/commit/4197a7ed5911d2331a6eee1b1aa4875950b685b5))


### Bug Fixes

* **main.js:** set correct permalinks ([3edbd3f](https://github.com/timohubois/harvest-monday-integration-chrome-extension/commit/3edbd3fe567bc3c1206ad5448d8d74d401620652))
* **main.js:** update Harvest timer button functionality ([13cb28c](https://github.com/timohubois/harvest-monday-integration-chrome-extension/commit/13cb28c641a548b81828e325d8e078d813458370))
* **popup.js:** remove manual harvest event trigger ([bbd39e2](https://github.com/timohubois/harvest-monday-integration-chrome-extension/commit/bbd39e2d61a1451d1a76c6418f10e4619181b85e))
* **popus.js:** don’t use dynamic import ([ec80bae](https://github.com/timohubois/harvest-monday-integration-chrome-extension/commit/ec80bae0e37af76baa999af359dc347460bc2ed1))
* **README.md:** change instructions ([dbbb405](https://github.com/timohubois/harvest-monday-integration-chrome-extension/commit/dbbb405153241d762971c808cd44b3796de977ce))
* **release.yml:** remove action ([82fb779](https://github.com/timohubois/harvest-monday-integration-chrome-extension/commit/82fb7793fa0f4c8d3a3294b3ca8549058dab9b0b))
* **workflows:** change Upload Release Artifact ([85859a3](https://github.com/timohubois/harvest-monday-integration-chrome-extension/commit/85859a3c4d5d1a7cfa223734dfb1ba90e1d5cdc0))

## 1.0.0 (2023-11-03)


### Features

* **main.js, popup.js:** add event listener, refactor popup.js structure ([8336a30](https://github.com/timohubois/harvest-monday-integration-chrome-extension/commit/8336a30f79e65c1f549a85b5daaa2ac38a349f55))
* **main.js:** load main.js only on subdomains of monday.com ([3a57631](https://github.com/timohubois/harvest-monday-integration-chrome-extension/commit/3a576316c9db7cad6a9c97ce9ccc926681dcfc58))
* **main.js:** use await for maybeAddTimerButtonToPulse function, don't show warning at console ([33cbe65](https://github.com/timohubois/harvest-monday-integration-chrome-extension/commit/33cbe65cd381fc8822c79eb8c77a1853d1284955))
* **popup.html:** remove loading="lazy" ([4a8bcc3](https://github.com/timohubois/harvest-monday-integration-chrome-extension/commit/4a8bcc359214f5c422ff1bb1167293512d03737c))
* **popup.js:** sync changes to iframe when storage change ([29c420f](https://github.com/timohubois/harvest-monday-integration-chrome-extension/commit/29c420f56362d174d80ef432dfe610842443bdec))
* **popup:** initial commit ([ba939c6](https://github.com/timohubois/harvest-monday-integration-chrome-extension/commit/ba939c667e3375fd4c2e5c8da723a477757f1e96))
* **release.yml:** add new version ([9113bf9](https://github.com/timohubois/harvest-monday-integration-chrome-extension/commit/9113bf950e5715e60c7eef75cd05d1531aab660f))
* **release.yml:** add new version ([40731e2](https://github.com/timohubois/harvest-monday-integration-chrome-extension/commit/40731e260fd99ba430e3a70c7b1100f064f5e78c))
* **resetStorage:** reset the store when window location does not contains monday.com ([012741f](https://github.com/timohubois/harvest-monday-integration-chrome-extension/commit/012741f08a33e405f6c62c7f0e9ec17e82e290d4))
* **scripts:** dynamic import platform script only when needed ([69d53de](https://github.com/timohubois/harvest-monday-integration-chrome-extension/commit/69d53de7f2349a995ddd23201747267828c5a483))
* **updateStore:** update store on every url change ([89b6f7e](https://github.com/timohubois/harvest-monday-integration-chrome-extension/commit/89b6f7e4e104dbffc80a8de63d55303d14cdb028))
* **workflows:** add extra-files ([64ac47a](https://github.com/timohubois/harvest-monday-integration-chrome-extension/commit/64ac47abbc7d9cf7f6949ab7af037cf474e3a07c))
* **workflows:** add main.yml ([ed4e0a9](https://github.com/timohubois/harvest-monday-integration-chrome-extension/commit/ed4e0a9faaea973df53ec3a9931485e411dc7bdf))
* **workflows:** add release.yml ([4880b78](https://github.com/timohubois/harvest-monday-integration-chrome-extension/commit/4880b780f6702213238c6b2cb063c77fc96b5a8f))
* **workflows:** bundle and add download to release ([4197a7e](https://github.com/timohubois/harvest-monday-integration-chrome-extension/commit/4197a7ed5911d2331a6eee1b1aa4875950b685b5))


### Bug Fixes

* **main.js:** set correct permalinks ([3edbd3f](https://github.com/timohubois/harvest-monday-integration-chrome-extension/commit/3edbd3fe567bc3c1206ad5448d8d74d401620652))
* **main.js:** update Harvest timer button functionality ([13cb28c](https://github.com/timohubois/harvest-monday-integration-chrome-extension/commit/13cb28c641a548b81828e325d8e078d813458370))
* **popup.js:** remove manual harvest event trigger ([bbd39e2](https://github.com/timohubois/harvest-monday-integration-chrome-extension/commit/bbd39e2d61a1451d1a76c6418f10e4619181b85e))
* **popus.js:** don’t use dynamic import ([ec80bae](https://github.com/timohubois/harvest-monday-integration-chrome-extension/commit/ec80bae0e37af76baa999af359dc347460bc2ed1))
* **README.md:** change instructions ([dbbb405](https://github.com/timohubois/harvest-monday-integration-chrome-extension/commit/dbbb405153241d762971c808cd44b3796de977ce))
* **release.yml:** remove action ([82fb779](https://github.com/timohubois/harvest-monday-integration-chrome-extension/commit/82fb7793fa0f4c8d3a3294b3ca8549058dab9b0b))
* **workflows:** change Upload Release Artifact ([85859a3](https://github.com/timohubois/harvest-monday-integration-chrome-extension/commit/85859a3c4d5d1a7cfa223734dfb1ba90e1d5cdc0))
