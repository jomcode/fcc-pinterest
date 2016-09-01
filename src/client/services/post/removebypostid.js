import rootUrl from '../../config/rooturl';

const removeByPostId = (postId) =>
  fetch(`${rootUrl}/posts/${postId}`, {
    method: 'DELETE',
    credentials: 'include'
  })
  .then(response => {
    if (response.status !== 204) throw new Error(response.statusText);
    return true;
  });

export default removeByPostId;
