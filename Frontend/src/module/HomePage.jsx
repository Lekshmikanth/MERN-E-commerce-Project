import React, { useEffect } from 'react'
import ProductListing from './products/ProductListing'
import { useGetProductsQuery } from './appSlice';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const filterKey = "isTrending";
    const { data: products = {} } = useGetProductsQuery({ filterKey, filterValue: true });
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, navigate])

    return (
        <>
            <div style={{ padding: "20px" }}>
                <ProductListing products={products?.products} title={"Trending Products"} />
            </div>
        </>
    )
}

export default HomePage