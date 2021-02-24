// const express = require('express');
// var router = express.Router();
// var ObjectId = require('mongoose').Types.ObjectId;
const mongoose = require('mongoose');

const Driver = mongoose.model('Driver');

module.exports.getDrivers = (req, res, next) => {
    Driver.find((err, drivers) => {
        if (!err) { res.send(drivers); }
        else {
            console.log('Error in Retrieving Drivers : ' + JSON.stringify(err, undefined, 2));
        }
    });
}

module.exports.getDriverByLang = (req, res, next) => {
    if (req.query.lang === 'All') {
        Driver.find((err, drivers) => {
            if (!err) { res.send(drivers); }
            else {
                console.log('Error in Retrieving Drivers : ' + JSON.stringify(err, undefined, 2));
            }
        });
    } else {
        Driver.find({ language: req.query.lang }, (err, driver) => {
            if (!err) {
                res.send(driver);
            }    
            else {
                console.log('Error in Retrieving Drivers : ' + JSON.stringify(err, undefined, 2));
            }
        });
    }
}

// router.get('/', (req, res) => {
//     Driver.find((err, docs) => {
//         if (!err) { res.send(docs); }
//         else {
//             console.log('Error in Retrieving Drivers : ' + JSON.stringify(err, undefined, 2));
//         }
//     });
// });

// router.get('/:id', (req, res) => {
//     if(!ObjectId.isValid(req.params.id)) {
//         return res.status(400).send(`No record with given id : ${req.params.id}`);
//     }
//     Driver.findById(req.params.id, (err, doc) => {
//         if (!err) { res.send(doc); }
//         else {
//             console.log('Error in Retrieving Drivers : ' + JSON.stringify(err, undefined, 2));
//         }
//     });
// });

// router.post('/', (req, res) => {
//     var driver = new Driver({
//         name: req.body.name,
//         price: req.body.price,
//         language: req.body.language
//     });
//     driver.save((err, doc) => {
//         if (!err) { res.send(doc); }
//         else {
//             console.log('Error in Saving Drivers : ' + JSON.stringify(err, undefined, 2));
//         } 
//     });
// });

// router.put('/:id', (req, res) => {
//     if(!ObjectId.isValid(req.params.id)) {
//         return res.status(400).send(`No record with given id : ${req.params.id}`);
//     }

//     var driver = {
//         name: req.body.name,
//         price: req.body.price,
//         language: req.body.language
//     };
//     Driver.findByIdAndUpdate(req.params.id, { $set: driver }, { new: true }, (err, doc) => {
//         if (!err) { res.send(doc); }
//         else {
//             console.log('Error in Updating Driver : ' + JSON.stringify(err, undefined, 2));
//         } 
//     });
// });

// router.delete('/:id', (req, res) => {
//     if(!ObjectId.isValid(req.params.id)) {
//         return res.status(400).send(`No record with given id : ${req.params.id}`);
//     }

//     Driver.findByIdAndRemove(req.params.id, (err, doc) => {
//         if (!err) { res.send(doc); }
//         else {
//             console.log('Error in Deleting Driver : ' + JSON.stringify(err, undefined, 2));
//         } 
//     });
// });

// module.exports.addDriver = (req, res, next) => {
// var driver = new Driver({
//         name: req.body.name,
//         price: req.body.price,
//         language: req.body.language
//     });
//     driver.save((err, doc) => {
//         if (!err) { res.send(doc); }
//         else {
//             console.log('Error in Saving Drivers : ' + JSON.stringify(err, undefined, 2));
//         } 
//     });
// }

// module.exports = router;