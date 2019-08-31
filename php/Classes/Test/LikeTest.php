<?php

namespace Edu\Cnm\CreepyOctoMeow\Test;

use Edu\Cnm\CreepyOctoMeow\{Profile, Post, Like};

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
	protected $post;

	/**
	 * Profile that created the Post and Like; this is to test foreign key relations
	 * @var Profile profile
	 **/
	protected $profile;

	/**
	 * create dependent objects before running each test
	 **/
	public final function setUp() : void {
		//run the default setUp() method first
		parent::setUp();

		//create and insert a profile to be the author of the test post
		$activation = bin2hex(random_bytes(16));
		$hash = password_hash("abc123", PASSWORD_ARGON2I, ["time_cost" => 384]);
		$profileId = generateUuidV4();

		$this->profile = new Profile($profileId, $activation, "drumpf@tinyhands.ru", $hash, "bernie");
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
		//count the current number of rows and save for later
		$numRows = $this->getConnection()->getRowCount("like");

		//create a like and insert
		$like = new Like($this->post->getPostId(), $this->profile->getProfileId());
		$like->insert($this->getPDO());

		//verify the rowCount matches
		$pdoLike = Like::getLikeByLikePostIdAndLikeProfileId($this->getPDO(), $this->post->getPostId(), $this->profile->getProfileId());
		$this->assertEquals($numRows + 1, $this->getConnection()->getRowCount("like"));
		$this->assertEquals($pdoLike->getLikePostId(), $this->post->getPostId());
		$this->assertEquals($pdoLike->getLikeProfileId(), $this->profile->getProfileId());
	}

	/**
	 * test deleting a valid Like and verify
	 **/
	public function testDeleteLike() {
		//count the current number of rows and save for later
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
	 * test getting a Like by post id and verify
	 **/
	public function testGetLikesByPostId() {
		//count the current number of rows and save for later
		$numRows = $this->getConnection()->getRowCount("like");

		//create a like and insert
		$like = new Like($this->post->getPostId(), $this->profile->getProfileId());
		$like->insert($this->getPDO());

		//grab from mysql and verify count
		$results = Like::getLikesByLikePostId($this->getPDO(), $this->post->getPostId());
		$this->assertEquals($numRows + 1, $this->getConnection()->getRowCount("like"));
		$this->assertCount(1, $results);

		// enforce no other objects are bleeding into the test
		$this->assertContainsOnlyInstancesOf("Edu\\Cnm\\CreepyOctoMeow\\Like", $results);

		//grab the first array index and validate
		$pdoLike = $results[0];
		$this->assertEquals($pdoLike->getLikePostId(), $this->post->getPostId());
		$this->assertEquals($pdoLike->getLikeProfileId(), $this->profile->getProfileId());
	}

	/**
	 * test grabbing a Like by a post id that does not exist
	 **/
	public function testGetInvalidLikeByPostId() {
		$like = Like::getLikesByLikePostId($this->getPDO(), generateUuidV4());
		$this->assertCount(0, $like);
	}

	/**
	 * test getting a Like by profile id and verify
	 **/
	public function testGetLikesByProfileId() {
		//count the current number of rows and save for later
		$numRows = $this->getConnection()->getRowCount("like");

		//create a like and insert
		$like = new Like($this->post->getPostId(), $this->profile->getProfileId());
		$like->insert($this->getPDO());

		//grab from mysql and verify count
		$results = Like::getLikesByLikeProfileId($this->getPDO(), $this->profile->getProfileId());
		$this->assertEquals($numRows + 1, $this->getConnection()->getRowCount("like"));
		$this->assertCount(1, $results);

		// enforce no other objects are bleeding into the test
		$this->assertContainsOnlyInstancesOf("Edu\\Cnm\\CreepyOctoMeow\\Like", $results);

		//grab the first array index and validate
		$pdoLike = $results[0];
		$this->assertEquals($pdoLike->getLikePostId(), $this->post->getPostId());
		$this->assertEquals($pdoLike->getLikeProfileId(), $this->profile->getProfileId());
	}

	/**
	 * test grabbing a Like by a profile id that does not exist
	 **/
	public function testGetInvalidLikeByProfileId() {
		$like = Like::getLikesByLikeProfileId($this->getPDO(), generateUuidV4());
		$this->assertCount(0, $like);
	}

	/**
	 * test getting a Like by post id and profile id, and verify
	 **/
	public function testGetLikesByPostIdAndProfileId() {
		//count the current number of rows and save for later
		$numRows = $this->getConnection()->getRowCount("like");

		//create a like and insert
		$like = new Like($this->post->getPostId(), $this->profile->getProfileId());
		$like->insert($this->getPDO());

		//grab from mysql and verify count
		$result = Like::getLikeByLikePostIdAndLikeProfileId($this->getPDO(), $this->post->getPostId(), $this->profile->getProfileId());
		$this->assertEquals($numRows + 1, $this->getConnection()->getRowCount("like"));
		$this->assertEquals($result->getLikePostId(), $this->post->getPostId());
		$this->assertEquals($result->getLikeProfileId(), $this->profile->getProfileId());
	}

	/**
	 * test grabbing a Like that does not exist
	 **/
	public function testGetInvalidLikeByPostIdAndProfileId() {
		$like = Like::getLikeByLikePostIdAndLikeProfileId($this->getPDO(), generateUuidV4(), generateUuidV4());
		$this->assertNull($like);
	}

	/**
	 * test grabbing all likes
	 **/
	public function testGetAllValidLikes() {
		//count the number of rows and save it for later
		$numRows = $this->getConnection()->getRowCount("like");

		//create a like and insert
		$like = new Like($this->post->getPostId(), $this->profile->getProfileId());
		$like->insert($this->getPDO());

		//grab the posts from mysql, verify row count and namespace is correct
		$results = Like::getAllLikes($this->getPDO());
		$this->assertEquals($numRows + 1, $this->getConnection()->getRowCount("like"));
		$this->assertCount(1, $results);
		$this->assertContainsOnlyInstancesOf("Edu\\Cnm\\CreepyOctoMeow\\Like", $results);

		//verify that all fields match
		$pdoPost = $results[0];
		$this->assertEquals($pdoPost->getLikePostId(), $this->post->getPostId());
		$this->assertEquals($pdoPost->getLikeProfileId(), $this->profile->getProfileId());
	}
}