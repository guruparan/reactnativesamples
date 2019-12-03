import React, { PureComponent } from 'react';
import { View, Text, BackHandler, Image, Alert, TouchableOpacity } from "react-native";
import { Navigation } from 'react-native-navigation';
import { goback } from '../utils/NavigationManager';

export default class BookInfo extends PureComponent {

    constructor(props) {
        super(props);
        //Bind the navigation button press listener
        Navigation.events().bindComponent(this);

        this.state = {
            claps: 0
        };
    }

    componentDidDisappear() {
        //remove backpress handler
        //Have to do this in disappear or else this will work in next screen as well
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentDidAppear() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    navigationButtonPressed({ buttonId }) {
        //Handle back button press event
        switch (buttonId) {
            case 'backbutton':
                this.handleBackPress();
                break;

            default:
                break;
        }
    }

    handleBackPress = () => {
        //returning true will let react know that the event is handled
        Alert.alert(
            'Confirm',
            'Confirm exit',
            [
                { text: 'Yes', onPress: () => goback() },
                { text: 'No', style: 'cancel' }
            ],
            { cancelable: false },
        );
        return true;
    };

    updateClapCount = () => {
        //Update the clap count in the top bar
        this.setState({ claps: this.state.claps + 1 }, () => {
            Navigation.mergeOptions(this.props.componentId, {
                topBar: {
                    title: {
                        text: `${this.props.book.Name} (${this.state.claps})`
                    }
                }
            });
        });
    };

    render() {
        const book = this.props.book;

        return (
            <View style={{ alignItems: 'center', paddingTop: 20 }}>
                <Image source={{ uri: book.cover }} style={{ width: 100, height: 200 }} />
                <Text>{book.Author}</Text>
                <Text>{book.Year}</Text>
                <TouchableOpacity
                    style={{
                        marginVertical: 5,
                        borderColor: 'black',
                        borderWidth: 1,
                        borderRadius: 10,
                        padding: 5
                    }} onPress={this.updateClapCount}>
                    <Text>Clap</Text>
                </TouchableOpacity>
            </View>
        );
    }
}