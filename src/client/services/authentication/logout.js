import rootUrl from '../../config/rooturl';

const logout = () =>
  fetch(`${rootUrl}/logout/twitter`, {
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
  .then(json => json);

export default logout;
