import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BlogPost } from "./BlogPost";
import { AddPost } from "./AddPost";

import "../css/styles.css";

const BASE_URL = "http://localhost:8080/api";

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
    fetch(`${BASE_URL}/posts`)
      .then(r => r.json())
      .then(r => {
        const posts = r.sort((a, b) => {
          return a.timestamp - b.timestamp;
        });
        this.setState({
          posts
        });
      });
  }

  handleChange = e => {
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
    //Send POST request to back end
    fetch(`${BASE_URL}/posts/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        timestamp: newPost.timestamp / 1000,
        title: newPost.title,
        body: newPost.body
      })
    })
      .then(data => {
        console.log("Request success: ", data);
      })
      .catch(error => {
        console.log("Request failure: ", error);
      });
  };

  deletePost = key => {
    const posts = this.state.posts.filter(x => x.id !== key);
    this.setState({ posts });
    //Send DELETE request to back end
    fetch(`${BASE_URL}/posts/${key}`, {
      method: "DELETE"
    })
      .then(data => {
        console.log("Request success: ", data);
      })
      .catch(error => {
        console.log("Request failure: ", error);
      });
  };

  toggleAddPost = () => {
    this.setState({ addPost: !this.state.addPost });
  };

  render() {
    const { posts, addPost } = this.state;
    return (
      <div className="App">
        <h1>Blog</h1>
        <button className="button-primary" onClick={this.toggleAddPost}>
          Add new post
        </button>
        {addPost ? (
          <AddPost
            savePost={this.savePost}
            toggleEditor={this.toggleAddPost}
            handleChange={this.handleChange}
          />
        ) : null}
        {posts.length > 0 || addPost ? null : (
          <p>Nothing here yet. Go write something cool!</p>
        )}
        {posts.map(post => {
          return (
            <BlogPost key={post.id} {...post} deletePost={this.deletePost} />
          );
        })}
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
