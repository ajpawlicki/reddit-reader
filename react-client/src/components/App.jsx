import React, { Component } from 'react';
import Search from './Search.jsx';
import Subreddit from './Subreddit.jsx';

class App extends Component {
  constructor(props) {
    super(props);

    this.subredditNamesHash = new Map();

    this.state = {
      subreddits: [],
      errorRetrievingData: false,
      loadingData: false,
    };

    this.handleSubredditNameClick = this.handleSubredditNameClick.bind(this);
    this.handleDeleteSubreddit = this.handleDeleteSubreddit.bind(this);
  }

  fetchSubreddit(name) {
    this.setState({ errorRetrievingData: false });

    if (!this.subredditNamesHash.has(name)) {
      this.setState({ loadingData: true });
    
      fetch(`https://www.reddit.com/r/${name}.json`)
      .then(res => res.json())
      .then(data => {
          data.name = name;
    
          this.setState({
            subreddits: this.state.subreddits.concat(data),
            loadingData: false
          });

          this.subredditNamesHash.set(name, true);
      })
      .catch(err => {
        console.error(err);
        this.setState({
          errorRetrievingData: true,
          loadingData: false
        });
      });
    }
  
  }

  handleSubredditNameClick(name) {
    this.fetchSubreddit(name);
  }

  handleDeleteSubreddit(name) {
    for (let i = 0; i < this.state.subreddits.length; i++) {
      if (this.state.subreddits[i].name === name) {
        this.state.subreddits.splice(i, 1);
        break;
      }
    }

    this.setState({ subreddits: this.state.subreddits });

    this.subredditNamesHash.delete(name);
  }

  componentDidMount() {
    this.fetchSubreddit('news');
  }

  render() {
    return (
      <div>
        <Search handleSubredditNameClick={this.handleSubredditNameClick} />
        
        {this.state.loadingData ? <div className="alert">Loading...</div> : null}
        {this.state.errorRetrievingData ? <div className="alert">There was an error!</div> : null}

        <div className="subreddits-container">
          {this.state.subreddits.map((subreddit, index) => {
            return (
              <Subreddit
                key={index}
                subreddit={subreddit}
                handleDeleteSubreddit={this.handleDeleteSubreddit} />
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;
