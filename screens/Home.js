import React, { PureComponent } from 'react';
import { View, Button, Text } from "react-native";
import { navigate, toggleDrawer } from '../utils/NavigationManager';
import { screens } from '.';
import { Navigation } from 'react-native-navigation';

export default class Home extends PureComponent {

    constructor(props) {
        super(props);
        Navigation.events().bindComponent(this);
    }

    navigationButtonPressed({ buttonId }) {
        switch (buttonId) {
            case 'sideMenu':
                toggleDrawer();
                break;

            default:
                break;
        }
    }

    openBookList = () => {
        navigate(screens.BookList, {
            topBar: {
                title: {
                    text: 'Browse Books'
                }
            }
        });
    };

    render() {
        return (
            <View style={{ padding: 10, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 15, marginVertical: 10 }}>Welcome to Books App</Text>
                <Button onPress={this.openBookList} title='Browse' />
            </View>
        );
    }

}