import React, { Component } from 'react';
// import { Container, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button } from 'native-base';
// import moment from 'moment';
import ArticleList from './article/ArticleList';

class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    static navigationOptions = {
        headerTitle: 'News',
        headerStyle: {
            backgroundColor: '#FFF',
        },
        headerTintColor: '#000',
        headerTitleStyle: {
            fontWeight: 'bold',
        }
    }

    render() {
        return (
            <ArticleList navigation={this.props.navigation}/>
        );
    }
}

export default HomeScreen;