<?php

namespace Edu\Cnm\CreepyOctoMeow;
require_once("autoload.php");

require_once(dirname(__DIR__) . "/vendor/autoload.php");
use Ramsey\Uuid\Uuid;

/**
 * Like Class
 *
 * This class allows a Profile to "like" a Post.
 *
 * @author Rochelle Lewis <rlewis37@cnm.edu>
 * @version 2.0
 **/
class Like implements \JsonSerializable {
	use ValidateDate;
	use ValidateUuid;

	/**
	 * id for the Post that is liked; this is a foreign key referencing Post.
	 * @var Uuid $likePostId
	 **/
	private $likePostId;

	/**
	 * id for the Profile that "likes" a Post; this is a foreign key referencing Profile.
	 * @var Uuid $likeProfileId
	 **/
	private $likeProfileId;

	/**
	 * constructor for this Like
	 *
	 * @param string|Uuid $newLikePostId id of the parent Post
	 * @param string|Uuid $newLikeProfileId id of the parent Profile
	 * @throws \InvalidArgumentException if data types are not valid
	 * @throws \RangeException if data values are out of bounds (e.g., strings too long, negative integers)
	 * @throws \TypeError if data types violate type hints
	 * @throws \Exception if some other exception is thrown
	 * @Documentation https://php.net/manual/en/language.oop5.decon.php
	 */
	public function __construct($newLikePostId, $newLikeProfileId) {
		try {
			$this->setLikePostId($newLikePostId);
			$this->setLikeProfileId($newLikeProfileId);
		} catch(\InvalidArgumentException | \RangeException | \Exception | \TypeError $exception) {
			$exceptionType = get_class($exception);
			throw(new $exceptionType($exception->getMessage(), 0, $exception));
		}
	}

	/**
	 * accessor method for post id
	 *
	 * @return uuid value of post id
	 **/
	public function getLikePostId() : Uuid {
		return ($this->likePostId);
	}

	/**
	 * mutator method for post id
	 *
	 * @param string $newLikePostId new value of post id
	 * @throws \RangeException if $newPostId is not positive
	 * @throws \TypeError if $newLikePostId is not an integer
	 **/
	public function setLikePostId($newLikePostId) : void {
		try {
			$uuid = self::validateUuid($newLikePostId);
		} catch(\InvalidArgumentException | \RangeException | \Exception | \TypeError $exception) {
			$exceptionType = get_class($exception);
			throw(new $exceptionType($exception->getMessage(), 0, $exception));
		}
		$this->likePostId = $uuid;
	}

	/**
	 * accessor method for profile id
	 *
	 * @return Uuid value of profile id
	 **/
	public function getLikeProfileId() : Uuid {
		return ($this->likeProfileId);
	}

	/**
	 * mutator method for profile id
	 *
	 * @param string $newLikeProfileId new value of profile id
	 * @throws \RangeException if $newProfileId is not positive
	 * @throws \TypeError if $newProfileId is not an integer
	 **/
	public function setLikeProfileId($newLikeProfileId) : void {
		try {
			$uuid = self::validateUuid($newLikeProfileId);
		} catch(\InvalidArgumentException | \RangeException | \Exception | \TypeError $exception) {
			$exceptionType = get_class($exception);
			throw(new $exceptionType($exception->getMessage(), 0, $exception));
		}
		$this->likeProfileId = $uuid;
	}

	/**
	 * inserts this Like into mySQL
	 *
	 * @param \PDO $pdo PDO connection object
	 * @throws \PDOException when mySQL related errors occur
	 **/
	public function insert(\PDO $pdo) : void {
		// create query template
		$query = "INSERT INTO `like`(likePostId, likeProfileId) VALUES(:likePostId, :likeProfileId)";
		$statement = $pdo->prepare($query);

		// bind the member variables to the place holders in the template
		$parameters = [
			"likePostId" => $this->likePostId->getBytes(),
			"likeProfileId" => $this->likeProfileId->getBytes()
		];
		$statement->execute($parameters);
	}

	/**
	 * deletes this Like from mySQL
	 *
	 * @param \PDO $pdo PDO connection object
	 * @throws \PDOException when mySQL related errors occur
	 **/
	public function delete(\PDO $pdo) : void {
		// create query template
		$query = "DELETE FROM `like` WHERE likePostId = :likePostId AND likeProfileId = :likeProfileId";
		$statement = $pdo->prepare($query);

		//bind the member variables to the placeholders in the template
		$parameters = [
			"likePostId" => $this->likePostId->getBytes(),
			"likeProfileId" => $this->likeProfileId->getBytes()
		];
		$statement->execute($parameters);
	}

