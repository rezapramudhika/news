import React, { Component } from 'react';
import { Container, Tabs, ScrollableTab, Tab } from 'native-base';
import BookList from './BookList';

class BookContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <Container>
                <Tabs tabBarBackgroundColor='#363636' renderTabBar={() => <ScrollableTab />}>
                    <Tab
                        tabStyle={{ backgroundColor: '#363636' }}
                        activeTabStyle={{ backgroundColor: '#363636' }}
                        textStyle={{color: '#fff'}}
                        heading='E-Book'>
                        <BookList list='e-book-fiction' navigation={this.props.navigation} />
                    </Tab>
                    <Tab
                        tabStyle={{ backgroundColor: '#363636' }}
                        activeTabStyle={{ backgroundColor: '#363636' }}
                        textStyle={{color: '#fff'}}
                        heading='Hard Cover'>
                        <BookList list='hardcover-fiction' navigation={this.props.navigation} />
                    </Tab>
                </Tabs>
            </Container>
        );
    }
}

export default BookContainer;