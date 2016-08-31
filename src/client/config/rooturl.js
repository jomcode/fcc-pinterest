const rootUrl = process.env.NODE_ENV === 'production' ?
  `${window.location.origin}` :
'http://localhost:3030';

export default rootUrl;
