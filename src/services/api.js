async function callAPI(endPoint) {
  const result = await fetch(endPoint);
  const data = await result.json();
  if (result.status >= 400) {
    throw new Error(`Error ${result.status}!`);
  }
  return data;
}

export async function getProductsAPI() {
  return callAPI('https://fakestoreapi.com/products');
}

export async function getCategoriesAPI() {
  return callAPI('https://fakestoreapi.com/products/categories');
}
