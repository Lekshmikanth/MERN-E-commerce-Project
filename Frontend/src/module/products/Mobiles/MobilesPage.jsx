import React from 'react'
import ProductListing from '../ProductListing'
import { useGetProductsQuery } from '../../appSlice';

const MobilesPage = () => {
    const filter = "Mobiles";
    const { data: products = {} } = useGetProductsQuery(`${filter}`);
    return (
        <>
            <ProductListing products={products?.products} category={filter} />
        </>
    )
}

export default MobilesPage