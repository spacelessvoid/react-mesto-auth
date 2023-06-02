export const BASE_URL = "https://auth.nomoreparties.co";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

// function request(endpoint, options) {
//   return fetch(`${BASE_URL}${endpoint}`, options).then(checkStatus);
// }

function checkStatus(res) {
  if (res.ok) return res.json();
  return Promise.reject(`Ошибка: ${res.status}`);
}

export function register(email, password) {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ email, password }),
  }).then(res => checkStatus(res));
}
