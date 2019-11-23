import React, { PureComponent } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableHighlight } from 'react-native';
import { getSearchResults } from '../utils/MovieService';
import Analytics from 'appcenter-analytics';

export default class MovieList extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            data: null
        };
    }

    static navigationOptions = {
        headerTitle: 'Search Results',
    };

    async componentDidMount() {
        const keyword = this.props.navigation.getParam('searchText');
        Analytics.trackEvent("Search Initiated", { keyword: keyword });
        const data = await getSearchResults(keyword);

        if (data) {
            this.setState({
                loading: false,
                data: data.Search
            });
        }
    }

    navigate = (item) => {
        this.props.navigation.navigate('MovieInfo', {
            movieId: item.imdbID,
        })
    };

    renderMovieItem = ({ item, index }) => {

        if (item.Year.indexOf('–') === 4 && item.Year.length === 5) {
            item.Year = item.Year.replace('–', ' Onwards');
        }

        let image = null;
        if (item.Poster === 'N/A') {
            image = require('../images/default_poster.jpg');
        }

        return (
            <TouchableHighlight onPress={() => this.navigate(item)} key={index}>
                <View style={styles.movieItemWrap}>
                    <Image
                        style={styles.moviePoster}
                        source={image || { uri: item.Poster }}
                    />
                    <View style={styles.movieDetails}>
                        <Text>
                            {item.Title}
                        </Text>
                        <Text>
                            {item.Year}
                        </Text>
                        <Text>
                            {item.Type}
                        </Text>
                    </View>
                </View>
            </TouchableHighlight>);
    };

    render() {

        if (this.state.loading) {
            return (<View style={styles.message}>
                <Text style={styles.messageText}>Loading Please wait</Text>
            </View>);
        }

        return (
            <FlatList
                data={this.state.data}
                renderItem={this.renderMovieItem} />
        );
    }
}

const styles = StyleSheet.create({
    movieItemWrap: {
        flexDirection: 'row',
        marginTop: 8,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        marginHorizontal: 10
    },
    moviePoster: {
        width: 50,
        height: 80,
        marginRight: 20
    },
    movieDetails: {
        width: '80%',
        flexWrap: 'wrap'
    },
    message: {
        alignItems: "center",
        paddingTop: 10
    },
    messageText: {
        fontSize: 14,
        fontWeight: 'bold'
    }
});