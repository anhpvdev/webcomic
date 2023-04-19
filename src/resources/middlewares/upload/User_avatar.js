const multer = require("multer")
    
const usertorage = multer.diskStorage({
  destination:(req,file,res)=>{
      res(null,'./src/public/image/avatar')
  },
  filename:(req,file,res)=>{
    let filename = req.body.userid+".png"
    res(null,filename)
  }
})
const userupload =multer({storage:usertorage})
    



module.exports = userupload