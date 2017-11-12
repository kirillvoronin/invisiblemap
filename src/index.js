import React from 'react';
import { render } from 'react-dom';
import { Map, TileLayer } from 'react-leaflet';
import HeatmapLayer from '../src/HeatmapLayer';
import { addressPoints } from './flats.js';
import styled from 'styled-components';

const MapBlock = styled.div`min-width: 100%;`;

class MapExample extends React.Component {
  state = {
    mapHidden: false,
    layerHidden: false,
    addressPoints,
    radius: 40,
    blur: 20,
    max: 1199285,
    limitAddressPoints: true,
    isCustomGradient: true
  };

  toggleLimitedAddressPoints = () => {
    if (this.state.limitAddressPoints) {
      this.setState({
        addressPoints: addressPoints.slice(
          Math.floor(Math.random() * 1000) + 500,
          Math.floor(Math.random() * 6000) + 1000
        ),
        limitAddressPoints: false
      });
    } else {
      this.setState({ addressPoints, limitAddressPoints: true });
    }
  };

  toggleGradient = () => {
    this.setState(prevState => ({
      isCustomGradient: !prevState.isCustomGradient
    }));
  };

  resetPrice = () => {
    this.setState({
      max: 174117
    });
  };

  render() {
    /*
    const gradient = {
      0.1: '#3333ff', // #96E3E6
      0.2: '#6699ff', //#89BDE0
      0.3: '#66ccff', // #466BC1

      0.4: '#99ffcc', // #82CEB6

      0.5: '#00cc66', // #FAF3A5
      0.6: '#00b359', // #EDDF40
      0.7: '#99cc00', // #E0D877

      0.8: '#e6e600', // #8A1D44
      0.9: '#ff5050', // #751B3D
      1.0: '#993333' // #2B0001
    };
*/
    return (
      <MapBlock>
        <Map center={[55.75222, 37.61556]} zoom={9}>
          {!this.state.layerHidden && (
            <HeatmapLayer
              points={this.state.addressPoints}
              longitudeExtractor={m => m[1]}
              latitudeExtractor={m => m[0]}
              minOpacity={0.01}
              intensityExtractor={m => parseFloat(m[2])}
              radius={Number(this.state.radius)}
              blur={Number(this.state.blur)}
              max={Number.parseFloat(this.state.max)}
            />
          )}

          <TileLayer
            url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          />
        </Map>
        <input
          type="button"
          value="Тепловая карта"
          onClick={() =>
            this.setState(prevState => ({
              layerHidden: !prevState.layerHidden
            }))}
        />
        <input type="button" value="Случайная выборка" onClick={this.toggleLimitedAddressPoints} />
        <button onClick={this.resetPrice}>Цена квадрата по Медиане</button>
        <div>
          Max
          <input
            type="range"
            min={39285}
            max={2276397}
            step={10000}
            value={this.state.max}
            onChange={e => this.setState({ max: e.currentTarget.value })}
          />{' '}
          {this.state.max}
        </div>
      </MapBlock>
    );
  }
}

render(<MapExample />, document.getElementById('app'));
