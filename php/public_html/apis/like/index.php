<?php
require_once (dirname(__DIR__, 3) . "/vendor/autoload.php");
require_once (dirname(__DIR__, 3) . "/Classes/autoload.php");
require_once (dirname(__DIR__, 3) . "/lib/xsrf.php");
require_once (dirname(__DIR__, 3) . "/lib/uuid.php");
require_once (dirname(__DIR__, 3) . "/lib/jwt.php");
require_once ("/etc/apache2/capstone-mysql/encrypted-config.php");

use Edu\Cnm\CreepyOctoMeow\Like;

/**
 * API for Like class
 *
 * GET and POST and DELETE requests are supported.
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

	//sanitize and store input
	$likePostId = $id = filter_input(INPUT_GET, "likePostId", FILTER_SANITIZE_STRING,FILTER_FLAG_NO_ENCODE_QUOTES);
	$likeProfileId = $id = filter_input(INPUT_GET, "likeProfileId", FILTER_SANITIZE_STRING,FILTER_FLAG_NO_ENCODE_QUOTES);

	if($method === "GET") {

		setXsrfCookie();

		//grab like(s) based upon available input
		if(empty($likePostId) === false && empty($likeProfileId) === false) {
			$reply->data = Like::getLikeByLikePostIdAndLikeProfileId($pdo, $likePostId, $likeProfileId);

		} elseif(empty($likePostId) === false) {
			$reply->data = Like::getLikesByLikePostId($pdo, $likePostId)->toArray();

		} elseif(empty($likeProfileId) === false) {
			$reply->data = Like::getLikesByLikeProfileId($pdo, $likeProfileId)->toArray();

		} else {
			throw (new \InvalidArgumentException("Search parameters are invalid.", 404));
		}

	} elseif($method === "POST" || $method === "DELETE") {

		//validate xsrf token and jwt header
		verifyXsrf();
		validateJwtHeader();

		//check that the user is signed in
		if(empty($_SESSION["profile"]) === true) {
			throw(new \InvalidArgumentException("You are not logged in.", 403));
		}

		//decode the response from the front end
		$requestContent = file_get_contents("php://input");
		$requestObject = json_decode($requestContent);

		if(empty($requestObject->likePostId) === true) {
			throw (new \InvalidArgumentException("No post associated with the like.", 405));
		}

		if(empty($requestObject->likeProfileId) === true) {
			throw (new \InvalidArgumentException("No profile associated with the like.", 405));
		}

		if($method === "POST") {

			//check if the like already exists
			$likeCheck = Like::getLikeByLikePostIdAndLikeProfileId($pdo, $requestObject->likePostId, $_SESSION["profile"]->getProfileId());
			if(!empty($likeCheck) || $likeCheck !== null) {
				throw (new \InvalidArgumentException("You've already liked this post.", 403));
			}

			//create new Like and insert ino mysql
			$like = new Like($requestObject->likePostId, $_SESSION["profile"]->getProfileId());
			$like->insert($pdo);
			$reply->message = "You liked this post!";

		} elseif($method === "DELETE") {

			//grab the like by composite key
			$like = Like::getLikeByLikePostIdAndLikeProfileId($pdo, $requestObject->likePostId, $requestObject->likeProfileId);
			if($like === null) {
				throw (new RuntimeException("Like does not exist.", 404));
			}

			//enforce the user is signed in and only trying to delete their own like
			if(empty($_SESSION["profile"]) === true || $_SESSION["profile"]->getProfileId()->toString() !== $like->getLikeProfileId()->toString()) {
				throw(new \InvalidArgumentException("You are not allowed to unlike this!", 403));
			}

			//delete like and update message
			$like->delete($pdo);
			$reply->message = "You've successfully unliked this post.";
		}

	} else {
		throw (new \InvalidArgumentException("Invalid HTTP request.", 405));
	}

} catch(Exception | \TypeError $exception) {
	$reply->status = $exception->getCode();
	$reply->message = $exception->getMessage();
}

header("Content-type: application/json");
if($reply->data === null) {
	unset($reply->data);
}

// encode and return reply to front end caller
echo json_encode($reply);