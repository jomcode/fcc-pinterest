const rootUrl = process.env.NODE_ENV === 'production' ?
  `${window.location.origin}` :
'http://127.0.0.1:3030';

export default rootUrl;
