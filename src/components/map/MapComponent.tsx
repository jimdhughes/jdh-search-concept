import * as React from 'react';
import { loadModules } from 'esri-loader';
import { connect } from 'react-redux';
import { IAppState } from '../../stores/reducers';
import { ILocation } from '../../stores/map/types';

const styles = {
  height: '100%',
  width: '100%'
};

interface IProps {
  center: ILocation;
  zoom: number;
}

class MapComponent extends React.Component<IProps> {
  view: __esri.MapView | null = null;
  map: __esri.Map | null = null;

  constructor(props: IProps) {
    super(props);
  }

  componentDidMount() {
    this.initMap();
  }
  componentDidUpdate(prevProps: IProps) {
    if (this.props.zoom !== prevProps.zoom) {
      this.updateZoom();
    }
    if (this.props.center !== prevProps.center) {
      this.updateCenter();
    }
  }

  updateZoom() {
    if (this.view) {
      this.view.zoom = this.props.zoom;
    }
  }

  async updateCenter() {
    const [Point] = await loadModules(['esri/geometry/Point']);
    if (this.view) {
      this.view.center = new Point({
        longitude: this.props.center.lon,
        latitude: this.props.center.lat
      });
    }
  }

  initMap = async () => {
    const [Map, MapView] = await loadModules(['esri/Map', 'esri/views/MapView']);
    this.map = new Map({ basemap: 'topo-vector' });
    this.view = new MapView({
      container: 'mapComponent',
      map: this.map,
      center: [this.props.center.lon, this.props.center.lat],
      zoom: this.props.zoom
    });
  };

  render() {
    return <div id="mapComponent" style={styles} />;
  }
}

const mapStateToProps = (state: IAppState) => {
  const center = state.map.center;
  const zoom = state.map.zoom;
  return { center, zoom };
};

export default connect(mapStateToProps)(MapComponent);
