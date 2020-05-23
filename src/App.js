import React from 'react';

import classes from './App.module.scss';
import Layout from './containers/Layout/Layout';
import PokemonContainer from './containers/PokemonContainer/PokemonContainer';

function App() {
  return (
    <div className={classes.App}>
      <Layout>
        Filter section
        <PokemonContainer />
        Paging Section
      </Layout>
    </div>
  );
}

export default App;
