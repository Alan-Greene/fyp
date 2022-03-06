const patient_info_repository = require('../repositories/patient_info_repository.js')

//const validator = require('validator');


function generatePasswordList(passwordPatient) {

    var password_list = new Array();

    console.log("password list before");

    for (let i = 0; i < passwordPatient.length; i++) {

            var stringPassword = (passwordPatient[i].arrival_date + ' ' + passwordPatient[i].arrival_time + ' ' + passwordPatient[i].birth_month + ' ' + passwordPatient[i].birth_year);
            var hashedPassword = stringPassword.hashCode();
            password_list.push(hashedPassword);

    }
    console.log("password list after");
    return password_list;
}


String.prototype.hashCode = function() {
    var hash = 0, i, chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
      chr   = this.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  };

function generateIdList(passwordPatient) {

    var id_list = new Array();

    console.log("id_list before");

    for (let i = 0; i < passwordPatient.length; i++) {
            var id = Math.trunc(passwordPatient[i]._id);
            id_list.push(id);
    }

    return id_list;
}


module.exports = {
    generatePasswordList,
    generateIdList
}