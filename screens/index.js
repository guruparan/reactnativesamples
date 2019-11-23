
import Home from './Home';
import MovieInfo from './MovieInfo';
import MovieList from './MovieList';
import { createStackNavigator } from 'react-navigation';

export default createStackNavigator({
    Home: { screen: Home, navigationOptions: { title: 'Search Movies' } },
    MovieList: MovieList,
    MovieInfo: MovieInfo
});