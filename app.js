// views/index.handlebars
const express = require('express');
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const app = express();
const port = 3000;

const Restaurant = require('./models/restaurant')

mongoose.connect('mongodb://localhost/restaurant-list')
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})


const restaurantList = require('./models/seeds/restaurant.json')

// // setting template engine
// app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
// app.set('view engine', 'handlebars')

// app.use(express.static('public'))

// // routes setting
// app.get('/', (req, res) => {
//   res.render('index', { restaurants: restaurantList.results })
// })

// app.get('/search', (req, res) => {
//   const keyword = req.query.keyword
//   const restaurants = restaurantList.results.filter(restaurant => {
//     return restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.toLowerCase().includes(keyword.toLowerCase())
//   })
//   res.render('index', { restaurants: restaurants, keyword: keyword });
// })

// app.get('/restaurants/:restaurant_id', (req, res) => {
//   const restaurant = restaurantList.results.filter(restaurant => restaurant.id === Number(req.params.restaurant_id))
//   res.render('show', { restaurant: restaurant[0] })
// })

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})
