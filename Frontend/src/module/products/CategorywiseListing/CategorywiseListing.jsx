import React from 'react'
import { useLocation } from 'react-router-dom'
import ProductListing from '../ProductListing';
import { useGetProductsQuery } from '../../appSlice';

const CategorywiseListing = () => {
    const location = useLocation();
    const splitPath = location.pathname.split('/');
    const lastWord = splitPath[2];
    const filterKey = "category";
    const filterValue = lastWord.charAt(0).toUpperCase() + lastWord.slice(1);
    const { data: products = {} } = useGetProductsQuery({filterKey, filterValue});

    return (
        <>
            <ProductListing products={products?.products} title={filterValue} />
        </>
    )
}

export default CategorywiseListing