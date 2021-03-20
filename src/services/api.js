const baseURL = 'https://fakestoreapi.com';

async function callAPI(endPoint, options) {
  const result = await fetch(`${baseURL}/${endPoint}`, options);
  const data = await result.json();
  if (result.status >= 400) {
    throw new Error(`Error ${result.status}!`);
  }
  return data;
}

export async function getProductAPI(id) {
  return callAPI(`products/${id}`);
}

export async function getProductsAPI() {
  return callAPI('products');
}

export async function getCategoriesAPI() {
  return callAPI('products/categories');
}

export async function postItemToCart(cartId, productId, quantity) {
  return callAPI(`carts/${cartId}/items`, {
    method: 'POST',
    body: JSON.stringify({ id: productId, quantity })
  });
}
