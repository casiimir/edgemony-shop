import CardList from './CardList';
import './ShoppingCartModal.sass';

function ShoppingCartModal({
  shopCartProducts,
  setModalOpen,
  setModalProduct,
  setOpenChart
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
        <main>
          <CardList
            products={shopCartProducts}
            setModalOpen={setModalOpen}
            setModalProduct={setModalProduct}
          />
        </main>
        <footer>
          <p>
            {`Total: ${shopCartProducts
              .reduce((cont, product) => cont + product.price, 0)
              .toFixed(2)} €`}
          </p>
        </footer>
      </div>
    </div>
  );
}

export default ShoppingCartModal;
