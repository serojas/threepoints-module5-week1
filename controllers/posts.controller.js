const data = require('../config/data.config')
const Validator = require('jsonschema').Validator;
const v = new Validator();


const phoneSchema = {
   "id": "/Phone",
   "type": "object",
   "properties": {
     "personal": {"type": "string"},
     "work": {"type": "string"},
     "ext": {"type": "string"}
   },
   "required": ["personal"]
};

const favoritesSchema = {
    "id": "/Favorites",
    "type": "object",
    "properties": {
      "food": {"type": "string"},
      "artist": {"type": "string"},
    },
    "required": ["food", "artist"]
};


const pointSchema = {
    "id": "/Point",
    "type": "object",
    "properties": {
      "points": {"type": "number"},
      "bonus": {"type": "number"},
    },
    "required": ["points", "bonus"]
};

const schema = {
    "id": "/Employee",
    "type": "object",
    "properties": {
      "name": {"type": "string"},
      "age": {"type": "number"},
      "phone": {"$ref": "/Phone"},
      "privileges": {"type": "string"},
      "favorites": {"$ref": "/Favorites"},
      "finished": {
        "type": "array",
        "items": {"type": "number"}
      },
      "badges": {
        "type": "array",
        "items": {"type": "string"}
      },
      "points": {
        "type": "array",
        "items": {"$ref": "/Point"}
      },
    }
};

v.addSchema(phoneSchema, '/Phone');
v.addSchema(favoritesSchema, '/Favorites');
v.addSchema(pointSchema, '/Point');

module.exports.addEmployee = (req, res, next) => {
    console.log('Req Body>>', req.body)
    if(v.validate(req.body, schema)){
        data.push(req.body);
        res.status(201).json(data);
    }else{
        res.status(400).json({"code": "bad_request"});
    }
}
