const request = require('postman-request')


const forecast =(latitude,longitude,callback) => {
    const url="http://api.weatherstack.com/current?access_key=83a1fd3f3346db8ebfa6dc4c3493fab8&query="+latitude + "," +longitude +"&units=f"

    request({url,json:true},(error,{body}) => {
     if(error) {
         callback('Unable to connect to the forecast service',undefined)
     } else if(body.error) {
         callback('Give the correct coordinates',undefined)
     } else {
         callback(undefined,body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature+" degrees out. It feels like "+body.current.feelslike + " out. The humidity is " + body.current.humidity +"%")
     }
    })
}

// const forecast =(latitude,longitude,callback) => {
//     const url="http://api.weatherstack.com/current?access_key=83a1fd3f3346db8ebfa6dc4c3493fab8&query="+latitude + "," +longitude +"&units=f"

//     request({url:url,json:true},(error,response) => {
//      if(error) {
//          callback('Unable to connect to the forecast service',undefined)
//      } else if(response.body.error) {
//          callback('Give the correct coordinates',undefined)
//      } else {
//          callback(undefined,response.body.current.weather_descriptions[0] + ". It is currently " + response.body.current.temperature+" degrees out. It feels like "+response.body.current.feelslike + " out.")
//      }
//     })
// }


module.exports=forecast