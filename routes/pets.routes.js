const router = require('express').Router()
const PetModel = require('../models/Pet.model')



// Get all the pets
router.get('/', async (req, res, next) => {
    const pets = await PetModel.find()
    res.json(pets)
  })
  
  // Get one specific pet
  router.get('/:petId', async (req, res, next) => {
    const { petId } = req.params
  
    const pet = await PetModel.findById(petId)
    res.json(pet)
  })





module.exports = router