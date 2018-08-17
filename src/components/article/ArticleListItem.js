import React, { Component } from 'react';
import { ListItem, Thumbnail, Text, Left, Body } from 'native-base';
import moment from 'moment';
import { BASE_URL } from '../../api/constant';

class ArticleListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        const { web_url, imgUrl, headline, snippet, pub_date } = this.props.data;
        return (
            <ListItem 
            thumbnail
            onPress={() => this.props.navigation.navigate('WebView',{
                webUrl: web_url
            })}>
                <Left>
                    {
                        imgUrl ?
                            <Thumbnail square source={{ uri: BASE_URL+imgUrl }} /> :
                            <Thumbnail square source={{ uri: 'https://www.aubreydaniels.com/sites/default/files/default_images/x2017-05-15_18.png.pagespeed.ic.tLD9q0ZZph.png' }} />
                    }

                </Left>
                <Body>
                    <Text style={{ fontWeight: 'bold' }} bold>{headline}</Text>
                    <Text style={{ fontSize: 12 }} numberOfLines={2}>{snippet}</Text>
                    <Text style={{ fontSize: 12 }} note>{moment(pub_date).startOf('hour').fromNow()}</Text>
                </Body>
            </ListItem>
        );
    }
}

export default ArticleListItem;