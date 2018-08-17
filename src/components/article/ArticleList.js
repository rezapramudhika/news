import React, { Component } from 'react';
import { Container, Header, Item, Text, Icon, Input, Spinner, Button } from 'native-base';
import { RefreshControl, FlatList, ActivityIndicator, View } from 'react-native'
import { getArticle } from '../../api/index';
import ArticleListItem from './ArticleListItem';

class ArticleList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            sort: 'newest',
            page: 1,
            data: [],
            query: '',
            refreshing: false,
            loadingLoadMore: false
        }
    }

    componentDidMount() {
        this.fetchArticle();
    }

    fetchArticle = () => {
        this.setState({
            loading: true
        }, () => {
            getArticle({
                sort: this.state.sort,
                page: this.state.page,
                q: this.state.query
            }).then(data => {
                this.setState({
                    data,
                    loading: false
                })
            }).catch(err => {
                console.log(err);
            })
        })
    }

    sort = () => {
        if (this.state.sort === 'newest') {
            this.setState({
                sort: 'oldest'
            }, () => {
                this.fetchArticle();
            });
        } else {
            this.setState({
                sort: 'newest'
            }, () => {
                this.fetchArticle();
            });
        }
    }

    onRefresh = () => {
        this.setState({
            refreshing: true
        }, () => {
            this.fetchArticle();
        });

        if (!this.state.loading) {
            this.setState({ refreshing: false });
        }
    }

    handleLoadMore = () => {
        this.setState({
            page: this.state.page + 1,
            loadingLoadMore: true
        }, () => {
            setTimeout(() => {
                getArticle({
                    sort: this.state.sort,
                    page: this.state.page,
                    q: this.state.query
                }).then(data => {
                    this.setState({
                        data: [...this.state.data, ...data],
                        loadingLoadMore: false
                    })
                }).catch(err => {
                    console.log(err);
                })
            }, 1500)
        })
    }

    renderFooter = () => {
        return (
            <View
                style={{
                    paddingVertical: 10,
                    borderTopWidth: 1,
                    borderColor: '#CED0CE'
                }}
            >
                {
                    this.state.loadingLoadMore ?
                        <ActivityIndicator animating size='large' /> :
                        <Button full transparent onPress={this.handleLoadMore}>
                            <Text>Load More</Text>
                        </Button>
                }
            </View>
        );
    };

    render() {
        return (
            <Container>
                <Header style={{ backgroundColor: '#363636' }} searchBar rounded>
                    <Item>
                        <Icon name='ios-search' />
                        <Input placeholder='Search' onChangeText={(query) => this.setState({ query })} onSubmitEditing={this.fetchArticle} />
                        <Button onPress={this.sort} transparent>
                            <Icon style={{color: '#363636'}} type='MaterialIcons' name='sort' />
                        </Button>
                    </Item>
                    <Button onPress={this.fetchArticle} transparent>
                        <Text>Search</Text>
                    </Button>
                </Header>
                {
                    this.state.loading ?
                        <Spinner color='blue' /> :
                        <FlatList
                            data={this.state.data}
                            renderItem={
                                ({ item }) => {
                                    return (
                                        <ArticleListItem
                                            key={`article-${item._id}`}
                                            data={
                                                {
                                                    web_url: item.web_url,
                                                    headline: item.headline.main,
                                                    snippet: item.snippet,
                                                    pub_date: item.pub_date,
                                                    imgUrl: item.multimedia.length !== 0 && item.multimedia[0].url
                                                }
                                            }
                                            navigation={this.props.navigation} />
                                    );
                                }
                            }
                            keyExtractor={(item, idx) => `${item._id}`}
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.refreshing}
                                    onRefresh={this.onRefresh}
                                />
                            }
                            ListFooterComponent={this.renderFooter}
                        />
                }
            </Container >
        );
    }
}

export default ArticleList;