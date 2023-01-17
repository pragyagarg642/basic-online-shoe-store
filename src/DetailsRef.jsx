import React, { useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageNotFound from "./PageNotFound";
import useFetch from "./services/useFetch";
import Spinner from "./Spinner";

export default function Details(props) {
    const { id } = useParams();
    const skuRef = useRef();
    const { data: product, error, loading } = useFetch("products/" + id);
    const navigate = useNavigate();
    
    if (loading) return <Spinner />;
    if (product.length === 0) return <PageNotFound />;
    if (error) throw error;

    return (
        <div id="detail">
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p>{product.price}</p>
            <p>
                <button
                    className="btn btn-primary"
                    onClick={() => {
                        const sku = skuRef.current.value;
                        if (!sku) return alert("Please select a size")
                        props.addToCart(id, sku);
                        navigate("/cart");
                    }}
                >
                    Add to cart
                </button>
            </p>
            <select id="size" ref={skuRef}>
                <option value="">What size?</option>
                {product.skus.map((s) => <option key={s.sku} value={`${s.sku}`}>{s.size}</option>)}
            </select>
            <img src={`/images/${product.image}`} alt={product.name} />
        </div>
    )
}