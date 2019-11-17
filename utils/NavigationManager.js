import { Navigation } from "react-native-navigation";
import { screens, screensComponents } from "../screens";

let didAppearListener;
let didDisappearListener;
let currentComponentId;
let isDrawerOpen = false;

const defaultStyle = {
    statusBar: {
        visible: true,
        style: "light",
        backgroundColor: "black"
    },
    topBar: {
        drawBehind: false,
        background: {
            color: "black",
        },
        visible: true,
        animate: false,
        hideOnScroll: false,
        backButton: {
            color: 'white'
        },
        title: {
            alignment: 'center',
            color: 'white'
        },
        leftButtonColor: 'white',
    }
};

const initialize = () => {

    Navigation.setDefaultOptions(defaultStyle);

    screensComponents.forEach(screen => {
        Navigation.registerComponent(screen.key, () => screen.component);
    });

    didAppearListener = Navigation.events().registerComponentDidAppearListener((({ componentId, componentName }) => {
        if (componentName !== screens.SideMenu) {
            currentComponentId = componentId;
        }
    }).bind(currentComponentId));

    didDisappearListener = Navigation.events().registerComponentDidDisappearListener((({ componentName }) => {
        if (componentName === screens.SideMenu) {
            isDrawerOpen = false;
        }
    }).bind(isDrawerOpen));
};

const cleanup = () => {
    didAppearListener.remove();
    didDisappearListener.remove();
    currentComponentId = null;
};

const navigate = (screen, options, props) => {
    Navigation.push(currentComponentId, {
        component: {
            name: screen,
            passProps: props,
            options: options
        },
    });
};

const goback = () => {
    Navigation.pop(currentComponentId);
};

const toggleDrawer = () => {
    isDrawerOpen = !isDrawerOpen;
    Navigation.mergeOptions(currentComponentId, {
        sideMenu: {
            left: {
                visible: isDrawerOpen,
            },
        },
    });
};

export { initialize, cleanup, navigate, toggleDrawer, goback };