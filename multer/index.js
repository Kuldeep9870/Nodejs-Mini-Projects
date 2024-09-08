import express from 'express';
import path from 'path';
import multer from 'multer';

const port =8000;
const app = express();


app.set('view engine', 'ejs');
app.set('views',path.resolve('./views'));

app.use(express.urlencoded({extended:false}));
app.use(express.json());

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`);
    }
  })
  
  const upload = multer({ storage: storage })

app.get('/',(req,res)=>{
    return res.render("homepage");
})

app.post('/upload',upload.single('profileImage'),(req,res)=>{
    console.log(req.body);

    console.log(req.file);


    return res.redirect("/");
})

app.listen(port ,()=>{
    console.log(`Server is running on port- ${port}`);
})