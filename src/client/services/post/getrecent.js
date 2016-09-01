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
    const posts = json.data.map(d => {
      const p = Object.assign({}, d.post.properties);
      const u = Object.assign({}, d.user.properties);
      return Object.assign({}, p, u);
    });

    return posts;
  });

export default getRecent;
