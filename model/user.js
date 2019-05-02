var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  userID: String,
  Password: String,
  firstName: String,
  lastName: String,
  email: String,
  Address1: String,
  Address2: String,
  City: String,
  State: String,
  Zipcode: String,
  Country: String
},{collection: 'users'});

module.exports=mongoose.model('userModel',userSchema);






/*class user {

  constructor(userID, firstName, lastName, email, Address1, Address2, City, State, Zipcode, Country) {
        this.userID = userID;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.Address1 = Address1;
        this.Address2 = Address2;
        this.City = City;
        this.State = State;
        this.Zipcode = Zipcode;
        this.Country = Country;
    }

    get userID() {
        return this._userID;
    }

    set userID(value) {
        this._userID = value;
    }

    get firstName() {
        return this._firstName;
    }

    set firstName(value) {
        this._firstName = value;
    }

    get lastName() {
        return this._lastName;
    }

    set lastName(value) {
        this._lastName = value;
    }

    get email() {
        return this._email;
    }

    set email(value) {
        this._email = value;
    }

    get Address1() {
        return this._Address1;
    }

    set Address1(value) {
        this._Address1 = value;
    }

    get Address2() {
        return this._Address2;
    }

    set Address2(value) {
        this._Address2 = value;
    }

    get City() {
        return this._City;
    }

    set City(value) {
        this._City = value;
    }

    get State() {
        return this._State;
    }

    set State(value) {
        this._State = value;
    }

    get Zipcode() {
        return this._Zipcode;
    }

    set Zipcode(value) {
        this._Zipcode = value;
    }

    get Country() {
        return this._Country;
    }

    set Country(value) {
        this._Country = value;
    }

}

module.exports = user;
*/
