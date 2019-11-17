import React, { PureComponent } from 'react';
import { View, Text, BackHandler, Image, Alert, TouchableOpacity } from "react-native";
import { Navigation } from 'react-native-navigation';
import { goback } from '../utils/NavigationManager';

export default class BookInfo extends PureComponent {

    constructor(props) {
        super(props);
        Navigation.events().bindComponent(this);

        this.state = {
            claps: 0
        };
    }

    componentDidDisappear() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentDidAppear() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    navigationButtonPressed({ buttonId }) {
        switch (buttonId) {
            case 'backbutton':
                this.handleBackPress();
                break;

            default:
                break;
        }
    }

    handleBackPress = () => {
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