<?php

namespace Edu\Cnm\CreepyOctoMeow\Test;

use Edu\Cnm\CreepyOctoMeow\{Profile, Post, Like};

//grab the project test parameters
require_once ("CreepyOctoMeowTest.php");

//grab the classes under scrutiny
require_once (dirname(__DIR__) . "/autoload.php");

//grab the uuid generator
require_once (dirname(__DIR__, 2) . "/lib/uuid.php");

/**
 * Full PHPUnit test for the Like class
 *
 * This is a complete PHPUnit test of the Like class. It is complete because *ALL* mySQL/PDO enabled methods
 * are tested for both invalid and valid inputs.
 *
 * @see Like
 * @author Rochelle Lewis <rlewis37@cnm.edu>
 **/
class LikeTest extends CreepyOctoMeowTest {

	/**
	 * Post that is liked; this is to test foreign key relations
	 * @var Post post
	 **/
	protected $post = null;

	/**
	 * Profile that created the Post and Like; this is to test foreign key relations
	 * @var Profile profile
	 **/
	protected $profile = null;

	/**
	 * create dependent objects before running each test
	 **/
	public final function setUp() {
		//run the default setUp() method first
		parent::setUp();

		//create and insert a profile to be the author of the test post
		$activation = bin2hex(random_bytes(16));
		$salt = bin2hex(random_bytes(32));
		$hash = hash_pbkdf2("sha512", "password123", $salt, 262144);
		$profileId = generateUuidV4();

		$this->profile = new Profile($profileId, $activation, "drumpf@tinyhands.ru", $hash, $salt, "bernie");
		$this->profile->insert($this->getPDO());

		//create a valid content for the Post
		$title = "I'm a valid post title!";
		$content = "I'm some valid post content!";
		$postId = generateUuidV4();

		$this->post = new Post($postId, $this->profile->getProfileId(), $content, null, $title);
		$this->post->insert($this->getPDO());
	}

	/**
	 * test inserting a valid Like and verify that the actual mySQL data matches
	 **/
	public function testInsertValidLike() : void {
		//count the no of rows and save for later
		$numRows = $this->getConnection()->getRowCount("like");

		//create a like and insert
		$like = new Like($this->post->getPostId(), $this->profile->getProfileId());
		$like->insert($this->getPDO());

		//verify the rowCount matches
		$this->assertEquals($numRows + 1, $this->getConnection()->getRowCount("like"));
	}

	/**
	 * test deleting a valid Like and verify
	 **/
	public function testDeleteLike() : void {
		//count the no of rows and save for later
		$numRows = $this->getConnection()->getRowCount("like");

		//create a new like and insert
		$like = new Like($this->post->getPostId(), $this->profile->getProfileId());
		$like->insert($this->getPDO());

		//delete from mysql
		$this->assertEquals($numRows + 1, $this->getConnection()->getRowCount("like"));
		$like->delete($this->getPDO());

		//grab data from mysql and enforce like does not exist
		$pdoLike = Like::getLikeByLikePostIdAndLikeProfileId($this->getPDO(), $this->post->getPostId(), $this->profile->getProfileId());
		$this->assertNull($pdoLike);
		$this->assertEquals($numRows, $this->getConnection()->getRowCount("like"));
	}

	/**
	 * test getting a Like by likePostId and verify
	 **/
	public function testGetLikeByProfileId() : void {
		//count the no of rows and save for later
		$numRows = $this->getConnection()->getRowCount("like");

		//create a like and insert
		$like = new Like($this->post->getPostId(), $this->profile->getProfileId());
		$like->insert($this->getPDO());

		//grab from mysql and verify count
		$pdoLike = Like::getLikesByLikeProfileId($this->getPDO(), $this->post->getPostId());
		$this->assertEquals($numRows + 1, $this->getConnection()->getRowCount("like"));
		$this->assertCount(1, $pdoLike);

		// enforce no other objects are bleeding into the test
		$this->assertContainsOnlyInstancesOf("Edu\\Cnm\\CreepyOctoMeow\\Like", $pdoLike);

		//grab the first array index and validate

	}

	/**
	 * test getting a Like by likeProfileId and verify
	 **/

	/**
	 * test getting a Like by likePostId and likeProfileId and verify
	 **/
}