import React, { PureComponent } from 'react';
import { View, FlatList, Text, TouchableOpacity } from "react-native";
import { navigate } from '../utils/NavigationManager';
import { screens } from '.';

const books = [
    {
        Id: 1,
        Name: 'Harry Potter',
        Author: 'J K Rowling',
        Year: 2010,
        cover: 'https://images.isbndb.com/covers/61/77/9780340796177.jpg'
    },
    {
        Id: 2,
        Name: 'Harry Potter',
        Author: 'J K Rowling',
        Year: 2010,
        cover: 'https://images.isbndb.com/covers/61/77/9780340796177.jpg'
    },
    {
        Id: 3,
        Name: 'Harry Potter',
        Author: 'J K Rowling',
        Year: 2010,
        cover: 'https://images.isbndb.com/covers/61/77/9780340796177.jpg'
    }
];

export default class BookList extends PureComponent {

    onItemPress = book => {
        navigate(screens.BookInfo,
            {
                topBar: {
                    title: {
                        text: book.Name
                    },
                    leftButtons: [
                        {
                            id: 'backbutton',
                            icon: require('../images/backbutton.png')
                        }
                    ],
                }
            }, { book });
    };

    renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => this.onItemPress(item)}
                style={{
                    borderWidth: 1,
                    marginHorizontal: 10,
                    marginVertical: 5,
                    padding: 8,
                    borderRadius: 6
                }}>
                <Text>{item.Name}</Text>
                <Text>{item.Author}</Text>
            </TouchableOpacity>
        );
    };

    render() {
        return (
            <View>
                <FlatList data={books} renderItem={this.renderItem} keyExtractor={(item) => item.Id.toString()} />
            </View>
        );
    }

}