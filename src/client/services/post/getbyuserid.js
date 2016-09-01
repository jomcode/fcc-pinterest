import rootUrl from '../../config/rooturl';

const getByUserId = (userId) =>
  fetch(`${rootUrl}/posts/user/${userId}`, {
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
    // TODO figure out shape for data
    // TODO move this to server
    const posts = json.data.posts.map(d => {
      const p = Object.assign({}, d.properties);
      const u = Object.assign({}, json.data.user.properties);
      return Object.assign({}, p, u);
    });

    return posts;
  });

export default getByUserId;
