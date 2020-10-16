# Installation

Instructions on how to download and install the basics of **BESX**.

## Download
There are some ways to download **BESX**:

### Using *Git*
```bash
cd resources
git clone https://github.com/cadox8/besx [besx]/besx
```

### Direct Download
- Download the `.zip` from <span style="color: #ff5733">[here](https://github.com/cadox8/besx/releases/latest)</span>.
- Create a folder called `[besx]` inside your `resources` folder. Then create a folder called `besx` inside it.
- Unzip `besx.zip` inside the `besx` folder.


## Install
- Import `besx.sql` into your databse (for now only MySQL are available).
- Add the following to your `server.cfg` at the start.
```cfg
start besx
```

## Extra: Compile
You can download and compile **besx** by yourself:

**<span style="color: #ff5733">WARNING:</span>** You will need NodeJS 12.X or 14.X and NPM 7.0.

- [Clone](#using-git) the repository to your local machine or download the **entire** code from [Github](https://github.com/cadox8/besx)
- Go inside the folder and execute: 
```bash
npm install
npm run build
```
- Copy the `dist` folder and `besx.config.js`, `besx.messages.js` `fxmanifest.lua` and paste them into the `resources/[besx]/besx` folder.