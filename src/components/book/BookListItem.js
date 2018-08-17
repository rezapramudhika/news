import React, { Component } from 'react';
import { ListItem, Text, Body } from 'native-base';

class BookListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        const { published_date, title, description, author, amazon_product_url } = this.props.data;
        return (
            <ListItem onPress={() => this.props.navigation.navigate('WebView',{
                webUrl: amazon_product_url
            })}>
                <Body>
                    <Text style={{ fontWeight: "bold" }} bold>{title}</Text>
                    <Text style={{ fontSize: 12 }} numberOfLines={2}>{description}</Text>
                    <Text style={{ fontSize: 12 }} note>{`Author: ${author}`}</Text>
                    <Text style={{ fontSize: 12 }} note>{`Publish Date: ${published_date}`}</Text>
                </Body>
            </ListItem>
        );
    }
}

export default BookListItem;