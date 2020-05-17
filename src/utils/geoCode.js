const request = require('postman-request')



const geoCode = (address,callback) => {

    const url="https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoicmF0aGlzaCIsImEiOiJjazlyMm1wOXQwcTZnM2RxYzBnY2d1NWdtIn0.8WZKgGpQj__m7WxTEAED-w&limit=1"
 
    request({url,json:true},(error,{body}) => {
      if(error) {
          callback('Unable to connect location services',undefined)
      } else if(body.features.length === 0) {
       callback('Give the correct Coordinates',undefined)
      } else {
          callback(undefined,{
            latitude:body.features[0].center[1],
            longitude:body.features[0].center[0],
            place:body.features[0].place_name
          })
      }
    })

}

// geoCode('Ariyalur',(error,res)=>{
//   console.log(error)
//   console.log(res.body)
// })



// const geoCode = (address,callback) => {

//   const url="https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoicmF0aGlzaCIsImEiOiJjazlyMm1wOXQwcTZnM2RxYzBnY2d1NWdtIn0.8WZKgGpQj__m7WxTEAED-w&limit=1"

//   request({url:url,json:true},(error,response) => {
//     if(error) {
//         callback('Unable to connect location services',undefined)
//     } else if(response.body.features.length === 0) {
//      callback('Give the correct Coordinates',undefined)
//     } else {
//         callback(undefined,{
//           latitude:response.body.features[0].center[1],
//           longitude:response.body.features[0].center[0],
//           place:response.body.features[0].place_name
//         })
//     }
//   })

// }


module.exports=geoCode