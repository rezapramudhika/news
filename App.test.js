import React from 'react';
import HomeScreen from './src/components/HomeScreen';
import ArticleList from './src/components/article/ArticleList';
import BookList from './src/components/book/BookList';
import { Button} from 'react-native';

import renderer from 'react-test-renderer';

describe('<HomeScreen/>', () => {
  it('position change to article', () => {
    let HomeScreenData = renderer.create(<HomeScreen />).getInstance();
    let inst = renderer.create(<Button onPress={() => HomeScreenData.handlePosition('article')} />);
    let btnArticle = inst.root.findByType(Button);
    btnArticle.props.onPress();
    expect(HomeScreenData.state.position).toEqual('article');
  });
});


describe('<ArticleList/>', () => {
  it('fetch data successfully', async () => {
    let ArticleListData = renderer.create(<ArticleList />).getInstance();
    await ArticleListData.fetchArticle();
    if (!ArticleListData.state.loading) {
      expect(ArticleListData.state.data).toHaveLength(10);
    }
  });

  it('sort data', () => {
    let ArticleListData = renderer.create(<ArticleList />).getInstance();
    let inst = renderer.create(<Button onPress={() => ArticleListData.sort()} />);
    let btnSort = inst.root.findByType(Button);
    btnSort.props.onPress();
    expect(ArticleListData.state.sort).toBe('oldest');
  });

  it('load more data when button load more clicked', async () => {
    let ArticleListData = renderer.create(<ArticleList />).getInstance();
    await ArticleListData.fetchArticle();
    if (!ArticleListData.state.loading) {
      let inst = renderer.create(<Button onPress={() => ArticleListData.handleLoadMore()} />);
      let btnLoadMore = inst.root.findByType(Button);
      btnLoadMore.props.onPress();
      if (!ArticleListData.state.loadingLoadMore) {
        expect(ArticleListData.state.data).toHaveLength(20);
      }
    }
  });
});

describe('<BookList/>', () => {
  it('fetch data successfully', async () => {
    let BookListData = renderer.create(<BookList />).getInstance();
    await BookListData.fetchBook();
    if (!BookListData.state.loading) {
      expect(BookListData.state.data).toHaveLength();
    }
  });
});
