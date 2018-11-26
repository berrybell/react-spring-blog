package com.blogging.blog.repo;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.blogging.blog.model.BlogPost;

public interface BlogMongoRepository extends MongoRepository<BlogPost, String> {
	Optional<BlogPost> findById(String id);
}
