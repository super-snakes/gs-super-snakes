// import {expect} from 'chai'
// import {createStore} from 'redux'

// import {
//   getProducts,
//   deleteProductThunk,
//   addProductThunk
// } from '../store/products'

// const PRODUCT = [
//   {
//     id: 1,
//     title: 'Book1',
//     author: 'author1',
//     imageUrl: 'imageUrl',
//     description: 'Description1',
//     tags: 'f',
//     quantity: 8,
//     genre: 'novel',
//     featuredItem: false,
//     salePercentageOff: 20,
//     price: 4000
//   },
//   {
//     id: 1,
//     title: 'Book2',
//     author: 'author2',
//     imageUrl: 'imageUrl',
//     description: 'Description2',
//     tags: 'f',
//     quantity: 10,
//     genre: 'children',
//     featuredItem: false,
//     salePercentageOff: 30,
//     price: 5000
//   }
// ]

// function getRandomProduct(products) {
//   return products[Math.floor(Math.random() * products.length)]
// }
// describe('Action creators', () => {
//   describe('getProduct', () => {
//     xit('returns properly formatted action', () => {
//       const product = getRandomProduct(PRODUCT)

//       expect(getProducts(product)).to.be.equal({
//         type: 'GOT_PRODUCTS',
//         productId: product.id
//       })
//     })
//   })
// })
