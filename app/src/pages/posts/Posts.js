import React from "react";

export const Posts = () => {
	return (
		<main className="my-5">
			<div className="container-fluid text-center text-lg-left">
				<div className="row mb-3">
					<div className="col">
						<h1>Meow Forum</h1>
					</div>
				</div>
				<div className="row">
					<div className="col-12 col-lg-3">
						<form>
							<div className="form-group">
								<input type="text" className="form-control" name="postTitle" id="postTitle" placeholder="Title"></input>
							</div>
							<div className="form-group">
								<textarea name="postContent" id="postContent" className="form-control"  placeholder="2000 chars max" rows="10"></textarea>
							</div>
							<button type="submit" className="btn btn-block btn-warning mb-3">Submit</button>
						</form>
					</div>
					<div className="col-12 col-lg-9">
						<div className="card-columns">
							<div className="card">
								<div className="card-body">
									<h4 className="card-title">Post title that wraps to a new line</h4>
									<p className="card-text">This is a longer card with supporting text below as a natural
										lead-in to additional content. This content is a little bit longer.</p>
									<p className="card-text">
										<small className="text-muted">Author Name | Date</small>
									</p>
								</div>
								<button className="post-delete btn btn-sm btn-danger">x</button>
							</div>
							<div className="card">
								<div className="card-body">
									<h4 className="card-title">Post Title</h4>
									<p className="card-text">This is a longer card with supporting text below as a natural
										lead-in to additional content. This content is a little bit longer.</p>
									<p className="card-text">
										<small className="text-muted">Author Name | Date</small>
									</p>
								</div>
							</div>
							<div className="card">
								<div className="card-body">
									<h4 className="card-title">Post Title</h4>
									<p className="card-text">This is a longer card with supporting text below as a natural
										lead-in to additional content. This content is a little bit longer.</p>
									<p className="card-text">
										<small className="text-muted">Author Name | Date</small>
									</p>
								</div>
							</div>
							<div className="card">
								<div className="card-body">
									<h4 className="card-title">Post Title</h4>
									<p className="card-text">This is a longer card with supporting text below as a natural
										lead-in to additional content. This content is a little bit longer.</p>
									<p className="card-text">
										<small className="text-muted">Author Name | Date</small>
									</p>
								</div>
							</div>
							<div className="card">
								<div className="card-body blue-card">
									<h4 className="card-title">Post Title</h4>
									<p className="card-text">This is a longer card with supporting text below as a natural
										lead-in to additional content. This content is a little bit longer.</p>
									<p className="card-text">
										<small className="text-muted">Author Name | Date</small>
									</p>
								</div>
							</div>
							<div className="card">
								<div className="card-body">
									<h4 className="card-title">Post Title</h4>
									<p className="card-text">This is a longer card with supporting text below as a natural
										lead-in to additional content. This content is a little bit longer.</p>
									<p className="card-text">
										<small className="text-muted">Author Name | Date</small>
									</p>
								</div>
							</div>
							<div className="card">
								<div className="card-body">
									<h4 className="card-title">Post Title</h4>
									<p className="card-text">This is a longer card with supporting text below as a natural
										lead-in to additional content. This content is a little bit longer.</p>
									<p className="card-text">
										<small className="text-muted">Author Name | Date</small>
									</p>
								</div>
							</div>
							<div className="card">
								<div className="card-body">
									<h4 className="card-title">Post Title</h4>
									<p className="card-text">This is a longer card with supporting text below as a natural
										lead-in to additional content. This content is a little bit longer.</p>
									<p className="card-text">
										<small className="text-muted">Author Name | Date</small>
									</p>
								</div>
							</div>
							<div className="card">
								<div className="card-body">
									<h4 className="card-title">Post Title</h4>
									<p className="card-text">This is a longer card with supporting text below as a natural
										lead-in to additional content. This content is a little bit longer.</p>
									<p className="card-text">
										<small className="text-muted">Author Name | Date</small>
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	)
};