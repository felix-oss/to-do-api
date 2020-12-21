import React from "react";

export class Home extends React.Component {
	constructor() {
		super();
		this.state = {
			tasksList: [""],
			task: ""
		};
		this.url = "https://assets.breatheco.de/apis/fake/todos/user/yoruRingo";
	}
	componentDidMount() {
		fetch(this.url)
			.then(function(response) {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				return response.json();
			})
			.then(jsonifiedResponse =>
				this.setState({ tasksList: jsonifiedResponse })
			)
			.catch(function(error) {
				console.log("Looks like there was a problem: \n", error);
			});
	}

	addList = e => {
		if (e.keyCode == 13) {
			let newItem = { label: this.state.task, done: false };
			let updatedList = this.state.tasksList.concat(newItem);
			this.setState({ tasksList: updatedList });

			fetch(this.url, {
				method: "PUT", // or 'POST'
				body: JSON.stringify(updatedList), // data can be `string` or {object}!
				headers: {
					"Content-Type": "application/json"
				}
			})
				.then(res => res.json())
				.then(response => console.log("Success:", response))
				.catch(error => console.error("Error:", error));
		}
	};

	removeItem = index => {
		var newList = this.state.tasksList;
		let empt = [{ label: "", done: "" }];
		newList.splice(index, 1);

		this.setState({
			tasksList: newList
		});
		let data = newList == [] ? empt : newList;
		console.log(newList);
		console.log(data);

		fetch(this.url, {
			method: "PUT", // or 'POST'
			body: JSON.stringify(data), // data can be `string` or {object}!
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(res => res.json())
			.then(response => console.log("Success:", response))
			.catch(error => console.error("Error:", error));
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
								{content.label}
								<a onClick={() => this.removeItem(i)}>
									<i className="fas fa-times" />
								</a>
							</li>
						))}
					</ol>
				</div>
			</div>
		);
	}
}
