const baseURL = "http://localhost:8888/api/V1/categories";

async function api(path, method) {
  const response = await fetch(`${baseURL}/${path}`, { method });

  return response.json();
}

async function get(path) {
  const response = await api(path, "GET");

  return response;
}

async function post(path) {
  const response = await api(path, "POST");

  return response;
}