import React, { Component } from "react";
import store from "./store";
import { Provider } from "react-redux";
import Steps from "./components/Steps";
import DiscoverySource from "./components/DiscoverySource";
import DiscoveryOptions from "./components/DiscoveryOptions";
import SelectedOptions from "./components/SelectedOptions";
import "semantic-ui-css/semantic.min.css";
import "./App.css";

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<div className="App">
					<Steps />
					<div className="flex">
						<DiscoverySource />
						<DiscoveryOptions />
					</div>
					<SelectedOptions />
				</div>
			</Provider>
		);
	}
}

export default App;
