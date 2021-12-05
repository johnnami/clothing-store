//Função para pegar e obter variaveis no search ? categories = 1
function getQueryParams(qs) {
  qs = qs.split("+").join(" ");

  var params = {},
    tokens,
    re = /[?&]?([^=]+)=([^&]*)/g;

  while ((tokens = re.exec(qs))) {
    params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
  }
  return params;
}

const getProduct = async (id) => {
  //Pega o parametro que depois da interrogação chamando categories, caso esteja null ou undefined passa a ser 1 por causa da Null coalescing operator = ??
  const idNumber = getQueryParams(window.location.search).categories ?? 1;
  //Transforma URL get em categories e juntamente com o ID de cada mock
  const produto = await get(`categories/${idNumber}`);

  return produto;
};

const getCategories = async () => {
  //Transforma o menu em get, redirecionando para determinada url
  const categories = await get("list");

  return categories;
};

const btnMobile = document.getElementById("btn-mobile");
const btnMobileClose = document.getElementById("btn-close");

function toggleMenu() {
  const nav = document.getElementById("menu");
  nav.classList.toggle("active");
}

btnMobile.addEventListener("click", toggleMenu);
btnMobileClose.addEventListener("click", toggleMenu);

const getList = async () => {
  const categories = await get("categories/list");
  const menu = document.getElementById("nav-category");

  for (let i = 0; i < categories.items.length; i++) {
    let menuItem = document.createElement("li");
    let linkItem = document.createElement("a");

    let iNumber = i + 1;
    linkItem.setAttribute("href", "catalogo.html?categories=" + iNumber);

    linkItem.textContent = categories.items[i].name.toUpperCase();
    menuItem.appendChild(linkItem);
    menu.appendChild(menuItem);
  }
};

getList();

const getProducts = async () => {
  const product_title = document.getElementById("product_title");
  const link_title = document.getElementById("link_title");
  const convertId = getQueryParams(window.location.search).categories ?? 1;

  //Retorno para não executar o código quando não existir o product_title
  if (!product_title) {
    return;
  }

  if (convertId == "1") {
    product_title.innerHTML = "Camisetas";
    link_title.innerHTML = "Camisetas";
  } else if (convertId == "2") {
    product_title.innerHTML = "Calças";
    link_title.innerHTML = "Calças";
  } else if (convertId == "3") {
    product_title.innerHTML = "Calçados";
    link_title.innerHTML = "Calçados";
  }

  const allProducts = await getProduct(convertId);

  for (let i = 0; i < allProducts.items.length; i++) {
    const layout = `
    <div>
      <img src="../${allProducts.items[i].image}" alt="Itens" />
      <h3 class="name-product">${allProducts.items[i].name}</h3>
      <h3 class="price-product">${allProducts.items[i].price.toLocaleString(
        "pt-br",
        { style: "currency", currency: "BRL" }
      )}</h3>
      <button>COMPRAR</button>
    </div>
  `;
    const containerProducts = document.getElementById("products");
    containerProducts.innerHTML += layout;
  }
};

getProducts();
