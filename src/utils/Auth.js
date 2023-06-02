const BASE_URL = "https://auth.nomoreparties.co";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

function checkStatus(res) {
  if (res.ok) return res.json();
  return Promise.reject(`Ошибка: ${res.status}`);
}

function request(endpoint, options) {
  return fetch(`${BASE_URL}${endpoint}`, options).then(checkStatus);
}

export function register(email, password) {
  return request("/signup", {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ email, password }),
  });
}

export function authorize(email, password) {
  return request("/signin", {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ email, password }),
  });
}
