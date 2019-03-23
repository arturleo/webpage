# Documentation

This the detailed description.

## Overview

### Used Languages

- javascript

- ejs

- scss

### Dependencies

- node.js

- jQuery

- mongoDB

  **optional, uncomment line in `app.js` to use it*  

  **Under constrction, disabling it doesn't affect webpage.*

  **sever required*

- radis  

  **optional, uncomment line in `app.js` to use it*

  **sever required*

below is a **main** list of node.js plugins, for details please refer to package.json

- [material-components-web](https://github.com/material-components/material-components-web)

- express

- webpack

- chart.js

- express-session 

- [pinyin](https://github.com/hotoo/pinyin)

### Setup

Install dependencies

```powershell
cd chpn
npm install
```

Build ( *for production )

```
npm run build
```

Dev ( *for development )

```
npm run test
npm run start
```

Run server ( **for display )

```
npm run start
```

### Folder structure

```
..\CHPN

│   app.js                                 //entrance
│   package-lock.json
│   package.json                           //configuration
│   webpack.common.js                      ──┐
│   webpack.dev.js                           ├─ //webpack config for development and production
│   webpack.prod.js                        ──┘
│          
├───bin                                    //produced by express
│       www
│       
├───db                                     //DB config  
│       mongoDB.js                      
│       mysqlIndex.js                      //abandoned
│       test.js                            ──┐
│       user.js                              ├─ //schemas for mongoDB
│       login.js                           ──┘              
│       
├───js                                     //backend js file
│       util.js
│       
├───node_modules
│   
│               
├───public
│   │   bundle.css                         //webpack built file
│   │   bundle.js
│   │   favicon.ico
│   │   
│   ├───audio                              //.mp3 for pronunciation
│   │       
│   ├───images
│   │       
│   ├───javascripts                        //js sources
│   │       index.js                       //link other js and import modules
│   │       jquery.js                      
│   │       load.js                        //load backend data
│   │       proncChar.js                   //character pronunciation plugin
│   │       util.js                        //audio playing and chart creating
│   │       
│   └───stylesheets                        //scss sources for sass
│       │   app.scss                       //main style
│       │   learn.scss                                          
│       │   que.scss                       //test page
│       │   sub.scss                       //other page
│       │   theme.scss                     //material-components-web theme setting
│       │   
│       └───plugin                         //web plugin scss
│               login.scss
│               plugin.scss                //all plugins
│               search.scss                
│               
├───routes                                 //node.js routes
│       api.js
│       index.js                        
│       user.js                            //TODO
│       
└───views                                  //ejs template files to compile html 
    │   dashBoard.ejs
    │   error.ejs                          //TODO
    │   footer.ejs
    │   index.ejs
    │   layout.ejs
    │   learn.ejs
    │   privacy.ejs
    │   proncPage.ejs
    │   search.ejs                         //TODO
    │   setting.ejs                        //TODO
    │   test.ejs
    │   userHistory.ejs                    //TODO
    │   
    ├───header
    │       learnHeader.ejs
    │       userHeader.ejs
    │       
    └───plugin
            chart.ejs
            login.ejs
            proncChar.ejs
```

## Frontend

### Layout

Using `material-components` such as topAppBar, sideBar, ratio, textForm, card, front, icon etc. `Webpack` is usd to pack dependencies together and pack files compiled by babel to support ES6.

`layout.ejs`contains the topAppbar and sideBar. It also points to other pages using `<% %>`tag, which will be packed together to `html` by `node.js` `ejs` plugin. That enables all pages sharing the same layout. The plugin `login`,`proncChar`,`chart` and the `footer` are multiflexed in this way.

`.scss`files are also converted to `css`.

This website follows material design specification.

### Chart

Using chart.js to produce charts. Once clicked, the old chart will be destroyed and a new one will be created with trasfered data.

The color is automatically made.

see:`public\javascript\util`

### Using API

`ajax` is used when requiring pinyin parsing or get test results (both single and all). Based on the `result`, the client side decide the action without getting details about the procedure. 

see: `public\javascript\load`

Class is added or removed to change the display after requiring  server's results.

### Pronunciation

To reduce the delay, `ffmpeg` is used to preprocesses audios and control volume. Also, the first audio is accelerated 3 times and the second is played 85 ~~~~ms after the first starts to play.

To reduce repetition, 3 functions are used to handle different audio play condition: dynamic button, static button, instant playing.

see:  `public\javascript\util`, `public\javascript\proncChar`

## Backend

### Pinyin

Pinyin is acquired at the server end. For the `pinyinPronc` plugin, it will parse Chinese or English, with simple judge whether the input is in right format.

To seperately get pinyin, 'w' is changed to "u1" and 'y' is changed to "i1". For better results, "iang", "ian", "uang" etc. are preset.

see:`js\util`

### Problem generating

There is a list of 3500 common Chinese in `js\util`, each time a problem created, the 4 characters are created randomly from it. The problem type is 50% character, 50% pinyin. Right answer index is randomly picked.

### Data storing

In current version, problem data is stored in session at ther server, with `redis` to store it in cache to reduce load.

In the future version when user system is finished, problems and users' answer data will be store permanently in database.

`MongoDB`schemas are created to store data, but so far api and interfaces haven't been completed.

see:`app.js`  `\db`  

### Session

Session id is stored in user's cookie and encoded with key. The time limit of cookie is one hour. When getting session-id from user, the server find the corresponding data and does the judgement and return the output to user.  

see:`app.js`  `routes\api`
