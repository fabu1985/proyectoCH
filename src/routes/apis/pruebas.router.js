const { Router } = require('express');
const router = Router();

router.get('/:palabra([a-zA-Z]+)', (req,res)=>{
  res.send(req.params.palabra)
})

module.exports = router