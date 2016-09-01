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
    const user = Object.assign({}, json.data.user);
    const posts = json.data.posts.slice();
    return { user, posts };
  });

export default getByUserId;
