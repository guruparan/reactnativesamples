import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';
import Analytics from 'appcenter-analytics';
import Crashes from 'appcenter-crashes';

export default class Home extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            searchText: ''
        };
    }

    componentDidMount() {
        Analytics.trackEvent("Home Loaded");
    }

    onSearchButtonPress = () => {
        const { searchText } = this.state;

        if (searchText) {
            if (searchText === 'crashtest') {
                throw new Error('This is a test javascript crash!');
            }
            this.props.navigation.navigate('MovieList', { searchText: searchText });
        } else {
            alert('Enter Search Text to begin');
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <Text styles={styles.headerText}>Enter the movie name to begin</Text>
                <TextInput style={styles.searchText} value={this.state.searchText} onChangeText={text => { this.setState({ searchText: text }) }} />
                <Button title="Search" onPress={this.onSearchButtonPress} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        justifyContent: 'center',
        paddingHorizontal: 20
    },
    headerText: {
        fontSize: 15
    },
    searchText: {
        borderBottomWidth: 1,
        marginBottom: 10
    }
});