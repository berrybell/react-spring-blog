import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BlogPost } from "./BlogPost";
import { AddPost } from "./AddPost";

import "../css/styles.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      addPost: false
    };

    this.toggleAddPost = this.toggleAddPost.bind(this);
    this.savePost = this.savePost.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    // fetch("https://jsonplaceholder.typicode.com/posts")
    //   .then(r => r.json())
    //   .then(r => {
    //     this.setState({
    //       posts: r
    //     });
    //   });

    const r = [
      {
        timestamp: 1443133497566,
        timeString: "25.9.2015",
        title: "Post 1",
        body:
          "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
      },
      {
        timestamp: 1543134498566,
        timeString: "25.11.2018",
        title: "Post 2",
        body:
          "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
      }
    ];

    r.sort((a, b) => {
      return a.timestamp - b.timestamp;
    });

    this.setState({
      posts: r
    });
  }

  handleChange = e => {
    //do something
    const name = e.target.name;
    this.setState({ [name]: e.target.value });
  };

  convertTimestamp = unixTime => {
    const fDate = new Date(unixTime);
    const day = fDate.getDate();
    const month = fDate.getMonth() + 1;
    const year = fDate.getFullYear();
    return `${day}.${month}.${year}`;
  };

  savePost = e => {
    //do something
    const timestamp = Date.now();
    const newPost = {
      title: this.state.title,
      body: this.state.body,
      timestamp: timestamp,
      timeString: this.convertTimestamp(timestamp)
    };
    const posts = [...this.state.posts];
    posts.push(newPost);
    this.setState({ posts });
    this.toggleAddPost();
  };

  deletePost = key => {
    const posts = this.state.posts.filter(x => x.timestamp !== key);
    this.setState({ posts });
  };

  toggleAddPost = () => {
    this.setState({ addPost: !this.state.addPost });
  };

  render() {
    return (
      <div className="App">
        <h1>Blog</h1>
        <button className="button-primary" onClick={this.toggleAddPost}>
          Add new post
        </button>
        {this.state.addPost ? (
          <AddPost
            savePost={this.savePost}
            toggleEditor={this.toggleAddPost}
            handleChange={this.handleChange}
          />
        ) : null}
        {this.state.posts.map(post => {
          return (
            <BlogPost
              key={post.timestamp}
              {...post}
              deletePost={this.deletePost}
            />
          );
        })}
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
