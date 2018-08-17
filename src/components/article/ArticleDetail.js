import React, { Component } from 'react';
import { Spinner } from 'native-base';
import { View, WebView } from 'react-native';

class ArticleDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            params: this.props.navigation.state.params
        }
    }

    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;

        return {
            title: params ? params.source : 'A Nested Details Screen',
        }
    };

    displaySpinner() {
        return (
            <Spinner color='blue' />
        );
    }

    render() {
        return (
            <WebView
                startInLoadingState={true}
                renderLoading={() => {
                    return this.displaySpinner();
                  }}
                source={{ uri: this.state.params.webUrl }}
            />
        );
    }
}

export default ArticleDetail;