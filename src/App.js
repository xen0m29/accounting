import React from 'react';
import * as Utils from './Utils';
import Layout from './Layout';
import "./App.css";

class App extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			result: []
		}
	}

	doAccount(e){
		if(e.keyCode === 13){
			var value = e.target.value;
			const validation = Utils.doValidation(value);
			if(validation.message !== "success"){
				alert(validation.message);
				return;
			}

			value = Utils.doRemoveNonNumbers(value);
			var accounts = Utils.doDenominations(value);

			var result = [];
			accounts.forEach((v, index) => {
				result.push(
					<li key={index}>
						{ Utils.doAddingCurrency(v[0]) }
						<span>
							{ (v.length > 1 || Utils.account.indexOf(v[0]) >= 0) ? `x ${v.length}` : 'left ' } 
						</span>
					</li>
				);
			});

			this.setState({ result });
		}
	}

	render(){
		const { result } = this.state;
		return (
			<Layout title="Denominations">
				<input 
					type="text" 
					id="account"
					className="form"
					placeholder="Currency (Rp)"
					onKeyUp={this.doAccount.bind(this)} />
				
				{
					result.length > 0 &&
					<ul className="list-group">
						{ result }
					</ul>
				}
			</Layout>
		);
	}
}
	
export default App;
