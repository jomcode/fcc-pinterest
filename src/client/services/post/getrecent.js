import rootUrl from '../../config/rooturl';

const getRecent = () =>
  fetch(`${rootUrl}/posts`, {
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
    // TODO format posts data to certain shape
    const posts = json.data.slice();
    return posts;
  });

export default getRecent;
