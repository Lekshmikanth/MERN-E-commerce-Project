import React from 'react'
import { useGetProductsQuery } from '../../appSlice'
import ProductListing from '../ProductListing';

const ElectronicsPage = () => {
    const filter = "Electronics"
    const { data: products = {} } = useGetProductsQuery(`${filter}`);
    return (
        <>
            <ProductListing products={products?.products} category={filter} />
        </>
    )
}

export default ElectronicsPage