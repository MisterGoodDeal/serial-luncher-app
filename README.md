# React Native Redux boilerplate 

**Features :**

✨ Type Script project

✨ Reusable components (template included)

✨ Basic navigation included (Bottom tab navigator)

✨ Implementation of store (slices, actions, models... template included)

✨ Implementation of API call with Node Fetch (template included)

✨ It can handle different languages 

✨ Responsive library included

✨ File to manage colors in your project


## Get started
Clone the project with the method of your choice

    git clone https://github.com/MisterGoodDeal/react-native-mistergooddeal-boilerplate.git

Then you need to install all npm libraries

    npm install

You need to edit the `app.json` file and set it up for your project by changing the `name`, `displayName`, `bundleIdentifier` for iOS and the `package` for Android.
Once that's done, you can run the following command to generate the `ios` and `android` folder.

    npx react-native upgrade
    npx react-native eject --npm


You're almost done ! Don't forget to link native libraries with the following command, but before comment `use_flipper!()`in the Podfile.

    npm run link
(*This command is basically doing `cd ios && pod install && cd ..`*)

Then you can start the project with the following commands

    npm run android // Run on android real device or emulator
    
    npm run ios // Run on iOS real device or emulator
    
    npm run mobile // Run the app on both devices/emulator

If when you start iOS app you have the error `RNGestureHandlerManager.h:9:52: error: expected a type `, add `#import <React/RCTEventDispatcher.h>` to the top of the errored file.

## Before starting

In the `index.js` file you need to replace the content by:
```js
import { AppRegistry } from "react-native";

import App from "./App";
AppRegistry.registerComponent("[Name of the app in app.json]", () => App);
``` 