	/**
	 * Retrieves a Like by post id and profile id
	 *
	 * @param \PDO $pdo PDO connection object
	 * @param string $likePostId post id to search for
	 * @param string $likeProfileId profile id to search for
	 * @return Like|null Like found or null if not found
	 */
	public static function getLikeByLikePostIdAndLikeProfileId(\PDO $pdo, string $likePostId, string $likeProfileId) : ?Like {
		try {
			$likePostId = self::validateUuid($likePostId);
		} catch(\InvalidArgumentException | \RangeException | \Exception | \TypeError $exception) {
			throw(new \PDOException($exception->getMessage(), 0, $exception));
		}

		try {
			$likeProfileId = self::validateUuid($likeProfileId);
		} catch(\InvalidArgumentException | \RangeException | \Exception | \TypeError $exception) {
			throw(new \PDOException($exception->getMessage(), 0, $exception));
		}

		// create query template
		$query = "SELECT likePostId, likeProfileId FROM `like` WHERE likePostId = :likePostId AND likeProfileId = :likeProfileId";
		$statement = $pdo->prepare($query);

		// bind the post id and profile id to the place holder in the template
		$parameters = [
			"likePostId" => $likePostId->getBytes(),
			"likeProfileId" => $likeProfileId->getBytes()
		];
		$statement->execute($parameters);

		// grab the like from mySQL
		try {
			$like = null;
			$statement->setFetchMode(\PDO::FETCH_ASSOC);
			$row = $statement->fetch();
			if($row !== false) {
				$like = new Like($row["likePostId"], $row["likeProfileId"]);
			}
		} catch(\Exception $exception) {
			// if the row couldn't be converted, rethrow it
			throw(new \PDOException($exception->getMessage(), 0, $exception));
		}
		return ($like);
	}

	/**
	 * Retrieves Likes by profile id
	 *
	 * @param \PDO $pdo PDO connection object
	 * @param string $likeProfileId profile id to search for
	 * @return \SplFixedArray SplFixedArray of Likes found or null if not found
	 * @throws \PDOException when mySQL related errors occur
	 **/
	public static function getLikesByLikeProfileId(\PDO $pdo, string $likeProfileId) : \SPLFixedArray {
		try {
			$likeProfileId = self::validateUuid($likeProfileId);
		} catch(\InvalidArgumentException | \RangeException | \Exception | \TypeError $exception) {
			throw(new \PDOException($exception->getMessage(), 0, $exception));
		}

		// create query template
		$query = "SELECT likePostId, likeProfileId FROM `like` WHERE likeProfileId = :likeProfileId";
		$statement = $pdo->prepare($query);

		// bind the member variables to the place holders in the template
		$parameters = ["likeProfileId" => $likeProfileId->getBytes()];
		$statement->execute($parameters);

		// build an array of likes
		$likes = new \SplFixedArray($statement->rowCount());
		$statement->setFetchMode(\PDO::FETCH_ASSOC);
		while(($row = $statement->fetch()) !== false) {
			try {
				$like = new Like($row["likePostId"], $row["likeProfileId"]);
				$likes[$likes->key()] = $like;
				$likes->next();
			} catch(\Exception $exception) {
				// if the row couldn't be converted, rethrow it
				throw(new \PDOException($exception->getMessage(), 0, $exception));
			}
		}
		return ($likes);
	}

	/**
	 * Retrieves Likes by post id
	 *
	 * @param \PDO $pdo PDO connection object
	 * @param string $likePostId post id to search for
	 * @return \SplFixedArray array of Likes found or null if not found
	 * @throws \PDOException when mySQL related errors occur
	 **/
	public static function getLikesByLikePostId(\PDO $pdo, string $likePostId) : \SplFixedArray {
		try {
			$likePostId = self::validateUuid($likePostId);
		} catch(\InvalidArgumentException | \RangeException | \Exception | \TypeError $exception) {
			throw(new \PDOException($exception->getMessage(), 0, $exception));
		}

		// create query template
		$query = "SELECT likePostId, likeProfileId FROM `like` WHERE likePostId = :likePostId";
		$statement = $pdo->prepare($query);

		// bind the member variables to the place holders in the template
		$parameters = ["likePostId" => $likePostId->getBytes()];
		$statement->execute($parameters);

		// build the array of likes
		$likes = new \SplFixedArray($statement->rowCount());
		$statement->setFetchMode(\PDO::FETCH_ASSOC);
		while(($row = $statement->fetch()) !== false) {
			try {
				$like = new Like($row["likePostId"], $row["likeProfileId"]);
				$likes[$likes->key()] = $like;
				$likes->next();
			} catch(\Exception $exception) {
				// if the row couldn't be converted, rethrow it
				throw(new \PDOException($exception->getMessage(), 0, $exception));
			}
		}
		return ($likes);
	}

	/**
	 * formats the state variables for JSON serialization
	 *
	 * @return array resulting state variables to serialize
	 **/
	public function jsonSerialize() {
		$fields = get_object_vars($this);

		$fields["likePostId"] = $this->likePostId;
		$fields["likeProfileId"] = $this->likeProfileId;

		return ($fields);
	}
}