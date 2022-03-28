const patient_info_repository = require('../repositories/patient_info_repository.js')
const bcrypt = require('bcrypt');


//const validator = require('validator');


function generatePlainTextPasswordList(passwordPatient) {

  var plain_text_password_list = new Array();

  for (let i = 0; i < passwordPatient.length; i++) {

    var stringPassword = (passwordPatient[i].arrival_date + '' + passwordPatient[i].arrival_time + '' + passwordPatient[i].birth_month + '' + passwordPatient[i].birth_year);
    plain_text_password_list.push(stringPassword);
  }
  return plain_text_password_list;
}

async function generatePasswordList(plain_text_password_list) {
  hashed_password_list = new Array();
  const saltRounds = 10;

  for (let i = 0; i < plain_text_password_list.length; i++) {
      var hashedPassword = await bcrypt.hash(plain_text_password_list[i], saltRounds);
      hashed_password_list.push(hashedPassword);
  }

  return hashed_password_list;
}



// function generatePasswordList(plain_text_password_list) {

//   //console.log("hashed password list before");

//   hashed_password_list = new Array();

//   for (let i = 0; i < plain_text_password_list.length; i++) {

//     console.log(plain_text_password_list[i]);

//     var hashedPassword = bcrypt.hash(plain_text_password_list[i], saltRounds, (err, hash) => { });
//     console.log(`HASHED PASSWORD: ${hashedPassword}`);
//     hashed_password_list.push(hashedPassword);

//   }

//   console.log("hashed password list after");

//   return hashed_password_list;
// }

// need to improve this time to hash
// String.prototype.hashCode = function () {
//   var hash = 0, i, chr;
//   if (this.length === 0) return hash;
//   for (i = 0; i < this.length; i++) {
//     chr = this.charCodeAt(i);
//     hash = ((hash << 5) - hash) + chr;
//     hash |= 0; // Convert to 32bit integer
//   }
//   return hash;
// };

function generateIdList(passwordPatient) {

  var id_list = new Array();

  for (let i = 0; i < passwordPatient.length; i++) {
    var id = Math.trunc(passwordPatient[i]._id);
    id_list.push(id);
  }

  return id_list;
}


module.exports = {
  generatePlainTextPasswordList,
  generatePasswordList,
  generateIdList
}