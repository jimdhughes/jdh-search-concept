import * as React from 'react';
import { loadModules } from 'esri-loader';

const styles = {
    height: '100%',
    width: '100%'
}

export default class MapComponent extends React.Component<{},{}> {

    view: __esri.MapView | null = null;
    map: __esri.Map | null = null;

    constructor() {
        super({}, {});
        
    }

    componentDidMount() {
        this.initMap();
    }

    initMap = async() => {
        const [Map, MapView] = await loadModules(['esri/Map', 'esri/views/MapView']);
        this.map = new Map({basemap:'topo-vector'});
        this.view = new MapView({
            container:'mapComponent',
            map: this.map,
            center:[-118.71511, 34.09042],
            zoom: 11
        });
    }

    render() {
        return <div id ="mapComponent" style={styles}></div>
    }
}