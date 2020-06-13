const express = require('express');
const categories = require('../models/categories/categories-model.js');
const products = require('../models/products/products-model.js');
const acl = require('../auth/middleware/acl-middleware.js');
const bearer_middleware = require('../auth/middleware/bearer-auth.js');
const router = express.Router();

//*************************(Routs Model)*************************\\


router.param('model', getModel);

function getModel(req, res, next) {
  const model = req.params.model; 
  switch (model) {
  case 'categories':
    req.model = categories;
    next();
    return;
  case 'products':
    req.model = products;
    next();
    return;
  default:
    next('invalid model');
    return;
  }
}



//*************************(Routs)*************************\\

router.get('/:model' , getHandler);

router.get('/:model/:id',  getByIdHandler);

router.post('/:model', bearer_middleware , acl('add'),postHandler);

router.put('/:model/:id', bearer_middleware ,acl('update'), updateByIdHandler);

router.patch('/:model/:id', bearer_middleware , acl('update') , patchByIdHandler);

router.delete('/:model/:id', bearer_middleware ,acl('remove'), deleteByIdHandler);

//********************(Routs Handlers)**********************\\


//========(get Handler)========\\

async function getHandler(req,res,next){
  try {
    const data = await req.model.get();
    const count = data.length;
    const result = data;
    res.json({count,result});
  } catch (error) {
    next(error.message);
  }

}




//========(get by id Handler)========\\

async function getByIdHandler(req,res,next){
  const id = req.params.id;
  try {
    const data = await req.model.get(id);
    res.json(data);
  } catch (error) {
    next(error.message);
  }
  
}



//========(post Handler)========\\

async function postHandler(req,res,next){
  try {
    const data = await req.model.create(req.body);
    res.json(data);
  } catch (error) {
    next(error.message);
  }

}



//========(update Handler)========\\

async function updateByIdHandler(req,res,next){
  const id = req.params.id;
  try {
    const data = await req.model.update(id,req.body);
    res.json(data);
  } catch (error) {
    next(error.message);
  }
    
}

//==========(patchByIdHandler)=======\\
async function patchByIdHandler (req,res,next){
  const id = req.params.id;
  try {
    const data = await req.model.update(id,req.body);
    res.json(data);
  } catch (error) {
    next(error.message);
  }
    
}


//========(delete by id  Handler)========\\

async function deleteByIdHandler(req,res,next){
  const id = req.params.id;
  try {
    await req.model.delete(id);
    res.json({});
  } catch (error) {
    next(error.message);
  }
}

module.exports = router;