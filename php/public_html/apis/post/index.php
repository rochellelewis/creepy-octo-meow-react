<?php
require_once (dirname(__DIR__, 3) . "/vendor/autoload.php");
require_once (dirname(__DIR__, 3) . "/Classes/autoload.php");
require_once (dirname(__DIR__, 3) . "/lib/xsrf.php");
require_once (dirname(__DIR__, 3) . "/lib/uuid.php");
require_once (dirname(__DIR__,3 ) . "/lib/jwt.php");
require_once ("/etc/apache2/capstone-mysql/encrypted-config.php");

use Edu\Cnm\CreepyOctoMeow\{Post};

/**
 * API for Post class
 *
 * GET, PUT, POST, DELETE requests are supported.
 *
 * @author Rochelle Lewis <rlewis37@cnm.edu>
 **/

//check the session status. If it is not active, start the session.
if(session_status() !== PHP_SESSION_ACTIVE) {
	session_start();
}

/**
 * Prepare an empty reply.
 *
 * Here we create a new stdClass named $reply. A stdClass is basically an empty bucket that we can use to store things in.
 *
 * We will use this object named $reply to store the results of the call to our API. The status 200 line adds a state variable to $reply called status and initializes it with the integer 200 (success code). The proceeding line adds a state variable to $reply called data. This is where the result of the API call will be stored. We will also update $reply->message as we proceed through the API.
 **/
$reply = new stdClass();
$reply->status = 200;
$reply->data = null;

try {

	//grab the database connection
	$pdo = connectToEncryptedMySQL("/etc/apache2/capstone-mysql/rlewis37.ini");

	//determine which HTTP method, store the result in $method
	$method = array_key_exists("HTTP_X_HTTP_METHOD", $_SERVER) ? $_SERVER["HTTP_X_HTTP_METHOD"] : $_SERVER["REQUEST_METHOD"];

	//Optional: IF a user must be logged in to see Posts - check the session, and throw an exception if needed
	/*if(empty($_SESSION["profile"]) === true) {
		throw (new \InvalidArgumentException("Sorry. U are not logged in.", 401));
	}*/

	//sanitize and store input
	$id = filter_input(INPUT_GET, "id", FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES);
	$postProfileId = filter_input(INPUT_GET, "postProfileId", FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES);
	$postContent = filter_input(INPUT_GET, "postContent", FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES);
	$postTitle = filter_input(INPUT_GET, "postTitle", FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES);

	//these dates are included here for date range searches
	$postSunriseDate = filter_input(INPUT_GET, "postSunriseDate", FILTER_VALIDATE_INT);
	$postSunsetDate = filter_input(INPUT_GET, "postSunsetDate", FILTER_VALIDATE_INT);

	//if sunrise and sunset dates are available for date range search, format them
	if(empty($postSunriseDate) === false && empty($postSunsetDate) === false) {
		$postSunriseDate = \DateTime::createFromFormat("U", $postSunriseDate / 1000);
		$postSunsetDate = \DateTime::createFromFormat("U", $postSunsetDate / 1000);
	}

	//check for valid post $id for PUT and DELETE requests!
	if(($method === "PUT" || $method === "DELETE") && (empty($id) === true)) {
		throw (new \InvalidArgumentException("Post id cannot be empty.", 405));
	}

	//begin if blocks for the allowed HTTP requests
	if($method === "GET") {

		setXsrfCookie();

		if(empty($id) === false) {
			$reply->data = Post::getPostByPostId($pdo, $id);

		} elseif(empty($postProfileId) === false) {
			$reply->data = Post::getPostsByPostProfileId($pdo, $postProfileId);

		} elseif(empty($postContent) === false) {
			$reply->data = Post::getPostsByPostContent($pdo, $postContent);

		} elseif(empty($postTitle) === false) {
			$reply->data = Post::getPostsByPostTitle($pdo, $postTitle);

		} elseif(empty($postSunriseDate) === false && empty($postSunsetDate) === false) {
			$reply->data = Post::getPostsByPostDateRange($pdo, $postSunriseDate, $postSunsetDate);

		} else {
			$reply->data = Post::getAllPosts($pdo);
		}

	//begin checks for PUT and POST requests...
	} elseif($method === "PUT" || $method === "POST") {

		//enforce the end user has a valid xsrf and JWT token
		verifyXsrf();
		validateJwtHeader();

		//check that user is logged in - this may be redundant, see line 44.
		if(empty($_SESSION["profile"]) === true) {
			throw(new \InvalidArgumentException("You must be logged in to post!", 401));
		}

		//Optional: User MUST ALSO have an activated account before they can create or edit posts.
		if($_SESSION["profile"]->getProfileActivationToken() !== null) {
			throw (new \InvalidArgumentException("You must have an activated account before you can create posts. Please check your email for the activation link.", 403));
		}

		//grab request content, decode json into a php object
		$requestContent = file_get_contents("php://input");
		$requestObject = json_decode($requestContent);

		//make sure there is post content (required field)
		if(empty($requestObject->postContent) === true) {
			throw (new \InvalidArgumentException("No post content.", 405));
		}

		//make sure there is a post title (required field)
		if(empty($requestObject->postTitle) === true) {
			throw (new \InvalidArgumentException("No post title.", 405));
		}

		if($method === "PUT") {

			//grab the post to be updated
			$post = Post::getPostByPostId($pdo, $id);
			if($post === null) {
				throw new \RuntimeException("Post not found!", 404);
			}

			//restrict access if user is not logged into the same account that created the post!
			if(empty($_SESSION["profile"]) || $_SESSION["profile"]->getProfileId()->toString() !== $post->getPostProfileId()->toString()) {
				throw (new \Exception("Bad kitty! You are not authorized to edit this post!", 403));
			}

			//update post data
			$post->setPostContent($requestObject->postContent);
			$post->setPostTitle($requestObject->postTitle);

			//update the post date on post update
			$post->setPostDate(new \DateTime());

			//update the post
			$post->update($pdo);

			//update reply
			$reply->message = "Your post was successfully updated!";

		} elseif($method === "POST") {

			//create a new post and insert into mysql
			$post = new Post(generateUuidV4(), $_SESSION["profile"]->getProfileId(), $requestObject->postContent, null, $requestObject->postTitle);
			$post->insert($pdo);

			//update reply
			$reply->message = "Post created!";
		}

	} elseif($method === "DELETE") {

		//enforce the end user has a valid xsrf and jwt
		verifyXsrf();
		validateJwtHeader();

		//grab the post to be killed
		$post = Post::getPostByPostId($pdo, $id);
		if($post === null) {
			throw (new \RuntimeException("This post no exist!", 404));
		}

		//restrict access if user is not logged into the same account that created the post!
		if(empty($_SESSION["profile"]) === true || $_SESSION["profile"]->getProfileId()->toString() !== $post->getPostProfileId()->toString()) {
			throw (new \InvalidArgumentException("Hey now! U are not allowed to delete this post!", 403));
		}

		//delete the post (╯°▽°)╯︵ ┻━┻
		$post->delete($pdo);

		//update reply
		$reply->message = "Post successfully deleted.";

	} else {
		throw (new \InvalidArgumentException("Invalid HTTP request!", 405));
	}

} catch(Exception | \TypeError $exception) {
	$reply->status = $exception->getCode();
	$reply->message = $exception->getMessage();
}

//sets up the response header.
header("Content-type: application/json");

//finally - JSON encode the $reply object and echo it back to the front end.
echo json_encode($reply);