// pegando o url da API
const baseURL = "http://localhost:8888/api/V1";

// Função para adapta fetch
async function api(path, method) {
  const response = await fetch(`${baseURL}/${path}`, { method });

  return response.json();
}

//função para pegar o get
async function get(path) {
  const response = await api(path, "GET");

  return response;
}

//função para pegar o post
async function post(path) {
  const response = await api(path, "POST");

  return response;
}
