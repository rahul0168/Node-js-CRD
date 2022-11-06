const express = require("express");
const path = require('path');
const { urlencoded } = require("express");
const port = 8000;
const db = require('./config/mongoose');
const Contact = require('./models/contact');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));
// app.use(function(req, res, next){
//   console.log('middleware 1 called');
//   });
 
//  app.use(function(req, res, next){    
//       console.log('middleware 2 called');
//       next();
//  });
 
//  app.use(function(req, res, next){    
//       console.log('middleware 3 called');
//       next();
//  });
var contactList = [
  {
    name:"Rahul",
    phone:"98765544"
  },
  {
    name:"Tony stark",
    phone:"944765544"
  },
  {
    name:"steven rogers",
    phone:"8765443344"
  },
]

// app.get('/', function (req, res) {
//   return res.render('home',{
//     title:"Home page",
//     contact_list:contactList
//   });
// });
app.get('/', function(req, res){


  Contact.find({}, function(err, contacts){
      if(err){
          console.log("error in fetching contacts from db");
          return;
      }
      return res.render('home',{
          title: "Contact List",
          contact_list: contacts
      });

  })

})

app.get('/delete-contact/', function(req, res){
  console.log(req.query);
  let id = req.query.id

  Contact.findOneAndDelete(id, function(err){
      if(err){
          console.log('error in deleting the object');
          return;
      }
      return res.redirect('back');
  })
});
// app.get('/delete-contact/:phone',function(req,res){
//  console.log(req.query.phone);
//  console.log(req.query.name);
//  let phone = req.params.phone; 
//  let contactIndex = contactList.findIndex(contact => contact.phone == phone);
//  if(contactIndex != -1){
//   contactList.splice(contactIndex,1);
//  }
//  return res.redirect('/');

// });




app.get('/play', function (req, res) {
  return res.render('pratice',{title:"pratice page"});
});

app.post('/create-contact', function (req, res) {

  //contactList.push(req.body)
 // console.log(req.body);
 Contact.create({
  name:req.body.name,
  phone:req.body.phone
 },function(err,newContact){
if(err){
  console.log('error in creating');
  return;
}
console.log('*****',newContact);
return res.redirect('/');
 });
});








app.listen(port, function (err) {
  if (err) {
    console.log('error is runing', err);
  }

  console.log('my express server', port);
});