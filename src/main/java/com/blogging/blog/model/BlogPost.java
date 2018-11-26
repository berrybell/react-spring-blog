package com.blogging.blog.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "blogpost")
public class BlogPost {
	@Id
	private String id;

	private int timestamp;
	private String title;
	private String body;

	public BlogPost(int timestamp, String title, String body) {
		this.timestamp = timestamp;
		this.title = title;
		this.body = body;
	}

	public String getId() {
		return id;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getTitle() {
		return this.title;
	}

	public void setBody(String body) {
		this.body = body;
	}

	public String getBody() {
		return this.body;
	}

	public void setTimestamp(int timestamp) {
		this.timestamp = timestamp;
	}

	public int getTimestamp() {
		return this.timestamp;
	}

	public String toString() {
		String info = String.format("{'timestamp': %s 'title': %s, 'body': %d}", timestamp, title, body);
		return info;
	}
}
