import React from 'react'
import { useParams } from 'react-router-dom'
import ProductListing from '../ProductListing';
import { useGetProductsQuery } from '../../appSlice';

const CategorywiseListing = () => {
    const { categoryName } = useParams();
    const filterKey = "category";
    const { data: products = {} } = useGetProductsQuery({ filterKey, filterValue: categoryName });

    return (
        <>
            <ProductListing products={products?.products} title={categoryName} />
        </>
    )
}

export default CategorywiseListing