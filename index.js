import express from "express";
import bodyParser from "body-parser";
import nodemailer from 'nodemailer';
import path from "path";
import env from "dotenv";


const app = express();
const port = 3000;
env.config();




app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get("/", (req, res) => {
    res.render("index.ejs");
})

app.get("/about", (req, res) => {
  res.render("about.ejs");
})

app.get("/view", (req, res) => {
  res.render("view-image.ejs");
})

app.get("/contact", (req, res) => {
  res.render("contact.ejs" );
})


app.get("/blog", (req, res) => {
  res.render("blog.ejs");
})

app.get("/technologies", (req, res) => {
  res.render("technologies.ejs");
})

app.get("/certificates", (req, res) => {
  res.render("certificates.ejs");
})

app.get("/portfolio", (req, res) => {
  res.render("portfolio.ejs");
})


app.get('/technologies-partial', (req, res) => {
  const screenSize = parseInt(req.query.screenSize, 10);

  if (screenSize >= 1512) {
    res.render('partials/technologies-1512', { layout: false });
  } else if (screenSize >= 1280 && screenSize < 1511){
    res.render('partials/technologies-1280', { layout: false });
  }  else if (screenSize >= 843 && screenSize < 1280){
    res.render('partials/technologies-1024', { layout: false });
  }  else if (screenSize < 843){
    res.render('partials/technologies-842', { layout: false });
  } 
});

app.get('/certificates-partial', (req, res) => {
  const screenSize = parseInt(req.query.screenSize, 10);

  if (screenSize >= 1512) {
    res.render('partials/certificates-1512', { layout: false });
  } else if (screenSize >= 1280 && screenSize < 1511){
    res.render('partials/certificates-1280', { layout: false });
  }  else if (screenSize >= 843 && screenSize < 1280){
    res.render('partials/certificates-1024', { layout: false });
  }  else if (screenSize < 843){
    res.render('partials/certificates-842', { layout: false });
  } 
});

app.get('/contact-partial', (req, res) => {
  const screenSize = parseInt(req.query.screenSize, 10);

  if (screenSize >= 1512) {
    res.render('partials/contact-1512', { layout: false });
  } else if (screenSize >= 1280 && screenSize < 1511){
    res.render('partials/contact-1280', { layout: false });
  }  else if (screenSize >= 843 && screenSize < 1280){
    res.render('partials/contact-1024', { layout: false });
  }  else if (screenSize < 843){
    res.render('partials/contact-842', { layout: false });
  } 
});



app.get('/about-partial', (req, res) => {
  const screenSize = parseInt(req.query.screenSize, 10);

  if (screenSize >= 1512) {
    res.render('partials/about-1512', { layout: false });
  } else if (screenSize >= 1280 && screenSize < 1511){
    res.render('partials/about-1280', { layout: false });
  }  else if (screenSize >= 843 && screenSize < 1280){
    res.render('partials/about-1024', { layout: false });
  }  else if (screenSize < 843){
    res.render('partials/about-842', { layout: false });
  } 
});

app.get('/load-partial', (req, res) => {
    const screenSize = parseInt(req.query.screenSize, 10);
  
    if (screenSize >= 1512) {
      res.render('partials/index-1512', { layout: false });
    } else if (screenSize >= 1280 && screenSize < 1511){
      res.render('partials/index-1280', { layout: false });
    }  else if (screenSize >= 843 && screenSize < 1280){
      res.render('partials/index-1024', { layout: false });
    }  else if (screenSize < 843){
      res.render('partials/index-842', { layout: false });
    } 
  });
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });



  app.post('/send-email', async (req, res) => {
    const { name, email, message } = req.body;
   
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL, 
            pass: process.env.PASSWORD
        }
    });
 


  const mailOptions = {
    from: email,
    to: 'abodundeoluwaferanmi@gmail.com',
    subject: `Mail from ${name}`,
    text: `You have received a new message from your website contact form.\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`
};

transporter.sendMail(mailOptions, (error) => {
  if (error) {
      console.log('Error:', error);
      return res.render('fail.ejs');
  } else {
      return res.render('success.ejs'); // Show success card
  }
});
});

export default app;
