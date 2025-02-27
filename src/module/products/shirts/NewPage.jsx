import { Box } from '@mui/material'
import React from 'react'
import ProductListing from '../ProductListing'

const NewPage = () => {
  const products = [
    { id: 1, title: 'Product 1', price: 29.99, image: 'https://picsum.photos/150' },
    { id: 2, title: 'Product 2', price: 49.99, image: 'https://picsum.photos/150' },
    { id: 3, title: 'Product 3', price: 19.99, image: 'https://picsum.photos/150' },
  ];
  return (
    <>
      <Box>New Page</Box>
      <ProductListing products={products} />
    </>
  )
}

export default NewPage