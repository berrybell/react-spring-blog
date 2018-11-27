# React + Spring Data MongoDB REST Blog Editor

A sample CR~~U~~D application built with React, Spring and MongoDB.

## Installation

To run this locally and have your changes saved in a database, you need to have an accessible MongoDB instance that you can connect to. To get started, visit [MongoDB's official tutorial](https://docs.mongodb.com/manual/).

Once you're done, clone this to your computer. To compile the package into an executable JAR and start it, open the folder in your terminal and run the following commands:

```
mvn package -DskipTests
java -jar target/blogapp.jar
```

The app will run on `http://localhost:8080`.

## Links

- [frontend-maven-plugin](https://github.com/eirslett/frontend-maven-plugin) is used to run Webpack inside the application
