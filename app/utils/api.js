// api doc here: https://github.com/HackerNews/API
const APIurl = "https://hacker-news.firebaseio.com/v0/";

export function fetchList(type) {
  const lists = {
    new: "newstories.json",
    top: "topstories.json",
    best: "beststories.json",
    ask: "askstories.json"
  };

  return fetch(APIurl + lists[type])
    .then(handleErrors)
    .then(res => res.json())
    .then(res => ({ data: res }))
    .catch(error => {
      throw new Error(error);
    });
}

export function fetchItems(ids) {
  const promiseList = ids.map(id => {
    return fetchItem(id).then(result => result.data);
  });

  return Promise.all(promiseList).then(res => res);
}

export function fetchItem(id) {
  return fetch(`${APIurl}item/${id}.json`)
    .then(handleErrors)
    .then(res => res.json())
    .then(res => {
      if (res === null) {
        return { data: { id, error: true } };
      } else if (!res || !res.id) {
        return Promise.reject("Item data seems corrupt");
      } else {
        return { data: res };
      }
    })
    .catch(error => {
      throw new Error(error);
    });
}

export function fetchUser(username) {
  return fetch(`${APIurl}user/${username}.json`)
    .then(handleErrors)
    .then(res => res.json())
    .then(res => {
      if (res === null) {
        return { data: { id: username, error: true } };
      } else if (!res || !res.id) {
        return Promise.reject("User not found");
      } else {
        return { data: res };
      }
    })
    .catch(error => {
      throw new Error(error);
    });
}

function handleErrors(response) {
  if (!response.ok) {
    return Promise.reject(response.statusText);
  }
  return response;
}
