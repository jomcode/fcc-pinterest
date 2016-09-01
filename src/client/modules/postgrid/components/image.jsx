import React, { Component } from 'react';

class Image extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: false
    };

    this._onError = this._onError.bind(this);
  }

  _onError() {
    this.setState(Object.assign({}, this.state, { error: true }));
  }

  render() {
    const { error } = this.state;
    const { imageUrl } = this.props;
    const placeholderUrl = 'https://placehold.it/250x150';

    return error ?
      <img onError={this._onError} src={placeholderUrl} role="presentation" /> :
      <img onError={this._onError} src={imageUrl} role="presentation" />;
  }
}

export default Image;
