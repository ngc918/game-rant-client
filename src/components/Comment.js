function CommentSection() {
	return (
		<div class="commentContainer">
			<div class="row">
				<div class="col-6">
					<div class="comment">
						<p v-for="items in item" v-text="items"></p>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-6">
					<textarea
						type="text"
						class="input"
						placeholder="Write a comment"
						v-model="newItem"
					></textarea>
					<button class="primaryContained" type="submit">
						Submit
					</button>
				</div>
			</div>
		</div>
	);
}

export default CommentSection;
