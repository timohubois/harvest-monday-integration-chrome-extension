# harvest-monday-integration-chrome-extension

The “Harvest Monday Integration” Chrome extension adds a button to each pulse in monday.com when it is opened. Clicking this button will open the Harvest Time Tracker, while the extension will attempt to associate the name of the monday.com board with a project in Harvest when it loads (the board name and the project name in Harvest must the same).

The extension then pre-populates the time tracking note with the name of the pulse from monday.com. When time tracking is then started, it will automatically link the pulse from monday.com with the tracked time entry from Harvest.

The extension itself also has an icon in the extensions section of Chrome. On monday.com it is the same as before, and on any other site time tracking can be done casually without an automatic link.

## Development Dependencies

* [Node](https://nodejs.org/en/) = 20

## Development

1. Clone this repo.
2. Run `npm i`.
3. Run `npm dev`.

## Create the extension

1. Clone this repo.
2. Run `npm i`.
3. Run `npm build`.

The extension will be bundled inside the `dist` folder.

## How to install the extension?

1. Go to `chrome://extensions/`.
2. At the top right, turn on Developer mode.
3. Click Load unpacked.
4. Select the folder (`dist`) which holds the bundled extension.
