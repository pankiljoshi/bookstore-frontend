import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { savePageView } from '../actions/pageViewActions';
import { detailsProduct } from '../actions/productActions';

function ProductScreen(props) {
  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(savePageView());
    dispatch(detailsProduct(props.match.params.id));
    return () => {
      //
    };
  }, []);
  const handleBuyNow = () => {
    alert('Thank you for your purchase');
  }
  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error} </div>
      ) : (
        <>
        <div className="grid grid-cols-2 justify-items-center">
            <div className="p-4">
                <img src={product.image.src} />
            </div>
            <div className="p-4">
                <h1 className="text-3xl flex justify-center">{product.title}</h1>
                <div>Author: {product.author}</div>
                <div>Number of pages: {product.no_of_pages}</div>
                <div>{(product.variants[0].compare_at_price > product.variants[0].price) && <span className="text-sm line-through">$ {product.variants[0].compare_at_price}</span>} <span className="text-green-400">$ {product.variants[0].price}</span></div>
                <div><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleBuyNow}>Buy Now</button></div>
            </div>
        </div>
        </>
      )}
    </div>
  );
}
export default ProductScreen;