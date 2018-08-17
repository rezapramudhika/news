import React, { Component } from 'react';
import { Spinner } from 'native-base';
import { RefreshControl, FlatList} from 'react-native'
import { getBook } from '../../api/index';
import BookListItem from './BookListItem';

class BookList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            data: [],
            refreshing: false,
        }
    }

    componentDidMount() {
        this.fetchBook();
    }

    fetchBook = () => {
        this.setState({
            loading: true
        }, () => {
            getBook({
                list: this.props.list
            }).then(data => {
                this.setState({
                    data,
                    loading: false
                })
            }).catch(err => {
                console.log(err);
            })
        });
    }

    onRefresh = () => {
        this.setState({ refreshing: true });
        this.fetchBook();
        if (!this.state.loading) {
            this.setState({ refreshing: false });
        }
    }

    render() {
        return (
            this.state.loading ?
                <Spinner color='blue' /> :
                <FlatList
                    data={this.state.data}
                    renderItem={
                        ({ item }) => {
                            return (
                                <BookListItem
                                    key={`book-${item.amazon_product_url}`}
                                    data={
                                        {
                                            published_date: item.published_date,
                                            title: item.book_details[0].title,
                                            description: item.book_details[0].description,
                                            author: item.book_details[0].author,
                                            amazon_product_url: item.amazon_product_url
                                        }
                                    }
                                    navigation={this.props.navigation} />
                            );
                        }
                    }
                    keyExtractor={(item, idx) => `${item.amazon_product_url}`}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this.onRefresh}
                        />
                    }
                />
        );
    }
}

export default BookList;