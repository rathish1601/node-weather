const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geoCode')
const forecast = require('./utils/forecast')


const app = express()
const port = process.env.PORT || 3000
// console.log(__dirname)
// console.log(__filename)
// console.log(path.join(__dirname,'../public'))

// Define path for Express config
const publicPathDirectory = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)

//Setup static directory to serve
app.use(express.static(publicPathDirectory))

app.get('',(req,res)=> {
    res.render('index',{
        title:'Weather App',
        name:'Rathish'

    })
})

app.get('/aboutt',(req,res)=> {
    res.render('aboutt',{
        title:'About',
        name:'Rathish'
    })
})

app.get('/helpp',(req,res)=> {
    res.render('helpp',{
        helpText:'this is some helpful text',
        title:'Help',
        name:'Rathish'
    })
})

// app.get('',(req,res) => {
//     res.send('<h1>Hello express!</h1>')
// })

// app.get('/help',(req,res) => {
//     res.send({
//         name:'Rathish',
//         age:23
//     })
// })

// app.get('/test',(req,res) => {
//     res.send([{
//          name:'Rathish',
//          age:23
//     },
//     {
//        name:'Rakesh',
//        age:25
//     }x
// ])
// })

// app.get('/about',(req,res) => {
//     res.send('<h1>Title</h1>')
// })

app.get('/weather',(req,res) => {
    if (!req.query.address) {
        return res.send({
            error:"You must provide the address"
        })
    }
    geoCode(req.query.address,(error,{latitude,longitude,place}={}) => {
        if(error) {
            // return console.log(error)
            return res.send({
                error:error
            })
        }
        forecast(latitude,longitude,(error,forecastedData)=>{
            if(error){
                // return console.log(error)
                return res.send({
                    error:error
                })
            }
            // console.log(place)
            // console.log(forecastedData)
            res.send({
                forecast:forecastedData,
                location:place,
                address:req.query.address
            })
            })
    })

    // res.send({
    //     forecast:"100 degrees out ",
    //     location:'Ariyalur',
    //     address:req.query.address
    // })
})

app.get('/products',(req,res) => {
    if(!req.query.search) {
        return res.send({
            error:'You must provide the search term'
        })
    }
    // console.log(req.query.search)
    res.send({
        product:[]
    })
})

// app.get('/helpp/*',(req,res)=>{
//     res.send('help article not found')
// })

// app.get('*',(req,res)=>{
// res.send('404 not found')
// })

app.get('/helpp/*',(req,res)=> {
    res.render('404',{
        title:'404',
        name:'Rathish',
        errorMessageText:'Help Article not found'
    })
})
app.get('*',(req,res)=> {
    res.render('404',{
        title:'404',
        name:'Rathish',
        errorMessageText:'Page not found'
    })
})
app.listen(port,() => {
    console.log("Server is up" + port)
})

