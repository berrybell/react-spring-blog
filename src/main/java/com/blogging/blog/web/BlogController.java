package com.blogging.blog.web;

import java.util.List;
import java.util.Optional;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blogging.blog.model.BlogPost;
import com.blogging.blog.repo.BlogMongoRepository;

@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("*")
public class BlogController {
	@Autowired
	BlogMongoRepository blogRepository;

	@GetMapping("/posts")
	public List<BlogPost> getAllPosts() {
		return blogRepository.findAll();
	}

	@PostMapping("/posts/create")
	public BlogPost createPost(@Valid @RequestBody BlogPost blogpost) {
		return blogRepository.save(blogpost);
	}

	@GetMapping("/posts/{id}")
	public ResponseEntity<BlogPost> getBlogPost(@PathVariable("id") String id) {
		Optional<BlogPost> blogPostData = blogRepository.findById(id);
		if (blogPostData.isPresent()) {
			return new ResponseEntity<>(blogPostData.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("/posts/{id}")
	public ResponseEntity<String> deleteBlogPost(@PathVariable("id") String id) {
		try {
			blogRepository.deleteById(id);
		} catch (Exception e) {
			return new ResponseEntity<>("Fail to delete!", HttpStatus.EXPECTATION_FAILED);
		}
		return new ResponseEntity<>("BlogPost has been deleted!", HttpStatus.OK);
	}
}