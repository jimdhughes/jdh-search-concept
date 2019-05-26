import React from 'react';
import SearchListComponent from './components/search/search-list/SearchListComponent';
import MapComponent from './components/map/MapComponent';
import { Grid } from '@material-ui/core';

const styles = {
  height: '100vh'
};

const App: React.FC = () => {
  return (
    <Grid container>
      <Grid item xs={4}>
        <SearchListComponent />
      </Grid>
      <Grid item xs={8}>
        <div style={styles}>
          <MapComponent />
        </div>
      </Grid>
    </Grid>
  );
};

export default App;
