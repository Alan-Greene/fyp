//const patient_info_repository = require('../repositories/patient_info_repository.js')
const bcrypt = require('bcrypt');

function generatePlainTextPasswordList(passwordPatient) {

  var plain_text_password_list = new Array();

  for (let i = 0; i < passwordPatient.length; i++) {
    //Crete a plaintext password from patient data that will be hased, salted and stored in the database
    var stringPassword = (passwordPatient[i].arrival_date + '' + passwordPatient[i].arrival_time + '' + passwordPatient[i].birth_month + '' + passwordPatient[i].birth_year);
    //Add the plain text password to a list which will be used by the hashing function generatePasswordList(plain_text_password_list)
    plain_text_password_list.push(stringPassword);
  }
  return plain_text_password_list;
}

async function generatePasswordList(plain_text_password_list) {
  hashed_password_list = new Array();
  const saltRounds = 10;
  var search = '/';
  var replaceWith = '1';

  for (let i = 0; i < plain_text_password_list.length; i++) {
      //Use the bcrypt library to generate a hashed password from the plain text password
      var hashedPassword = await bcrypt.hash(plain_text_password_list[i], saltRounds);

      //Remove any occurances of / in the password to allow for url querying
      var hashedPasswordReplace = hashedPassword.split(search).join(replaceWith);

      //Add the password to the password list
      hashed_password_list.push(hashedPasswordReplace);
  }

  return hashed_password_list;
}

//Function generates a list of patient IDs to be used in conjunction with the password list
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