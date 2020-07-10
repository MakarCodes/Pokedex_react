import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from './store/actions/index';
import classes from './App.module.scss';
import Layout from './containers/Layout/Layout';
import PokemonContainer from './containers/PokemonContainer/PokemonContainer';
import Filter from './components/Filter/Filter';

class App extends Component {
  state = {
    showTypeButtons: false,
    type: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.type !== prevState.type && this.state.type !== null) {
      this.props.fetchPokemons(this.state.type);
    }
  }

  handleFilterChange = type => {
    this.setState({
      type: type.toLowerCase(),
    });
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
            filterType={this.handleFilterChange}
          />
          <PokemonContainer />
          Paging Section
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    pokemons: state.pokemons,
    loading: state.loading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchPokemons: type => dispatch(actions.fetchPokemonTypes(type)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
