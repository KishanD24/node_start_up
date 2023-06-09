// import required essentials
const express = require('express');
// create new router
const router = express.Router();
// create a JSON data array
let data = [
    { user_id: 1, user_name: 'Kishan',  user_pass: '1231234', user_email:'kishan@gmail.com',user_contact:'7202894410'},
    { user_id: 2, user_name: 'vivek',  user_pass: '1231234', user_email:'vivek@gmail.com',user_contact:'9904472665'},
];

// HTTP methods ↓↓ starts here.

// READ
// this api end-point of an API returns JSON data array
router.get('/user_list', function (req, res) {
    res.status(200).json(data);
});

// READ
// this api end-point returns an object from a data array find by id
// we get `id` from URL end-points
router.get('/:id', function (req, res) {
    // find an object from `data` array match by `id`
    let found = data.find(function (item) {
        return item.id === parseInt(req.params.id);
    });
    // if object found return an object else return 404 not-found
    if (found) {
        res.status(200).json(found);
    } else {
        res.sendStatus(404);
    }
});

// CREATE
// this api end-point add new object to item list
// that is add new object to `data` array
router.post('/register', function (req, res) {
    // get itemIds from data array
    let itemIds = data.map(item => item.user_id);
    

    // create new id (basically +1 of last item object)
    let newId = itemIds.length > 0 ? Math.max.apply(Math, itemIds) + 1 : 1;
    // create new order number (basically +1 of last item object)
    

    // create an object of new Item
    let newUser={ 
        user_id: newId,
        user_name: req.body.user_name,
        user_pass: req.body.user_pass,
        user_email:req.body.user_email,
        user_contact:req.body.user_contact
        };
    // push new item object to data array of items
    data.push(newUser);

    // return with status 201
    // 201 means Created. The request has been fulfilled and 
    // has resulted in one or more new resources being created. 
    res.status(201).json(newUser);
});


// Login user api
// this api end-point retrun login user details
router.post('/login', function (req, res) {
    var x;
     // find an object from `data` array match by `id`
     let found = data.find(function (item) {
        x=item.user_pass;
        return item.user_email === req.body.user_email;
    });
    // if object found return an object else return 404 not-found
    let userId=req.body.user_email;
    let userPass=req.body.user_pass;
    

    if(found){
        if(userPass==x){
            // return with status 201
               // 201 means Created. The request has been fulfilled and 
               // has resulted in one or more new resources being created. 
               res.status(201).json(x);
               }else{
                   res.status(201).json({
                       "message":"sacho password nakho"
                   });  
               }
    }else{
        res.status(201).json({
            "message":"wrong email value"
        });     
    }

   
   

   
});

// UPDATE
// this api end-point update an existing item object
// for that we get `id` and `title` from api end-point of item to update
router.put('/:id', function (req, res) {
    // get item object match by `id`
    let found = data.find(function (item) {
        return item.id === parseInt(req.params.id);
    });

    // check if item found
    if (found) {
        let updated = {
            id: found.id,
            title: req.body.title, // set value of `title` get from req
            order: req.body.order, // set value of `order` get from req
            completed: req.body.completed // set value of `completed` get from req
        };

        // find index of found object from array of data
        let targetIndex = data.indexOf(found);

        // replace object from data list with `updated` object
        data.splice(targetIndex, 1, updated);

        // return with status 204
        // success status response code 204 indicates
        // that the request has succeeded
        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
});

// DELETE
// this api end-point delete an existing item object from
// array of data, match by `id` find item and then delete
router.delete('/:id', function (req, res) {
    // find item from array of data
    let found = data.find(function (item) {
        return item.id === parseInt(req.params.id);
    });

    if (found) {
        // if item found then find index at which the item is
        // stored in the `data` array
        let targetIndex = data.indexOf(found);

        // splice means delete item from `data` array using index
        data.splice(targetIndex, 1);
    }

    // return with status 204
    // success status response code 204 indicates
    // that the request has succeeded
    res.sendStatus(204);
});

// module.exports is an object included in every JS file of Node.js
// application, whatever we assign to module.exports will be exposed as a module. 
module.exports = router;