// api doc here: https://github.com/HackerNews/API
const APIurl = "https://hacker-news.firebaseio.com/v0/";

export function fetchList(type) {
  const limit = 10;
  const lists = {
    new: "newstories.json",
    top: "topstories.json",
    best: "beststories.json",
    ask: "askstories.json"
  };

  return fetch(APIurl + lists[type])
    .then(handleErrors)
    .then(res => res.json())
    .then(ids => {
      return ids.slice(0, limit).map(id => {
        return fetchItem(id).then(result => result.data);
      });
    })
    .then(promiseList => Promise.all(promiseList))
    .then(res => ({ data: res }))
    .catch(error => {
      throw new Error(error.statusText);
    });
}

export function fetchComments(ids) {
  console.log("ids", ids);
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
      if (!res || !res.id) {
        throw new Error("item not found");
      }
      return { data: res };
    });
}

export function fetchUser(username) {
  return fetch(`${APIurl}user/${username}.json`)
    .then(handleErrors)
    .then(res => res.json())
    .then(res => {
      if (!res || !res.id) {
        throw new Error("user not found");
      }
      return { data: res };
    });
}

function handleErrors(response) {
  if (!response.ok) {
    console.log("error", response.statusText);
    throw new Error(response.statusText);
  }
  return response;
}
