# books-api
This is an API to track the books I've read. 

It was modeled after the tutorial provided by Michael Herman at https://mherman.org/blog/designing-a-restful-api-with-node-and-postgres/.

The books-API has 5 methods with which a user may interact with their booklist database:

GET: localhost:3000/api/booklist 
Returns a list of all the books and their attributes

GET: localhost:3000/api/booklist/title 
Returns the book and attributes of the title name appended to the URL

POST: localhost:3000/api/booklist 
Adds a book and its attributes to the booklist according to the JSON data included in the body of the HTTP request

PUT: localhost:3000/api/booklist/title 
Updates the details of the book according to the JSON data in the body of the HTTP request

DELETE: localhost:3000/api/booklist/title
Removes the book entry whose title matches the name appended to the URL

The JSON data in the body of the HTTP Request should adhere to the following format, where the title, author, and genre are strings, the finished_on is a MM-DD-YYYY date in wrapped in quotation marks, and the keywords is an array of strings separated by commas. This is an example with dummy data included from Harry Potter:

{
	"title": "Harry Potter and the Sorcerer's Stone",
	"author": "JK Rowling",
	"finished_on": "06-05-2012",
	"genre": "fiction",
	"keywords": [
		     "magic", "Hogwarts", "friendship"
		 ]
}

To use this project, you can:
1. Fork/clone the repo.
2. Change line 9 in queries.js to be the connection string with your personal username/password for PostgreSQL.
3. Install the dependencies by typing "npm install" into your terminal while in the directory you just cloned/forked.
4. Run "psql -U postgres -f booklist.sql" in the same terminal direectory.
5. Run the development environment with the command "npm start".

To interact with the API, I found it easiest to use Postman. Make sure that your Header has the Key "Content-Type" and the Value "application/json".
