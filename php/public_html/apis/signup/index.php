<?php
require_once (dirname(__DIR__, 3) . "/vendor/autoload.php");
require_once (dirname(__DIR__, 3) . "/Classes/autoload.php");
require_once (dirname(__DIR__, 3) . "/lib/xsrf.php");
require_once (dirname(__DIR__, 3) . "/lib/uuid.php");
require_once ("/etc/apache2/capstone-mysql/encrypted-config.php");

use Edu\Cnm\CreepyOctoMeow\Profile;

/**
 * API for new user sign up, Profile class
 *
 * POST requests are supported.
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

	if($method === "POST") {

		//this is where the magic happens (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧

		//grab request content, decode json into a php object
		$requestContent = file_get_contents("php://input");
		$requestObject = json_decode($requestContent);

		//check for all required fields
		if(empty($requestObject->signupEmail) === true) {
			throw (new \InvalidArgumentException("Y u no email?"));
		}

		if(empty($requestObject->signupUsername) === true) {
			throw (new \InvalidArgumentException("Please choose a username."));
		}

		if(empty($requestObject->signupPassword) === true) {
			throw (new \InvalidArgumentException("You must provide a password."));
		}

		if(empty($requestObject->signupConfirmPassword) === true) {
			throw (new \InvalidArgumentException("Now confirm your password..."));
		}

		if($requestObject->signupPassword !== $requestObject->signupConfirmPassword) {
			throw (new \InvalidArgumentException("Passwords do not match."));
		}

		//check for duplicate email - email must be unique/not already in use
		$emailCheck = Profile::getProfileByProfileEmail($pdo, $requestObject->signupEmail);
		if(!empty($emailCheck) || $emailCheck !== null) {
			throw new \InvalidArgumentException("This email is already signed up.", 403);
		}

		//check for duplicate username - this must be unique/not already in use
		$usernameCheck = Profile::getProfileByProfileUsername($pdo, $requestObject->signupUsername);
		if(!empty($usernameCheck) || $usernameCheck !== null) {
			throw new \InvalidArgumentException("This username is not available.", 403);
		}

		//create profile activation token
		$profileActivationToken = bin2hex(random_bytes(16));

		//create new password hash for Profile
		$hash = password_hash($requestObject->signupPassword, PASSWORD_ARGON2I, ["time_cost" => 384]);

		//create a new Profile and insert into mysql
		$profile = new Profile(generateUuidV4(), $profileActivationToken, $requestObject->signupProfileEmail, $hash, $requestObject->signupProfileUsername);
		$profile->insert($pdo);

		//build the account activation email link - this url points to the activation api
		//this is the link that will be clicked to confirm the account.
		//make sure URL is /public_html/apis/activation/$activation
		$basePath = dirname($_SERVER["SCRIPT_NAME"], 3);
		$urlGlue = $basePath . "/apis/activation/?token=" . $profileActivationToken;
		$confirmLink = "https://" . $_SERVER["SERVER_NAME"] . $urlGlue;

		//setup the account activation email fields
		$senderName = "Creepy Octo Meow";
		$senderEmail = "rlewis37@cnm.edu";
		$recipientEmail = $profile->getProfileEmail();
		$recipientName = $profile->getProfileUsername();
		$subject = "Account Activation | Creepy Octo Meow";
		$message = <<< EOF
<h1>Welcome to Creepy Octo Meow =^. .^=</h1>
<h4>Just one more step to activate your account.</h4>
<p>Visit the following link to complete the sign-up process: <a href="$confirmLink">$confirmLink<a></p>
EOF;

		//build the email with Swiftmailer
		$swiftMessage = new Swift_Message();
		$swiftMessage->setFrom([$senderEmail => $senderName]);

		$recipients = [
			$recipientEmail => $recipientName,
			$senderEmail => $senderName
		];

		$swiftMessage->setTo($recipients);
		$swiftMessage->setSubject($subject);
		$swiftMessage->setBody($message, "text/html");
		$swiftMessage->addPart(html_entity_decode($message), "text/plain");

		$smtp = new Swift_SmtpTransport("localhost", 25);
		$mailer = new Swift_Mailer($smtp);
		$numSent = $mailer->send($swiftMessage, $failedRecipients);

		if($numSent !== count($recipients)) {
			throw(new \RuntimeException("Unable to send activation email."));
		}

		//update reply after sending activation email
		$reply->message = "Almost done! Check your email to activate your account. :D";

	} else {
		throw (new \InvalidArgumentException("Invalid HTTP request!"));
	}

} catch(Exception | \TypeError $exception) {
	$reply->status = $exception->getCode();
	$reply->message = $exception->getMessage();
	$reply->trace = $exception->getTraceAsString();
}

//sets up the response header.
header("Content-type: application/json");

//finally - JSON encode the $reply object and echo it back to the front end.
echo json_encode($reply);