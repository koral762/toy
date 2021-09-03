const fs = require('fs');
const gToys = require('../data/toy.json');
const utilService = require('./util.service')
const axios = require('axios')

const FILE_NAME = 'toy'

function query(filterBy) {
    // console.log("🚀 ~ file: toy.service.js ~ line 9 ~ query ~ filterBy", filterBy)
    // const toys = gToys;
    if (!gToys || !gToys.length) {
        const url =
            'http://www.filltext.com/?rows=20&_id=%7bindex%7d&name=%7blorem%7C2%7d&price=%7bnumber%7C100%7d&type=%5b%22Educational%22,%22Funny%22,%22Adult%22%5d&createdAt=%7bdate%7C1970,2000%7d&inStock=%7bbool%7d&pretty=true';
        return axios.get(url)
            .then((toys) => _amendToysData(toys.data))
            .then(() => _saveDataToFile())
    }
    if (filterBy.name) {
        const regex = new RegExp(filterBy.value, 'i')
        toys = gToys.filter(toy => regex.test(toy.name))
        if (!toys || !toys.length) return Promise.resolve(gToys); // maybe sendc an err and catch it to show no results on FE?
        return Promise.resolve(toys);
    }
    if (filterBy.type) {
        // if (filterBy.value === 'All') return Promise.resolve(gToys);
        const regex = new RegExp(filterBy.value, 'i')
        toys = gToys.filter(toy => {
            return regex.test(toy.type)
        })
        return Promise.resolve(toys);
    }
    if (filterBy.inStock) {
        // console.log("🚀 ~ file: toy.service.js ~ line 34 ~ query ~ filterBy.inStock", filterBy.value)
        if (filterBy.value === 'false') { //why string??
            return Promise.resolve(gToys)
        };
        toys = gToys.filter(toy => toy.inStock)
        return Promise.resolve(toys);
    }
    return Promise.resolve(gToys);
}

function getById(id) {
    const toy = gToys.find(toy => toy._id === id)
    return Promise.resolve(toy)
}

function save(toy) {
    let newToy
    if (toy._id) {
        //update toy
        console.log('toy in line 30 be service=', toy)
        // newToy = gToys.find(currToy => currToy._id === toy._id )
        const idx = gToys.findIndex(currToy => currToy._id === toy._id)
        gToys[idx] = toy
        console.log('gToys =', gToys)
        if (toy) {
            // console.log ('newToy =',newToy)
        } else {
            return Promise.reject('Not such toy')
        }
    } else {
        //create toy
        newToy = {
            _id: utilService.makeId(),
            name: toy.name,
            price: toy.price,
            type: toy.type,
            createdAt: Date.now(),
            inStock: toy.inStock
        }
        gToys.unshift(newToy)
    }
    return _saveDataToFile().then(() => {
        return newToy
    })
}

function remove(id) {
    const idx = gToys.findIndex(toy => toy._id === id)
    if (idx === -1) return Promise.reject('No Such Car')
    gToys.splice(idx, 1)
    return _saveDataToFile()
}

module.exports = {
    query,
    save,
    remove,
    getById
};

function _amendToysData(toys) {
    const modiToys = toys.map((toy) => {
        const time =
            Date.now() - utilService.getRandomInt(
                1000 * 60 * 60 * 24 * 365 * 5,
                1000 * 60 * 60 * 24 * 365 * 15
            );
        toy.createdAt = time;
        toy.isFavourite = Math.random() > .8 ? true : false
        toy._id = utilService.makeId()
        return toy;
    });
    return Promise.resolve(modiToys);
}

function _saveDataToFile() {
    return new Promise((resolve, reject) => {
        fs.writeFile(`data/toy.json`, JSON.stringify(gToys, null, 2), (err) => {
            if (err) {
                console.log(err);
                reject('Cannot write to file');
            } else {
                console.log('Wrote Successfully!');
                resolve();
            }
        });
    });
}