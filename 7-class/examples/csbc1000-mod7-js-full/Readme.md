
## Pre-requisites
* Download Node.js (this will also install npm).
* Download Postman.
* Create a Firebase account.

## Project Setup
* Create folder with name `csbc1000_mod7`
* Navigate to `csbc1000_mod7`
* initialize npm project `yarn -y init`
* Install `yarn add -D firebase-tools`
* Run `yarn firebase login` (on your terminal/command prompt) to connect to your Firebase account
* Create a project using firebase console
 * also create a firestore there. 
* run `yarn firebase init` : 
 * select firestore, functions and emulator 
 * select `use existing project`
 * Select `javascript` for Cloud Functions language?
 * select `y` for eslint rules
 * select `n` for installing deps with `npm`
 * select `functions` and `firestore` emulator
 * accept default port for functions emulator
 * accept default port for firestore emulator
 * select `y`for the Emulator UI
 * press enter when prompted for `Which port do you want to use for the Emulator UI (leave empty to use any available port)?`
 * select `y` to download the emulators now
* `cd functions` run `yarn add express body-parser uuid`
