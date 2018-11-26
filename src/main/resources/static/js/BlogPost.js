import React, { Component } from "react";
import ReactDOM from "react-dom";

export class BlogPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };

    this.togglePost = this.togglePost.bind(this);
  }

  togglePost() {
    this.setState({ visible: !this.state.visible });
  }

  render() {
    const { title, body, timestamp, timeString, deletePost } = this.props;
    const { visible } = this.state;

    return (
      <div className="blog__post">
        <div className="header">
          <h2>{title}</h2>
          <p>{timeString}</p>
        </div>
        {visible ? (
          <div>
            <article>{body}</article>
          </div>
        ) : null}
        <div>
          <button className="button" onClick={this.togglePost}>
            {visible ? "Hide" : "View"}
          </button>
          <button className="button" onClick={() => deletePost(timestamp)}>
            Delete
          </button>
        </div>
      </div>
    );
  }
}
