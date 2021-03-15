import ProductDetail from './ProductDetail';
import './Modal.sass';

export default function ModalProduct({
  onClose,
  children,
  product,
  setShopCartProducts,
  shopCartProducts
}) {
  return (
    <div className="Modal">
      <div className="Modal--overlay" onClick={() => onClose()}></div>

      <ProductDetail
        product={product}
        setShopCartProducts={setShopCartProducts}
        shopCartProducts={shopCartProducts}
        onClose={() => onClose(false)}
      />
    </div>
  );
}
