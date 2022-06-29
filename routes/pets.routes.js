const router = require('express').Router()
const PetModel = require('../models/Pet.model')
const {isAuthenticated} = require('../middlewares/jwt.middleware')
const mongoose  = require('mongoose');
const fileUploader = require("../config/cloudinary.config");
const Comment = require('../models/Comments.model');


// Get all the pets
router.get('/', async (req, res, next) => {
    const pets = await PetModel.find()
    res.json(pets)
  })


  // Get all user pets
router.get('/userpets', isAuthenticated, async (req, res, next) => {
  const pets = await PetModel.find()
  const userId = req.payload.id
  const filteredPets = pets.filter((elem) => {
    // console.log("Kat was here", elem.owner.toString(), userId)
    return (elem.owner.toString() == userId)
  })
  // console.log("Kat was here", filteredPets)
  res.json(filteredPets)
})

  
  // Get one specific pet
  router.get('/:petId', isAuthenticated, async (req, res, next) => {
    const { petId } = req.params
    // console.log(req.payload, 'Payload of user')
    const pet = await PetModel.findById(petId).populate('comments')
    // const petComments = pet.comments
    // await petComments.populate('author')
    console.log('populated pet', pet)
    res.status(200).json(pet)
    // res.json(pet)
  })


  //  POST /pets/create  -  Creates a new pet
router.post('/create', isAuthenticated, fileUploader.single("image"),  (req, res, next) => {
  console.log(req.payload, 'Payload of create pet part')
  const { name, type, age, description } = JSON.parse(req.body.values);
  // console.log({ name, type, age, description })
  let image = req.file.path
  PetModel.create({ name, type, age, description, image, owner: req.payload.id })
    .then(response => res.json(response))
    .catch(err => res.json(err));
});




  //  POST /pets/comments -  Creates a comment
  router.post('/:petId/comments', isAuthenticated,  async (req, res, next) => {
    // const { pet } = req.params
    const { comment } = req.body;
    console.log(req.body, req.payload)

    const response = await Comment.create({ comment, pet: req.params.petId, author: req.payload.username })
    await PetModel.findByIdAndUpdate(req.params.petId, { $push: { comments: response._id } })
    res.status(201).json("Comment created")
    
  });
  




// PUT  /pets/:id  -  Updates a specific pet by id
router.put('/:petId', (req, res, next) => {
  const { petId } = req.params;
 
  if (!mongoose.Types.ObjectId.isValid(petId)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
 
  PetModel.findByIdAndUpdate(petId, req.body, { new: true })
    .then((updatedPet) => res.json(updatedPet))
    .catch(error => res.json(error));
});




// DELETE  /pets/:petId  -  Delete a specific pet
router.delete('/:petId', (req, res, next) => {
  const { petId } = req.params;
  
  if (!mongoose.Types.ObjectId.isValid(petId)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
 
  PetModel.findByIdAndRemove(petId)
    .then(() => res.json({ message: `Pet profile ${petId} removed successfully.` }))
    .catch(error => res.json(error));
});




module.exports = router