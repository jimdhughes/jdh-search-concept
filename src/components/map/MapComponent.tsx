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
  focus: ILocation | null;
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
    if(this.props.focus) {
      console.log('setting focus');
      this.setFocus();
    } else {
      this.clearFocus();
    }
  }

  async setFocus() {
    if(this.view){
      this.view.graphics.removeAll();
      if(this.props.focus){
        const [Graphic, Point] = await loadModules(['esri/Graphic', 'esri/geometry/Point']);
        const graphic: __esri.Graphic = new Graphic({
          symbol: {
            type:'simple-marker'
          },
          geometry: new Point({
            type: "point",
            latitude: this.props.focus.lat,
            longitude: this.props.focus.lon
          })
        });
        this.view.graphics.add(graphic);
      }
    }
   
  }

  clearFocus() {

  }

  updateZoom() {
    if (this.view) {
      this.view.zoom = this.props.zoom;
    }
  }

  async updateCenter() {
    const [Point] = await loadModules(['esri/geometry/Point']);
    if (this.view) {
      this.view.goTo(
        new Point({
          longitude: this.props.center.lon,
          latitude: this.props.center.lat
        })
      );
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
  const focus = state.map.focus;
  return { center, zoom, focus };
};

export default connect(mapStateToProps)(MapComponent);
