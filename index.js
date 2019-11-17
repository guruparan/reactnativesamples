import { Navigation } from "react-native-navigation";
import { screens } from "./screens";
import { initialize } from "./utils/NavigationManager";

Navigation.events().registerAppLaunchedListener(() => {
  initialize();

  Navigation.setRoot({
    root: {
      sideMenu: {
        left: {
          component: {
            name: screens.SideMenu
          }
        },
        center: {
          stack: {
            children: [
              {
                component: {
                  name: screens.Home,
                  options: {
                    topBar: {
                      title: {
                        text: 'Home'
                      },
                      leftButtons: [
                        {
                          id: 'sideMenu',
                          icon: require('./images/menu.png')
                        },
                      ]
                    }
                  }
                }
              }]
          }
        }
      }
    }
  });
});
