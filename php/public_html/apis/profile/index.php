<?php
require_once (dirname(__DIR__, 3) . "/vendor/autoload.php");
require_once (dirname(__DIR__, 3) . "/Classes/autoload.php");
require_once (dirname(__DIR__, 3) . "/lib/xsrf.php");
require_once (dirname(__DIR__, 3) . "/lib/uuid.php");
require_once (dirname(__DIR__, 3) . "/lib/jwt.php");
require_once ("/etc/apache2/capstone-mysql/encrypted-config.php");

use Edu\Cnm\CreepyOctoMeow\Profile;

/**
 * API for Profile class
 *
 * GET and PUT requests are supported.
 * Users cannot DELETE their Profile. You can check out, but you can never leave.
 *
 * This API will need to be extended to support password update in the future.
 * Currently only email and username updates are supported.
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
	$id = filter_input(INPUT_GET, "id", FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES);
	$profileEmail = filter_input(INPUT_GET, "profileEmail", FILTER_SANITIZE_EMAIL);
	$profileUsername = filter_input(INPUT_GET, "profileUsername", FILTER_SANITIZE_STRING, FILTER_FLAG_NO_ENCODE_QUOTES);

	//for PUT requests throw an exception if $id is empty
	if(($method === "PUT") && (empty($id) === true)) {
		throw(new \InvalidArgumentException("Profile id cannot be empty.", 405));
	}

	//begin if blocks for the various HTTP requests
	if($method === "GET") {

		setXsrfCookie("/");

		//grab profile based upon available input
		if(empty($id) === false) {
			$profile = Profile::getProfileByProfileId($pdo, $id);
			$reply->data = $profile;

		} elseif(empty($profileEmail) === false) {
			$profile = Profile::getProfileByProfileEmail($pdo, $profileEmail);
			$reply->data = $profile;

		} elseif(empty($profileUsername) === false) {
			$profile = Profile::getProfileByProfileUsername($pdo, $profileUsername);
			$reply->data = $profile;

		} else {
			//who knows... we may want this!
			$profiles = Profile::getAllProfiles($pdo)->toArray();
			$reply->data = $profiles;
		}

	} elseif($method === "PUT") {

		//validate xsrf token and jwt header
		verifyXsrf();
		validateJwtHeader();

		//restrict access to the profile if not actively logged in to the same profile!
		if((empty($_SESSION["profile"]) === true) || ($_SESSION["profile"]->getProfileId()->toString() !== $id)) {
			throw (new \InvalidArgumentException("U are not allowed to access this profile!", 403));
		}

		//grab request content, decode json
		$requestContent = file_get_contents("php://input");
		$requestObject = json_decode($requestContent);

		//retrieve profile to update
		$profile = Profile::getProfileByProfileId($pdo, $id);
		if($profile === null) {
			throw (new RuntimeException("Profile does not exist.", 404));
		}

		//update all non-password attributes
		if($requestObject->profileEmail !== null) {
			$profile->setProfileEmail($requestObject->profileEmail);
		}

		if($requestObject->profileUsername !== null) {
			$profile->setProfileUsername($requestObject->profileUsername);
		}

		//run update, update reply
		$profile->update($pdo);
		$reply->message = "Profile updated ok!";

	} else {
		throw (new \InvalidArgumentException("Invalid HTTP request!", 405));
	}

} catch(Exception | \TypeError $exception) {
	$reply->status = $exception->getCode();
	$reply->message = $exception->getMessage();
}

//sets up the response header.
header("Content-type: application/json");
if($reply->data === null) {
	unset($reply->data);
}

//finally - JSON encode the $reply object and echo it back to the front end.
echo json_encode($reply);