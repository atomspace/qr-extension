# qr-extension

qr-extension is a browser extension to generate a QR-code from the page address. There are to ways,how to create qr-code: Page action and context menu. Click on the page action means, that you want to create qr from page URL. If you do it using context menu, you can make qr from text/link/image.

## Initial installation

To install and compile project successfully, you must be sure, that [Node.js](https://nodejs.org/en/) installed on your PC. Than make "qr-extension" branch, where you will on project on your PC.

## Running extension locally in development mode

After installing project, you must enter "npm i" in the terminal of your IDE where you develop project to install all required npm packages. Our project uses [ESLint](https://eslint.org/), which helps us to eliminate ignorant code, and we advise not to disable it.

### Required packages

| Package                 | Version       |
| ------------------------|--------------:|
| jquery                  | ^3.3.1        |
| qr-encode               | 0.3.0         |
| qrcode                  | ^1.2.0        |
| @atomspace/eslint       | ~2.1.1        |
| @atomspace/webextension | ~0.2.2        |
| neutrino                | ~8.2.3        |

## Assembly production version

For compiling project, we use [Neutrino](https://www.npmjs.com/package/neutrino). Neutrino starts, as you will write certain commands, but we make two aliases, which will simplify work with neutrino:

```"npm start"``` - provides to compile trial testing version.


```"npm build"``` - provides to compile prodction version. It differ from "npm start" in a way, that if you will enter this commands with warnings, it won't let you to do that and it will throw exeption.

## Downloads

* [Manual installation from an archive](https://github.com/atomspaceodua/qr-extension/releases/download/v1.0.0/qr-extension-1.0.0.zip)
* [Opera Extension Store](https://addons.opera.com/extensions/details/qr-extension/) 
