import rootUrl from '../../config/rooturl';

const create = (data) =>
  fetch(`${rootUrl}/posts`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ data })
  });

export default create;
