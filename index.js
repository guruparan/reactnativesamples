/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import screens from './screens';
console.disableYellowBox = true;

AppRegistry.registerComponent(appName, () => screens);
