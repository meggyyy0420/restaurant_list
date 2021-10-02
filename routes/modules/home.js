const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')
const restaurantList = require('../../models/seeds/restaurant.json')

router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(err => console.log(err))
})
router.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render('index', { restaurants, keyword });
})

// sorting routes
router.get('/:sort', (req, res) => {
  const selectedSort = req.params.sort
  const sortObj = {
    'new-old': { _id: 'desc' },
    'rating': { rating: 'desc' },
    'category': { category: 'asc' }
  }
  Restaurant.find()
    .lean()
    .sort(sortObj[selectedSort])
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})

module.exports = router