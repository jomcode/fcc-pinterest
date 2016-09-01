import React, { Component } from 'react';

class Image extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: false
    };

    this._onError = this._onError.bind(this);
    this._onLoad = this._onLoad.bind(this);
  }

  _onError() {
    this.setState(Object.assign({}, this.state, { error: true }));
  }

  _onLoad(e) {
    // console.log('onLoad', e.target.height);
  }

  render() {
    const { error } = this.state;
    const { imageUrl } = this.props;
    const placeholderUrl = 'https://placehold.it/250x150';

    return error ?
      <img
        onLoad={this._onLoad}
        onError={this._onError}
        src={placeholderUrl}
        role="presentation"
      /> :
      <img
        onLoad={this._onLoad}
        onError={this._onError}
        src={imageUrl}
        role="presentation"
      />;
  }
}

export default Image;
