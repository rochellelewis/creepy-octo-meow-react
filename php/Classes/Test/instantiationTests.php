<?php

require_once(dirname(__DIR__) . "/autoload.php");
require_once (dirname(__DIR__, 2) . "/vendor/autoload.php");
require_once (dirname(__DIR__, 2) . "/lib/uuid.php");

require_once("/etc/apache2/capstone-mysql/encrypted-config.php");

use Edu\Cnm\CreepyOctoMeow\Like;
use Ramsey\Uuid\Uuid;

$pdo = connectToEncryptedMySQL("/etc/apache2/capstone-mysql/rlewis37.ini");

try {
	/*
	 * Test Like class
	 * */
	$like = new Like("9bfacccd-75fe-413e-9886-2bf4e0d7f89e", "910f2599-125f-441c-ab23-40438b9ff118");
	var_dump($like);

	/*
	 * Sanity Check: Test Profile test, which is passing PhpUnit.
	 * */
	$profile = new \Edu\Cnm\CreepyOctoMeow\Profile(generateUuidV4(), bin2hex(random_bytes(16)), "email2@email.com", password_hash("abc123", PASSWORD_ARGON2I, ["time_cost" => 384]), "username2");
	var_dump($profile);

	$profile->insert($pdo);
	var_dump(\Edu\Cnm\CreepyOctoMeow\Profile::getProfileByProfileId($pdo, $profile->getProfileId()));

} catch(\InvalidArgumentException | \RangeException | \Exception | \TypeError $exception) {
	echo $exception->getMessage() . PHP_EOL;
	echo $exception->getLine() .PHP_EOL;
}