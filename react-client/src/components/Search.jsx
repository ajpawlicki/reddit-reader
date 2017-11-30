import React, { Component } from 'react';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTopic: '',
      subredditNames: [],
      loadingData: false,
      emptyData: false,
      errorRetrievingData: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.fetchSubredditNames = this.fetchSubredditNames.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  fetchSubredditNames(topic) {
    this.setState({
      loadingData: true,
      emptyData: false,
      errorRetrievingData: false,
      subredditNames: []
    });

    fetch(`https://www.reddit.com/api/subreddits_by_topic.json?query=${topic}`)
    .then(res => res.json())
    .then(data => {
      if (data.length > 0) {
        this.setState({ emptyData: false });
      } else {
        this.setState({ emptyData: true });
      }

      this.setState({
        subredditNames: data,
        loadingData: false
      });
    })
    .catch(err => {
      console.error(err);

      this.setState({
        errorRetrievingData: true,
        loadingData: false
      });
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    
    this.fetchSubredditNames(this.state.searchTopic);
  }

  handleInputChange(e) {
    this.setState({
      searchTopic: e.target.value
    });
  }

  render() {
    return (
      <div>
        <h3>Search for subreddits</h3>
        <form onSubmit={this.handleSubmit}>
          <input type="text" className="input-text-box" onChange={this.handleInputChange} value={this.state.searchTopic}/>
          <input type="submit"/>
        </form>

        {this.state.loadingData ? <div className="alert">Loading...</div> : null}
        {this.state.emptyData ? <div className="alert">No results!</div> : null}
        {this.state.errorRetrievingData ? <div className="alert">There was an error!</div> : null}

        <ul className="subreddit-names-list">
          {this.state.subredditNames.map((subreddit, index) => {
            return (
            <li key={index}
              onClick={() => this.props.handleSubredditNameClick(subreddit.name)}>
              <span>{subreddit.name}</span>
            </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Search;
