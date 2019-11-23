import React, { Component } from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { getMovieDetails } from '../utils/MovieService';
import Analytics from 'appcenter-analytics';

export default class MovieInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            movie: null
        }
    }

    static navigationOptions = {
        headerTitle: 'Movie Info',
    };

    async componentDidMount() {
        const movieid = this.props.navigation.getParam('movieId');
        Analytics.trackEvent("Movie Viewed", { movieId: movieid });
        const data = await getMovieDetails(movieid);
        
        if (data) {
            this.setState({
                loading: false,
                movie: data
            });
        }
    }

    renderField(key, value) {
        if (value === 'N/A' || !value)
            return null;

        return (<View style={styles.fieldText}>
            <Text>
                <Text style={styles.fieldBoldText}>{key}</Text> : <Text>{value}</Text>
            </Text>
        </View>);
    }

    renderRatingField(label, rating, text) {
        if (!rating || rating === 'N/A')
            return null;

        let viewColor = 'green';
        if (rating >= 50 && rating < 80)
            viewColor = 'yellow';

        if (rating < 50)
            viewColor = 'red';

        return (<View style={[styles.fieldText, { marginHorizontal: 20 }]}>
            <Text style={styles.fieldBoldText}>{label}</Text>
            <View style={styles.ratingBox}>
                <View style={{ width: `${rating}%`, height: '100%', backgroundColor: viewColor, alignItems: 'center' }}>
                    <Text>
                        {text}
                    </Text>
                </View>
            </View>
        </View>);
    }

    render() {
        if (this.state.loading) {
            return (<View style={styles.message}>
                <Text style={styles.messageText}>Loading Please wait</Text>
            </View>);
        }

        const { movie } = this.state;

        const posterUrl = movie.Poster !== 'N/A' ? movie.Poster : null;

        return (
            <ScrollView>
                <View style={{ alignItems: 'center' }}>
                    <Text style={styles.name}>{`${movie.Title}(${movie.Year})`}</Text>
                    <View style={styles.posterWrap}>
                        {posterUrl && <Image source={{ uri: posterUrl }} style={styles.poster} />}
                    </View>
                    <View>
                        <Text style={styles.plot}>{movie.Plot}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            {this.renderRatingField("IMDB", movie.imdbRating * 10, `${movie.imdbRating}/10`)}
                            {this.renderRatingField("Meta Score", movie.Metascore, `${movie.Metascore}%`)}
                        </View>
                        <View style={styles.fieldsWrap}>
                            {this.renderField('Directed by', movie.Director)}
                            {this.renderField('Release Date', movie.Released)}
                            {this.renderField('Runtime', movie.Runtime)}
                            {this.renderField('Rated', movie.Rated)}
                            {this.renderField('Actors', movie.Actors)}
                            {this.renderField('Writers', movie.Writers)}
                            {this.renderField('Language', movie.Language)}
                            {this.renderField('Country', movie.Country)}
                            {this.renderField('Awards', movie.Awards)}
                            {this.renderField("Box Office", movie.BoxOffice)}
                        </View>
                    </View>
                </View>
            </ScrollView>
        );
    };
}


const styles = StyleSheet.create({
    fieldText: {
        marginVertical: 5
    },
    fieldBoldText: {
        fontWeight: 'bold'
    },
    message: {
        alignItems: "center",
        paddingTop: 10
    },
    messageText: {
        fontSize: 14,
        fontWeight: 'bold'
    },
    plot: {
        marginVertical: 10,
        marginHorizontal: 20
    },
    fieldsWrap: {
        alignItems: 'flex-start',
        marginHorizontal: 20
    },
    name: {
        fontWeight: 'bold',
        fontSize: 15,
        marginVertical: 10,
        marginHorizontal: 5
    },
    posterWrap: {
        borderColor: 'black',
        padding: 5,
        borderWidth: 1
    },
    poster: {
        height: 250,
        width: 150
    },
    ratingBox: {
        width: 100,
        borderWidth: 1,
        borderColor: 'black',
        height: 20
    }
});