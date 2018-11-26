package com.blogging.blog;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;

import java.util.Arrays;
import java.util.List;
 
import com.blogging.blog.model.BlogPost;
import com.blogging.blog.repo.BlogMongoRepository;

@SpringBootApplication
public class BlogApplication {
	@Autowired
	BlogMongoRepository BlogRepo;

	public static void main(String[] args) {
		SpringApplication.run(BlogApplication.class, args);
	}
}