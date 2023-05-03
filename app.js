const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const path = require('path');
const { options } = require('joi');
const { response } = require('express');

const app = express();
 
const port = process.env.PORT || 6600;
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,'public')));
// signup route
app.post('/signup', (req,res) => {
    const { firstName, lastName, email, adres, phnumber} = req.body;
// make sure fields are filled
    if(!firstName || !lastName || !email || !adres || !phnumber){
        res.redirect('/fail.html')
        return
    }
// construct req data
const data = {
    members: [
        {
            email_address : email,
            status : 'subscribed',
            merge_fields:{
                FNAME:firstName,
                LNAME:lastName,
                ADDRESS: adres,
                PHONE: phnumber
            }
        }
    ]
}

const postData = JSON.stringify(data)
    const options = {
        url : 'https://us12.api.mailchimp.com/3.0/lists/b964e35009',
        method: 'post',
        headers :{
            Authorization : 'auth b5840fdecbac7128c39d33bce7a8ef27-us12'
        },
        body: postData
        // url : 'b5840fdecbac7128c39d33bce7a8ef27-us12'
    }

    request(options, (err, response,body) => {
        if(err) {
            res.redirect('/fail.html');
        } else{
            if(response.statusCode ===  200){
                console.log(response.statusCode)
                console.log("Your email is",email,'\n',"Your FirstName is", firstName, '\n'," Your LastName is",lastName);
                res.redirect('/success.html');
            } else{
                console.log(response.statusCode)
                res.redirect('/fail.html');
            }
            
        }
    })
})







app.listen(port, () => {
    console.log(`server started on ${port}`)
})
