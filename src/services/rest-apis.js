export const restApis = {
  _get,
  _getAll,
  _put,
  _post,
  _delete
};

const BaseUrl = "";
function _get(url, payLoad) {
  const apiUrl = BaseUrl + url;
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ payLoad })
  };
  return fetch(apiUrl, requestOptions)
    .then(handleResponse)
    .then(res => {
      return res;
    });
}

async function _getAll(url) {
  debugger;
  const apiUrl = BaseUrl + url;
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    }
    //mode: "no-cors"
  };
  return fetch(url, requestOptions)
    .then(handleResponse)
    .then(res => {
      debugger;
      return res;
    });
}
function _put(url, payLoad) {
  const apiUrl = BaseUrl + url;
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ payLoad })
  };
  return fetch(apiUrl, requestOptions)
    .then(handleResponse)
    .then(res => {
      return res;
    });
}
function _post(url, payLoad) {
  const apiUrl = BaseUrl + url;
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    },
    mode: "no-cors",
    body: JSON.stringify({ payLoad })
  };
  return fetch(url, requestOptions)
    .then(handleResponse)
    .then(res => {
      return res;
    });
}
function _delete(url, payLoad) {
  const apiUrl = BaseUrl + url;
  const requestOptions = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ payLoad })
  };
  return fetch(apiUrl, requestOptions)
    .then(handleResponse)
    .then(res => {
      return res;
    });
}

function handleResponse(response) {
  debugger;
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        //logout();
        //location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
