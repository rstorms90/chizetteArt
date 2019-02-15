require('dotenv').config()
const PrintfulClient = require('../models/printfulClient.js')
const express = require('express')
const router = express.Router()

// Replace this with your API key

let key = process.env.PRINTFULAPIKEY

/**
 * Callback for success
 * data - result element from the API response
 * info - additional data about the request and response
 */

let ok_callback = function (data, info) {
  console.log('SUCCESS')
  if (data) {
    console.log(data)
  }

  //If response includes paging information, show total number available
  if (info.total_items) {
    console.log('Total items available: ' + info.total_items)
  }
}

/**
 * Callback for failure
 * data - error message
 * info - additional data about the request
 */

let error_callback = function (message, info) {
  console.log('ERROR ' + message)
  //Dump raw response
  console.log(info.response_raw)
}

///Construct client
let pf = new PrintfulClient(key)

//// GET ALL SYNCED PRODUCTS \\\\
// pf.get('store/products')
//   .success(ok_callback)
//   .error(error_callback)

//// POST ORDER ON ONE ID \\\\
//// TO DO ON ACTION CREATE NEW USER TO ORDER NEW PRINT \\\\
let name,
  address1,
  city,
  state,
  country,
  zip,
  externalId,
  variantId,
  artName,
  retail_price,
  quantity,
  url

pf.post('orders', {
  shipping: "STANDARD",
  recipient: {
    name: `${name}`,
    address1: `${address1}`,
    city: `${city}`,
    state_code: `${state}`,
    country_code: `${country}`,
    zip: `${zip}`
  },
  items: [{
    external_id: externalId,
    variant_id: variantId,
    name: `${artName}`,
    retail_price: retail_price,
    quantity: quantity,
  files: [{
    url: `${url}`
  }]
  }]
}).success(ok_callback).error(error_callback)


// pf.post('orders', {
//   shipping: "STANDARD",
//   recipient: {
//     name: 'Chris Test',
//     address1: '856 Pharoh St.',
//     city: 'Boulder',
//     state_code: 'CO',
//     country_code: 'US',
//     zip: '80301'
//   },
//   items: [{
//       external_id: 5,
//       variant_id: 1, //Small poster
//       name: 'Amethyst', //Display name
//       retail_price: '26', //Retail price for packing slip
//       quantity: 1,
//       files: [{
//         url: 'https://printful.s3.amazonaws.com/files/904/904d24eed80c2820ef82bc24ef185a6f?response-content-disposition=inline%3B%20filename%3D%22amethyst.jpeg%22&response-content-type=image%2Fjpeg&AWSAccessKeyId=AKIAJH7JLGRY6WQHFAZQ&Expires=1550004366&Signature=u1VTXir0QqNVBKomC%2FHvuNM6i88%3D'
//       }]
//     }
//   ]
// }).success(ok_callback).error(error_callback)


// Get information about the store
// pf.get('store').success(ok_callback).error(error_callback)

//Get product list
// pf.get('products').success(ok_callback).error(error_callback)

//Get variants for product 10
// pf.get('products/10').success(ok_callback).error(error_callback)

//Get information about Variant 1007
// pf.get('products/variant/1007').success(ok_callback).error(error_callback)

//Select 10 latest orders and get the total number of orders
// pf.get('orders',{limit: 10}).success(ok_callback).error(error_callback)

//Select order with ID 12345 (Replace with your order's ID)
// pf.get('orders/12345').success(ok_callback).error(error_callback)

//Select order with External ID 9900999 (Replace with your order's External ID)
//pf.get('orders/@9900999').success(ok_callback).error(error_callback)

//Confirm order with ID 12345 (Replace with your order's ID)
// pf.post('orders/97600919/confirm').success(ok_callback).error(error_callback)

//Cancel order with ID 12345 (Replace with your order's ID)
// pf.delete('orders/15238110').success(ok_callback).error(error_callback)

//Create an order

// pf.post('orders',
//     {
//         recipient:  {
//             name: 'John Doe',
//             address1: '19749 Dearborn St',
//             city: 'Chatsworth',
//             state_code: 'CA',
//             country_code: 'US',
//             zip: '91311'
//         },
//         items: [
//             {
//                 variant_id: 1, //Small poster
//                 name: 'Niagara Falls poster', //Display name
//                 retail_price: '19.99', //Retail price for packing slip
//                 quantity: 1,
//                 files: [
//                     {url: 'http://example.com/files/posters/poster_1.jpg'}
//                 ]
//             },
//             {
//                variant_id: 1118,
//                quantity: 2,
//                name: 'Grand Canyon T-Shirt', //Display name
//                retail_price: '29.99', //Retail price for packing slip
//                files: [
//                     {url: 'http://example.com/files/tshirts/shirt_front.ai'}, //Front print
//                     {type: 'back', url: 'http://example.com/files/tshirts/shirt_back.ai'}, //Back print
//                     {type: 'preview', url: 'http://example.com/files/tshirts/shirt_mockup.jpg'} //Mockup image
//                ],
//                options: [ //Additional options
//                     {id: 'remove_labels', value: true}
//                ]
//             }
//         ]
//      }
// ).success(ok_callback).error(error_callback)


//Create an order and confirm immediately

// pf.post('orders',
//     {
//         recipient:  {
//             name: 'John Doe',
//             address1: '19749 Dearborn St',
//             city: 'Chatsworth',
//             state_code: 'CA',
//             country_code: 'US',
//             zip: '91311'
//         },
//         items: [
//             {
//                 variant_id: 1, //Small poster
//                 name: 'Niagara Falls poster', //Display name
//                 retail_price: '19.99', //Retail price for packing slip
//                 quantity: 1,
//                 files: [
//                     {url: 'http://example.com/files/posters/poster_1.jpg'}
//                 ]
//             }
//         ]
//     },
//     {confirm: 1}
// ).success(ok_callback).error(error_callback)


//Calculate shipping rates for an order
/*
    pf.post('shipping/rates',{
        recipient: {
            country_code: 'US',
            state_code: 'CA'
        },
        items: [
           {variant_id: 1,  quantity: 1}, //Small poster
           {variant_id: 1118, quantity: 2} //Alternative T-Shirt
        ]
    }).success(ok_callback).error(error_callback)
*/

module.exports = router