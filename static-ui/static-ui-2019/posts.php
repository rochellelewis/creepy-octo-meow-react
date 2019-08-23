<!doctype html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

		<!-- Bootstrap CSS -->
		<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
				integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

		<!-- Font Awesome -->
		<script src="https://kit.fontawesome.com/db382e693f.js"></script>

		<!-- Custom CSS -->
		<link rel="stylesheet" href="css/util.css" type="text/css">
		<link rel="stylesheet" href="css/theme.css" type="text/css">

		<!-- jQuery first, then Popper.js, then Bootstrap JS -->
		<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
				  integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
				  crossorigin="anonymous"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
				  integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1"
				  crossorigin="anonymous"></script>
		<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
				  integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
				  crossorigin="anonymous"></script>

		<title>Static UI | Creepy Octo Meow</title>
	</head>
	<body class="sfooter posts">
		<div class="sfooter-content">
			<header>
				<nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
					<a class="navbar-brand" href="#">=^ Octo Meow 6.0 ^=</a>
					<small class="navbar-text d-none d-md-inline-block text-muted mr-auto"><em>A DDC React Demo.</em></small>
					<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
							  aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
						<span class="navbar-toggler-icon"></span>
					</button>

					<div class="collapse navbar-collapse" id="navbarSupportedContent">
						<ul class="navbar-nav ml-auto">
							<li class="nav-item dropdown">
								<a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
									data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
									Welcome, --username--
								</a>
								<div class="dropdown-menu" aria-labelledby="navbarDropdown">
									<a class="dropdown-item" href="#"><i class="fa fa-user"></i>&nbsp;&nbsp;My Profile</a>
									<div class="dropdown-divider"></div>
									<a class="dropdown-item" href="#"><i class="fa fa-sign-out"></i>&nbsp;&nbsp;Sign Out</a>
								</div>
							</li>
							<span class="navbar-text">|</span>
							<li class="nav-item">
								<a class="nav-link" href="#">Feed</a>
							</li>
						</ul>
					</div>
				</nav>
			</header>

			<!-- BEGIN MAIN CONTENT -->
			<main class="my-5 py-5">
				<div class="container-fluid">
					<div class="row">

						<!--BEGIN FORM PANEL -->
						<div class="col-md-4 position-fixed">
							<div class="card bg-light mb-3">
								<div class="card-body">
									<form action="#" novalidate>
										<div class="form-group">
											<label for="" class="sr-only">Post Title</label>
											<input type="text" class="form-control" placeholder="Title">
										</div>
										<div class="form-group">
											<label for="" class="sr-only">Post Content</label>
											<textarea name="" id="" class="form-control">Your opinion here...</textarea>
										</div>
										<div class="form-group">
											<button class="btn btn-primary" type="submit">Post!</button>
										</div>
									</form>
								</div>
							</div>
						</div>

						<!-- BEGIN POSTS PANEL -->
						<div class="posts-panel col-md-8 offset-md-4">
							<!-- BEGIN POST ITEM -->
							<div class="card mb-3">
								<div class="card-header d-flex justify-content-end">
									<h3 class="panel-title d-inline-block my-0 mr-auto">Post Title</h3>
									<button class="btn btn-outline-secondary btn-sm mr-2" data-toggle="modal" data-target="#delete-post-modal"><i class="fa fa-trash-o"></i></button>
									<button class="btn btn-outline-secondary btn-sm mr-2" data-toggle="modal" data-target="#update-post-modal"><i class="fa fa-pencil"></i></button>
									<button class="btn btn-outline-danger btn-sm">
										<i class="fa fa-heart"></i>
										<span class="badge badge-danger">99</span>
										<span class="sr-only">likes</span>
									</button>
								</div>
								<div class="card-body">
									<div class="small text-muted">Author | Datetime</div>
									<hr>
									<p class="card-text">Post Content</p>
								</div>
							</div>
							<!-- BEGIN POST ITEM -->
							<div class="card mb-3">
								<div class="card-header d-flex justify-content-end">
									<h3 class="panel-title d-inline-block my-0 mr-auto">Post Title</h3>
									<button class="btn btn-outline-secondary btn-sm mr-2" data-toggle="modal" data-target="#delete-post-modal"><i class="fa fa-trash-o"></i></button>
									<button class="btn btn-outline-secondary btn-sm mr-2" data-toggle="modal" data-target="#update-post-modal"><i class="fa fa-pencil"></i></button>
									<button class="btn btn-outline-danger btn-sm">
										<i class="fa fa-heart"></i>
										<span class="badge badge-danger">99</span>
										<span class="sr-only">likes</span>
									</button>
								</div>
								<div class="card-body">
									<div class="small text-muted">Author | Datetime</div>
									<hr>
									<p class="card-text">Post Content</p>
								</div>
							</div>
							<!-- BEGIN POST ITEM -->
							<div class="card mb-3">
								<div class="card-header d-flex justify-content-end">
									<h3 class="panel-title d-inline-block my-0 mr-auto">Post Title</h3>
									<button class="btn btn-outline-secondary btn-sm mr-2" data-toggle="modal" data-target="#delete-post-modal"><i class="fa fa-trash-o"></i></button>
									<button class="btn btn-outline-secondary btn-sm mr-2" data-toggle="modal" data-target="#update-post-modal"><i class="fa fa-pencil"></i></button>
									<button class="btn btn-outline-danger btn-sm">
										<i class="fa fa-heart"></i>
										<span class="badge badge-danger">99</span>
										<span class="sr-only">likes</span>
									</button>
								</div>
								<div class="card-body">
									<div class="small text-muted">Author | Datetime</div>
									<hr>
									<p class="card-text">Post Content</p>
								</div>
							</div>
							<!-- BEGIN POST ITEM -->
							<div class="card mb-3">
								<div class="card-header d-flex justify-content-end">
									<h3 class="panel-title d-inline-block my-0 mr-auto">Post Title</h3>
									<button class="btn btn-outline-secondary btn-sm mr-2" data-toggle="modal" data-target="#delete-post-modal"><i class="fa fa-trash-o"></i></button>
									<button class="btn btn-outline-secondary btn-sm mr-2" data-toggle="modal" data-target="#update-post-modal"><i class="fa fa-pencil"></i></button>
									<button class="btn btn-outline-danger btn-sm">
										<i class="fa fa-heart"></i>
										<span class="badge badge-danger">99</span>
										<span class="sr-only">likes</span>
									</button>
								</div>
								<div class="card-body">
									<div class="small text-muted">Author | Datetime</div>
									<hr>
									<p class="card-text">Post Content</p>
								</div>
							</div>
							<!-- BEGIN POST ITEM -->
							<div class="card mb-3">
								<div class="card-header d-flex justify-content-end">
									<h3 class="panel-title d-inline-block my-0 mr-auto">Post Title</h3>
									<button class="btn btn-outline-secondary btn-sm mr-2" data-toggle="modal" data-target="#delete-post-modal"><i class="fa fa-trash-o"></i></button>
									<button class="btn btn-outline-secondary btn-sm mr-2" data-toggle="modal" data-target="#update-post-modal"><i class="fa fa-pencil"></i></button>
									<button class="btn btn-outline-danger btn-sm">
										<i class="fa fa-heart"></i>
										<span class="badge badge-danger">99</span>
										<span class="sr-only">likes</span>
									</button>
								</div>
								<div class="card-body">
									<div class="small text-muted">Author | Datetime</div>
									<hr>
									<p class="card-text">Post Content</p>
								</div>
							</div>
							<!-- BEGIN POST ITEM -->
							<div class="card mb-3">
								<div class="card-header d-flex justify-content-end">
									<h3 class="panel-title d-inline-block my-0 mr-auto">Post Title</h3>
									<button class="btn btn-outline-secondary btn-sm mr-2" data-toggle="modal" data-target="#delete-post-modal"><i class="fa fa-trash-o"></i></button>
									<button class="btn btn-outline-secondary btn-sm mr-2" data-toggle="modal" data-target="#update-post-modal"><i class="fa fa-pencil"></i></button>
									<button class="btn btn-outline-danger btn-sm">
										<i class="fa fa-heart"></i>
										<span class="badge badge-danger">99</span>
										<span class="sr-only">likes</span>
									</button>
								</div>
								<div class="card-body">
									<div class="small text-muted">Author | Datetime</div>
									<hr>
									<p class="card-text">Post Content</p>
								</div>
							</div>
							<!-- BEGIN POST ITEM -->
							<div class="card mb-3">
								<div class="card-header d-flex justify-content-end">
									<h3 class="panel-title d-inline-block my-0 mr-auto">Post Title</h3>
									<button class="btn btn-outline-secondary btn-sm mr-2" data-toggle="modal" data-target="#delete-post-modal"><i class="fa fa-trash-o"></i></button>
									<button class="btn btn-outline-secondary btn-sm mr-2" data-toggle="modal" data-target="#update-post-modal"><i class="fa fa-pencil"></i></button>
									<button class="btn btn-outline-danger btn-sm">
										<i class="fa fa-heart"></i>
										<span class="badge badge-danger">99</span>
										<span class="sr-only">likes</span>
									</button>
								</div>
								<div class="card-body">
									<div class="small text-muted">Author | Datetime</div>
									<hr>
									<p class="card-text">Post Content</p>
								</div>
							</div>
							<!-- BEGIN POST ITEM -->
							<div class="card mb-3">
								<div class="card-header d-flex justify-content-end">
									<h3 class="panel-title d-inline-block my-0 mr-auto">Post Title</h3>
									<button class="btn btn-outline-secondary btn-sm mr-2" data-toggle="modal" data-target="#delete-post-modal"><i class="fa fa-trash-o"></i></button>
									<button class="btn btn-outline-secondary btn-sm mr-2" data-toggle="modal" data-target="#update-post-modal"><i class="fa fa-pencil"></i></button>
									<button class="btn btn-outline-danger btn-sm">
										<i class="fa fa-heart"></i>
										<span class="badge badge-danger">99</span>
										<span class="sr-only">likes</span>
									</button>
								</div>
								<div class="card-body">
									<div class="small text-muted">Author | Datetime</div>
									<hr>
									<p class="card-text">Post Content</p>
								</div>
							</div>
							<!-- BEGIN POST ITEM -->
							<div class="card mb-3">
								<div class="card-header d-flex justify-content-end">
									<h3 class="panel-title d-inline-block my-0 mr-auto">Post Title</h3>
									<button class="btn btn-outline-secondary btn-sm mr-2" data-toggle="modal" data-target="#delete-post-modal"><i class="fa fa-trash-o"></i></button>
									<button class="btn btn-outline-secondary btn-sm mr-2" data-toggle="modal" data-target="#update-post-modal"><i class="fa fa-pencil"></i></button>
									<button class="btn btn-outline-danger btn-sm">
										<i class="fa fa-heart"></i>
										<span class="badge badge-danger">99</span>
										<span class="sr-only">likes</span>
									</button>
								</div>
								<div class="card-body">
									<div class="small text-muted">Author | Datetime</div>
									<hr>
									<p class="card-text">Post Content</p>
								</div>
							</div>
							<!-- BEGIN POST ITEM -->
							<div class="card mb-3">
								<div class="card-header d-flex justify-content-end">
									<h3 class="panel-title d-inline-block my-0 mr-auto">Post Title</h3>
									<button class="btn btn-outline-secondary btn-sm mr-2" data-toggle="modal" data-target="#delete-post-modal"><i class="fa fa-trash-o"></i></button>
									<button class="btn btn-outline-secondary btn-sm mr-2" data-toggle="modal" data-target="#update-post-modal"><i class="fa fa-pencil"></i></button>
									<button class="btn btn-outline-danger btn-sm">
										<i class="fa fa-heart"></i>
										<span class="badge badge-danger">99</span>
										<span class="sr-only">likes</span>
									</button>
								</div>
								<div class="card-body">
									<div class="small text-muted">Author | Datetime</div>
									<hr>
									<p class="card-text">Post Content</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
		</div><!--/.sfooter-content-->

		<footer class="page-footer bg-light text-muted py-4 fixed-bottom">
			<div class="container-fluid">
				<div class="row">
					<div class="col-sm-6 text-center text-sm-left small">
						Octo Meow 6.0 => A DDC React Demo.
					</div>
					<div class="col-sm-6 text-center text-sm-right small">
						<i class="fab fa-github"></i>&nbsp;<a class="text-muted"
																		  href="https://github.com/rlewis2892/creepy-octo-meow-react"
																		  target="_blank">View on Github</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a
							class="text-muted" href="#">About Us</a>
					</div>
				</div>
			</div>
		</footer>
	</body>
</html>