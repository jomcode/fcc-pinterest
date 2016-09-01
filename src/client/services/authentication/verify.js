import rootUrl from '../../config/rooturl';

const verify = () =>
  fetch(`${rootUrl}/auth/verify`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      Accept: 'application/json'
    }
  })
  .then(response => {
    if (response.status !== 200) throw new Error(response.statusText);
    return response.json();
  })
  .then(json => {
    const user = Object.assign({}, json.data);
    return user;
  });

export default verify;
