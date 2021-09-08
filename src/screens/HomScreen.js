import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { savePageView } from '../actions/pageViewActions';
import {
  listProducts,
} from '../actions/productActions';
import { LIMIT } from '../constants/productConstants';

function HomeScreen(props) {
  const productList = useSelector((state) => state.productList);
  const { loading, data, error, pageNumber } = productList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(savePageView());
    dispatch(listProducts('next'));
    return () => {
    };
  }, []);
  const handleBookClick = (id) => {
    props.history.push(`/books/${id}`);
  };
  const handleNextPage = () => {
    dispatch(listProducts('next'));
  };
  const handlePrevPage = () => {
    dispatch(listProducts('prev'));
  };
  return (
    <div>
        {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error} </div>
      ) : (
        <div>
        <div className="grid grid-cols-4 gap-4 justify-items-center">
        {data.books.map((product, i) =>
          <div key={i} className="p-4" onClick={() => handleBookClick(product.id)}>
            <h2 className="text-2xl flex justify-center">{product.title}</h2>
            <div>Author: {product.author}</div>
            <div>{(product.variants[0].compare_at_price > product.variants[0].price) && <span className="text-sm line-through">$ {product.variants[0].compare_at_price}</span>} <span className="text-green-400">$ {product.variants[0].price}</span></div>
          </div>
        )}
        </div>
        <div>
        {pageNumber > 1 && data.total_count > LIMIT && <button onClick={handlePrevPage}>Prev</button> }
        {pageNumber < Math.ceil(data.total_count/LIMIT) && data.total_count > LIMIT && <button onClick={handleNextPage}>Next</button> }
        </div>
        </div>
        )}
    </div>
  );
}
export default HomeScreen;