import './ShoppingCartModal.sass';

function ShoppingCartModal({
  shopCartProducts,
  setOpenChart,
  editQuantity,
  removeItemFromChart
}) {
  return (
    <div className="ShoppingCartModal">
      <div
        className="ShoppingCartModal--overlay"
        onClick={() => setOpenChart(false)}
      ></div>
      <div className="ShoppingCartModal__content">
        <header>
          <h2>Cart</h2>
          <button onClick={() => setOpenChart(false)}>X</button>
        </header>
        {shopCartProducts.map((product) => (
          <main key={product.id}>
            <div className="image">
              <img src={product.image} alt={product.title} />
            </div>
            <div className="content">
              <h3>{product.title}</h3>
              <p>{product.price}€</p>
              <button
                type="button"
                onClick={() => {
                  //quantity --
                  product.quantity > 1 &&
                    editQuantity(product.id, product.quantity - 1);
                }}
              >
                -
              </button>
              <p>{product.quantity}</p>
              <button
                type="button"
                onClick={() => {
                  //quantity ++
                  editQuantity(product.id, product.quantity + 1);
                }}
              >
                +
              </button>
            </div>
            <button
              type="button"
              onClick={() => removeItemFromChart(product.id)}
            >
              X
            </button>
          </main>
        ))}
        <main>
          {/* <CardList
            products={shopCartProducts}
            setModalOpen={setModalOpen}
            setModalProduct={setModalProduct}
          /> */}
        </main>
        <footer>
          <p>
            {shopCartProducts.length >= 1
              ? `Total: ${shopCartProducts
                  .reduce((cont, product) => cont + product.price, 0)
                  .toFixed(2)} €`
              : 'No product available in this cart.'}
          </p>
        </footer>
      </div>
    </div>
  );
}

export default ShoppingCartModal;
