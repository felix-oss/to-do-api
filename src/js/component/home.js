import React from "react";

export class Home extends React.Component {
	constructor() {
		super();
		this.state = {
			tasksList: ["Clean up the house"],
			task: ""
		};
	}
	addList = e => {
		if (e.keyCode == 13) {
			var updateTaskList = this.state.tasksList;
			updateTaskList.push(this.state.task);
			this.setState({ taskList: updateTaskList });
		}
	};

	removeItem = index => {
		var newList = this.state.tasksList;
		newList.splice(index, 1);

		this.setState({
			tasksList: newList
		});
	};
	render() {
		return (
			<div>
				<div className="d-flex justify-content-center">
					<h2>Write down a note</h2>
				</div>
				<div className="d-flex justify-content-center">
					<input
						className="type"
						onChange={e => this.setState({ task: e.target.value })}
						value={this.state.task}
						type="text"
						onKeyUp={e => this.addList(e)}
					/>
				</div>
				<div className="d-flex justify-content-center">
					<ol className="list">
						{this.state.tasksList.map((content, i) => (
							<li key={i}>
								{content}
								<a onClick={() => this.removeItem(i)}>
									<i className="fas fa-minus" />
								</a>
							</li>
						))}
					</ol>
				</div>
			</div>
		);
	}
}
