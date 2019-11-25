
import Home from './Home';
import MovieInfo from './MovieInfo';
import MovieList from './MovieList';
import { createStackNavigator } from 'react-navigation';
import CodePush from 'react-native-code-push';

const codePushOptions = { checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME };
const app = createStackNavigator({
    Home: { screen: Home, navigationOptions: { title: 'Search Movies' } },
    MovieList: MovieList,
    MovieInfo: MovieInfo
});

export default CodePush(codePushOptions)(app);