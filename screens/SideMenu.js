import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { navigate, toggleDrawer } from '../utils/NavigationManager';
import { screens } from '.';

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: 'white'
    },
    topBar: {
        backgroundColor: 'black',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default class SideMenu extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            topBarHeight: 0
        };
    }

    async componentDidMount() {
        const constants = await Navigation.constants();
        const topBarHeight = constants.topBarHeight;
        this.setState({
            topBarHeight: topBarHeight
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={[{ height: this.state.topBarHeight }, styles.topBar]}>
                    <Text style={{ color: 'white', fontSize: 20 }}>Navigation Sample</Text>
                </View>
                <View>
                    <TouchableOpacity
                        style={{
                            marginVertical: 5,
                            padding: 5,
                            borderWidth: 2,
                            borderColor: 'black',
                            width: '100%'
                        }}
                        onPress={
                            () => {
                                navigate(screens.BookList, {
                                    topBar: {
                                        title: {
                                            text: 'Browse Books'
                                        }
                                    }
                                });
                                toggleDrawer();
                            }}>
                        <Text style={{ fontSize: 15 }}>Browse</Text>
                    </TouchableOpacity>
                </View>
            </View >
        );
    }
}