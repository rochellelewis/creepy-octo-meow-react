<?php

require_once(dirname(__DIR__) . "/autoload.php");
require_once (dirname(__DIR__, 2) . "/vendor/autoload.php");
require_once (dirname(__DIR__, 2) . "/lib/uuid.php");

require_once("/etc/apache2/capstone-mysql/encrypted-config.php");

use Edu\Cnm\CreepyOctoMeow\{Profile, Like};
use Ramsey\Uuid\Uuid;

$pdo = connectToEncryptedMySQL("/etc/apache2/capstone-mysql/rlewis37.ini");

try {
	/*
	 * Test Like class
	 * */
	$uuid1 = generateUuidV4();
	$uuid2 = generateUuidV4();
	var_dump($uuid1, $uuid2);

	$like = new Like($uuid1, $uuid2);
	var_dump($like);

	/*
	 * Sanity Check: Test Profile class, which is passing PhpUnit.
	 * */
	$profile = new Profile(generateUuidV4(), bin2hex(random_bytes(16)), "email2@email.com", password_hash("abc123", PASSWORD_ARGON2I, ["time_cost" => 384]), "username2");
	var_dump($profile);

	//$profile->insert($pdo);
	var_dump(Profile::getProfileByProfileId($pdo, $profile->getProfileId()));

} catch(\InvalidArgumentException | \RangeException | \Exception | \TypeError $exception) {
	echo $exception->getMessage() . PHP_EOL;
	echo $exception->getLine() .PHP_EOL;
}