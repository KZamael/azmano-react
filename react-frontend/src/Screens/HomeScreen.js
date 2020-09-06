import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function HomeScreen (props){

    /** Define an effect hook. const [x,y] = useStte([]) */
    const [products, setProduct] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const {data} = await axios.get("/api/products");
            console.log(data);
            setProduct(data);
        }
        fetchData();
        return () => {
            //
        };
    }, []);


    return <ul className="products">
    {
        /** Returns callback function on each element of the product array. */
        products.map(product =>
        <li key={product.id}>
            <div className="product">
                <Link to={'/product/' + product.id}>
                    <img className="product-image" src={product.image} alt="product" />
                </Link>
                <div className="product-name">
                    <Link to={'/product/' + product.id}>{product.name}</Link>
                </div>
        <div className="product-brand">{product.brand}</div>
        <div className="product-price">{product.price}</div>
        <div className="product-rating">{product.rating} Stars</div>
            </div>
        </li>)
    }
</ul>
}

export default HomeScreen;