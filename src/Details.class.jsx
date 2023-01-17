import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageNotFound from "./PageNotFound";
import { Fetch } from "./services/useFetch";
import Spinner from "./Spinner";
import { useCartContext } from "./cartContext";

export default function DetailsWrapper() {
    const { dispatch } = useCartContext();
    const { id } = useParams();
    const navigate = useNavigate();

    return (
        <Details
            id={ id }
            dispatch={ dispatch }
            navigate={ navigate }
        />
    )
}

class Details extends React.Component {
    state = {
        sku: ""
    };
    
    render() {
        const { id, navigate, dispatch } = this.props;
        const { sku } = this.state;
        
        return (
            <Fetch url={`products/${id}`}>
                {(product, loading, error) => {
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
                                        dispatch({ type: "add", id, sku });
                                        navigate("/cart");
                                    }}
                                    disabled={!sku}
                                >
                                    Add to cart
                                </button>
                            </p>
                            <select id="size" value={sku} onChange={(e) => this.setState({ sku: e.target.value })}>
                                <option value="">What size?</option>
                                {product.skus.map((s) => <option key={s.sku} value={`${s.sku}`}>{s.size}</option>)}
                            </select>
                            <img src={`/images/${product.image}`} alt={product.name} />
                        </div>
                    )
                }}
            </Fetch>
        )
    }
}