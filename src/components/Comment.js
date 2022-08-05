function CommentSection({
	commentArray,
	comment,
	setComment,
	handleCommentSubmit,
}) {
	return (
		<div class="commentContainer">
			<div class="row">
				<div class="col-6">
					<div class="comment">
						<p v-for="items in item" v-text="items">
							{commentArray.map((individualComment) => {
								return (
									<div>
										<div>{individualComment.content}</div>
										<div>{individualComment.userId.email}</div>
										<div>{individualComment.createdAt}</div>
									</div>
								);
							})}
						</p>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-6">
					<form onSubmit={handleCommentSubmit}>
						<textarea
							type="text"
							class="input"
							placeholder="Write a comment"
							v-model="newItem"
							onChange={(e) => setComment(e.target.value)}
						>
							{comment}
						</textarea>
						<button class="primaryContained" type="submit">
							Submit
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}

export default CommentSection;
