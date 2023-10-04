import { Component } from 'react';
import { getArticlesService } from './services/articlesServices';
import Notiflix from 'notiflix';
import { Searchbar } from './searchbar/Searchbar';
import { ImageGallery } from './imageGallery/ImageGallery';
import './App.css';
import { Loader } from './loader/Loader';
import { Button } from './button/Button';

const fetchStatus = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
};

const PER_PAGE = 12;

export class App extends Component {
  state = {
    search: '',
    page: 1,
    items: [],
    status: fetchStatus.IDLE,
  };

  totalResults = null;

  async componentDidUpdate(_, prevState) {
    const { search, page } = this.state;

    if (prevState.search !== search || prevState.page !== page) {
      this.setState({ status: fetchStatus.LOADING });

      try {
        const { data } = await getArticlesService(search, page);

        this.totalResults = data.totalHits;

        if (data.totalHits < 1) {
          Notiflix.Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
          );

          this.setState({ status: fetchStatus.SUCCESS });
        }

        Notiflix.Notify.info(`Total found ${data.total} photos.`);

        this.setState(prevState => ({
          items: page > 1 ? [...prevState.items, ...data.hits] : [...data.hits],

          status: fetchStatus.SUCCESS,
        }));
      } catch (error) {
        this.setState({ status: fetchStatus.ERROR });
        Notiflix.Notify.failure('Sorry something went wrong.');
      }
    }
  }

  handleChangeSearch = value => {
    if (value.trim() === '') {
      Notiflix.Notify.info('Please enter your search term.');
      return;
    }
    this.setState({ search: value, page: 1 });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { status, page } = this.state;

    const canLoadMore = Math.ceil(this.totalResults / PER_PAGE) > page;
    return (
      <div className="App">
        <Searchbar onSubmit={this.handleChangeSearch} />

        <ImageGallery items={this.state.items} />

        {status === fetchStatus.LOADING && <Loader />}

        {canLoadMore && <Button onClick={this.handleLoadMore} />}
      </div>
    );
  }
}
