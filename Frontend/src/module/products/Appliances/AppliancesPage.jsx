import React from 'react'
import ProductListing from '../ProductListing'
import { useGetProductsQuery } from '../../appSlice';
import CategorywiseListing from '../CategorywiseListing/CategorywiseListing';

const AppliancesPage = () => {
    const filter = "Appliances"
    // const { data: products = {} } = useGetProductsQuery(`${filter}`);

    return (
        <>
            {/* <ProductListing products={products?.products} category={filter} /> */}
            <CategorywiseListing />
        </>
    )
}

export default AppliancesPage