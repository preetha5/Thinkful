'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');

const expect = chai.expect;
const {Restaurant} = require('../models');
const { app, runServer, closeServer } = require('../server');
const {TEST_DATABASE_URL} = require('../config');

chai.use(chaiHttp);

function generateBoroughName(){
    const boroughs = ['Manhattan', 'Queens', 'Brooklyn', 'Bronx', 'Staten Island'];
    return boroughs[Math.floor(Math.random() * boroughs.length)];

}

function generateCuisineType(){
    const cuisines = ['Italian', 'Thai', 'Colombian'];
    return cuisines[Math.floor(Math.random() * cuisines.length)];
}

function generateGrade(){
    const grades = ['A', 'B', 'C', 'D', 'F'];
    const grade = grades[Math.floor(Math.random() * grades.length)];
    return {
        date: faker.date.past(),
        grade: grade
    };
}

//generate sample restaurant data object
function generateRestaurantData(){
    return {
        name: faker.company.companyName(),
        borough: generateBoroughName(),
        cuisine: generateCuisineType(),
        address:{
            building: faker.address.streetAddress(),
            street: faker.address.streetName(),
            zipcode: faker.address.zipCode()
        },
        grades: [generateGrade(), generateGrade(), generateGrade()]
    };
}

//Seed database with 10 fake restaurant info
function seedRestaurantData(){
    console.info("seeding restaurant db with 10 objects");
    const seedData = [];
    for (let i=1; i<=10; i++){
        seedData.push(generateRestaurantData());
    }
    return Restaurant.insertMany(seedData);

}

//teardown DB
function tearDownDb(){
    console.warn("Deleting database...");
    return mongoose.connection.dropDatabase();
}

describe("Restaurants API CRUD tests", function(){
    before(function(){
        return runServer(TEST_DATABASE_URL);
    });

    beforeEach(function(){
        return seedRestaurantData();
    });

    afterEach(function(){
        return tearDownDb();
    });

    after(function(){
        return closeServer();
    });

    describe("GET endpoint test", function(){
        it('should return all existing restaurants in db', function(){
            let res;
            return chai.request(app)
                .get('/restaurants')
                .then(function(_res){
                    res = _res;
                    expect(res).to.have.status(200);
                    expect(res.body.restaurants).to.have.length.of.at.least(1);
                    return Restaurant.count();
                })
                .then(function(count){
                    expect(res.body.restaurants).to.have.length.of(count);
                });
        });

        it('should return restaurants with the right fields', function(){
            let resRestaurant;
            return chai.request(app)
                .get('/restaurants')
                .then(function(res){
                    expect(res).to.have.status(200);
                    expect(res).to.be.json;
                    expect(res.body.restaurants).to.be.a('array');
                    expect(res.body.restaurants).to.have.length.of.at.least(1);

                    res.body.restaurants.forEach(function(restaurant){
                        expect(restaurant).to.be.a('object');
                        expect(restaurant).to.include.keys(
                            ['id', 'name', 'borough', 'cuisine', 'address', 'grade']);
                        });
                        resRestaurant = res.body.restaurants[0];
                        return Restaurant.findById(resRestaurant.id);
                })
                .then(function(restaurantDb){
                    expect(resRestaurant.id).to.equal(restaurantDb.id);
                    expect(resRestaurant.name).to.equal(restaurantDb.name);
                    expect(resRestaurant.borough).to.equal(restaurantDb.borough);
                    expect(resRestaurant.cuisine).to.equal(restaurantDb.cuisine);
                    expect(resRestaurant.address).to.contain(restaurantDb.address.building);
                    expect(resRestaurant.grade).to.equal(restaurantDb.grade);
                });
        })
    });

    describe("POST endpoints test", function(){
        it('should add the new restaurant to the DB', function(){
            const newRestaurant = generateRestaurantData();
            let mostRecentGrade;

            return chai.request(app)
                .post('/restaurants')
                .send(newRestaurant)
                .then(function(res){
                    expect(res).to.have.status(201);
                    expect(res).to.be.json;
                    expect(res.body).to.be.a('object');
                    expect(res.body).to.include.keys(
                        ['id', 'name', 'borough', 'cuisine', 'address', 'grade']);
                    expect(res.body.name).to.equal(newRestaurant.name);
                    expect(res.body.id).to.not.be.null;
                    expect(res.body.borough).to.equal(newRestaurant.borough);
                    expect(res.body.cuisine).to.equal(newRestaurant.cuisine);
                    
                    mostRecentGrade = newRestaurant.grades.sort(
                        (a,b) => b.date - a.date)[0].grade;
                    expect(res.body.grade).to.be.equal(mostRecentGrade);
                    return Restaurant.findById(res.body.id);    
                })
                .then(function(restaurantDb){
                    expect(restaurantDb.name).to.equal(newRestaurant.name);
                    expect(restaurantDb.cuisine).to.equal(newRestaurant.cuisine);
                    expect(restaurantDb.borough).to.equal(newRestaurant.borough);
                    expect(restaurantDb.grade).to.equal(mostRecentGrade);
                    expect(restaurantDb.address.building).to.equal(newRestaurant.address.building);
                    expect(restaurantDb.address.street).to.equal(newRestaurant.address.street);
                    expect(restaurantDb.address.zipcode).to.equal(newRestaurant.address.zipcode);
                });
            });
        }); //end describe posts  
    describe('PUT Endpoint tests' , function(){
        it('should update fields you send over', function(){
            const updateData = {
                name: 'fofofofofofofof',
                cuisine: 'futuristic fusion'
              };
            return Restaurant
              .findOne()
              .then(function(restaurant){
                  updateData.id = restaurant.id;
                  return chai.request(app)
                    .put(`/restaurants/${restaurant.id}`)
                    .send(updateData);
              })
              .then(function(res){
                  expect(res).to.have.status(204);
                  return Restaurant.findById(updateData.id);
              })
              .then(function(restaurantDb){
                  expect(restaurantDb.name).to.equal(updateData.name);
                  expect(restaurantDb.cuisine).to.equal(updateData.cuisine);
              });
        });
    }); //end describe put tests 
    
    describe('DELETE endpoint tests', function(){
        it('should delete a restaurant by id', function(){
            let delRestaurant;
            return Restaurant
                .findOne()
                .then(function(_restaurant){
                    delRestaurant = _restaurant;
                    return chai.request(app)
                        .delete(`/restaurants/${delRestaurant.id}`);
                })
                .then(function(res){
                    expect(res).to.have.status(204);
                    return Restaurant.findById(delRestaurant.id);
                })
                .then(function(res){
                    expect(res).to.be.null;
                });
        });
    }); //End describe Delete tests
        
});//end describe CRUD tests
