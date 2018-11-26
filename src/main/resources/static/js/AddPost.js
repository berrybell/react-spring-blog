import React, { Component } from "react";
import ReactDOM from "react-dom";

export class AddPost extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { savePost, toggleEditor, handleChange } = this.props;
    return (
      <div className="blog__addpost">
        <p>Title</p>
        <input
          type="text"
          placeholder="Title"
          name="title"
          onChange={handleChange}
        />
        <p>Text</p>
        <textarea
          placeholder="Text"
          name="body"
          id=""
          cols="30"
          rows="10"
          onChange={handleChange}
        />
        <div>
          <button className="button" onClick={toggleEditor}>
            Cancel
          </button>
          <button className="button-primary" onClick={savePost}>
            Save post
          </button>
        </div>
      </div>
    );
  }
}
