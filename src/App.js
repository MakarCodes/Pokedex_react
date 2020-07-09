import React, { Component } from 'react';

import classes from './App.module.scss';
import Layout from './containers/Layout/Layout';
import PokemonContainer from './containers/PokemonContainer/PokemonContainer';
import Filter from './components/Filter/Filter';

class App extends Component {
  state = {
    showTypeButtons: false,
  };

  showFilteringButtons = () => {
    this.setState(prevState => ({
      showTypeButtons: !prevState.showTypeButtons,
    }));
  };

  render() {
    return (
      <div className={classes.App}>
        <Layout>
          <Filter
            showFilteringButtons={this.showFilteringButtons}
            showButtons={this.state.showTypeButtons}
          />
          <PokemonContainer />
          Paging Section
        </Layout>
      </div>
    );
  }
}

export default App;
