import React, { Component } from 'react';
import ArticleList from './article/ArticleList';
import BookContainer from './book/BookContainer';
import { Container, Footer, FooterTab, Button, Icon, Text, Badge } from 'native-base';

class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            position: 'article'
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

    handlePosition = (position) => {
        this.setState({
            position
        })
    }

    render() {
        return (
            <Container>
                {
                    this.state.position === 'article' ?
                        <ArticleList navigation={this.props.navigation} /> :
                        <BookContainer navigation={this.props.navigation} />
                }
                <Footer>
                    <FooterTab style={{ backgroundColor: '#363636' }}>
                        {
                            this.state.position === 'article' ?
                                <Button vertical backgroundColor='#737373'>
                                    <Icon style={{color: 'white'}} active name='paper' />
                                    <Text style={{color: 'white'}}>Article</Text>
                                </Button> :
                                <Button vertical onPress={() => this.handlePosition('article')}>
                                    <Icon style={{color: 'white'}} name='paper' />
                                    <Text style={{color: 'white'}}>Article</Text>
                                </Button>
                        }
                        {
                            this.state.position === 'book' ?
                                <Button vertical backgroundColor='#737373'>
                                    <Icon style={{color: 'white'}} active name='book' />
                                    <Text style={{color: 'white'}}>Book</Text>
                                </Button> :
                                <Button vertical onPress={() => this.handlePosition('book')}>
                                    <Icon style={{color: 'white'}} name='book' />
                                    <Text style={{color: 'white'}}>Book</Text>
                                </Button>
                        }
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}

export default HomeScreen;