const {Router} = require("express")
const router = Router()

const stores = [{
    id: 1,
    store: "Store A", 
    miles: 2
  },
  {
    id: 2,
    store: "Store B", 
    miles: 1
  },
  {
    id: 3,
    store: "Store C", 
    miles: 4
  },
  {
    id: 4,
    store: "Store D", 
    miles: 3
  },
  {
    id: 5,
    store: "Store E", 
    miles: 0.2
  },
  ]

   
  router.use((req, res, next)=>{
    if(req.session.user){
        next()
    }else{
        res.sendStatus(401)
    }
 })

  
  router.get("/", (req, res)=>{
    const {miles} = req.query
    const parsedMiles = parseInt(miles)
    if(!isNaN(parsedMiles)){
     const filteredStores= stores.filter((item)  => item.miles <= parsedMiles)
     res.send(filteredStores)
    }else{
    res.send(stores)
    }
    
  })
  
  module.exports = router