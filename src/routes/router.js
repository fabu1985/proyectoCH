const { Router } = require('express');
const jwt = require('jsonwebtoken');
const { logger } = require('../utils/logger');

class RouterCustom {
  constructor(){
    this.router = Router()
    this.init()
  }

  getRouter(){
    return this.router
  }

  init(){}

  generateCustomResponses = ( req, res, next ) => {
    res.sendSuccess = payload => res.send({status: 'success', payload})
    res.sendServerError = error => res.status(500).send({status: 'error', error})
    res.sendUserError = error => res.status(400).send({status: 'error', error})
    next()
  }

  // este es un metodo para ejecutar los callbacks [ middleware, (Req,res) => {}]
  applyCallbacks(callbacksArray){
    return callbacksArray.map(callback => async (...params) => {
      try {
        await callback.apply(this, params)
      } catch(error) {
        logger.error(error)
        params[1].status(500).send(error) // este es el response
      }
    })
  }
  //policies es un array ['PUBLIC', 'USER', 'USER_PREMIUM', 'ADMIN']
  handlePolicies = policies => ( req, res, next ) => {
    if(policies[0] == 'user') return next()
    const authHeaders = req.headers.Authorization // Bearer tokenasdasdje
    if(!authHeaders) return res.status(401).send({status: 'error', error: 'Unauthorized'})
    const token = authHeaders.split('')[1]
    let user = jwt.verify(token, 'CoderSecretoJesonWebToken')
    if(!policies.includes(user.normalize.toUpperCase())) return res.status(403).send({status: 'error', error: 'not permissions'})
    req.user = user
    next()
  }

  get(path, policies, ...callbacksArray){
    this.router.get(path, this.handlePolicies(policies), this.generateCustomResponses, this.applyCallbacks(callbacksArray))
  }
  post(path, policies, ...callbacksArray){
    this.router.post(path, this.handlePolicies(policies), this.generateCustomResponses, this.applyCallbacks(callbacksArray))
  }
  put(path, policies, ...callbacksArray){
    this.router.put(path, this.handlePolicies(policies), this.generateCustomResponses, this.applyCallbacks(callbacksArray))
  }
  delete(path, policies, ...callbacksArray){
    this.router.delete(path, this.handlePolicies(policies), this.generateCustomResponses, this.applyCallbacks(callbacksArray))
  }
}

module.exports = RouterCustom