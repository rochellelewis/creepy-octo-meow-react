<?php

require_once(dirname(__DIR__) . "/Classes/autoload.php");
require_once (dirname(__DIR__) . "/vendor/autoload.php");
require_once ("uuid.php");

require_once("/etc/apache2/capstone-mysql/encrypted-config.php");

use Edu\Cnm\CreepyOctoMeow\{Profile, Like};
use Ramsey\Uuid\Uuid;

$pdo = connectToEncryptedMySQL("/etc/apache2/capstone-mysql/rlewis37.ini");

try {
	$profileId = generateUuidV4();
	$postId = generateUuidV4();

	/*
	 * Test Like class
	 * */
	$like = new Like($postId, $profileId);
	var_dump($like);
//	$like->insert($pdo);
//	var_dump(Like::getLikesByLikePostId($pdo, $like->getLikePostId()));

	/*
	 * Sanity Check: Test Profile class, which is passing PhpUnit.
	 * */
	$profile = new Profile($profileId, bin2hex(random_bytes(16)), "email2@email.com", password_hash("abc123", PASSWORD_ARGON2I, ["time_cost" => 384]), "username2");
	var_dump($profile);

	$profile->insert($pdo);
	var_dump(Profile::getProfileByProfileId($pdo, $profile->getProfileId()));

} catch(\InvalidArgumentException | \RangeException | \Exception | \TypeError $exception) {
	echo $exception->getMessage() . PHP_EOL;
	echo $exception->getLine() .PHP_EOL;
}