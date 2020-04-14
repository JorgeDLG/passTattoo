/* INSTRUCCIONES
 * ****1- Comprobar si hay db, si no hay init db.
 * 2- Ofrecer MENU 
 *    * MENU Info Interfaz y lista users
 *    * Opciones:(probar pass [list user], añadir pass, borrar pass)
 * */

const fs = require('fs');
const prompt = require('prompt-sync')();

//MAIN
var credentials = initTask();
var exit = false;

while (!exit) {
  var option = Menu();
  //showCreds();

  switch (Number(option)) {
    case 0: //test
      console.log("Select one to test:"); 
      test();
      break;
    case 1: //add
      console.log("In case 1"); 
      break;
    case 2: //delete
      console.log("In case 2"); 
      break;
    case 3: //wipe all
      console.log("In case 3"); 
      break;
    case 4:
      console.log("Exiting"); 
      exit = true;
      break;
    default:
      console.log("Invalid Selection");
      exit = true;
  }
}

//FUNCIONES
function credsSelector() {
  let i = 0;
  console.log("## CREDENTIALS ##");
  credentials.credents.forEach(cred => {
    console.log(i + ': ', cred.user);
    i++;
  });
  let cred = prompt("Choose: ");

  if(cred < 0 || cred > i) {
    console.log("Credential not found");
  } else{
    return cred;
  }
}
function test() {
  credsSelector();

  
}
function Menu() {
  var input;
  console.log("## OPTIONS ##");
  console.log("0 - TEST");
  console.log("1 - ADD");
  console.log("2 - DELETE");
  console.log("3 - WIPE ALL");
  console.log("4 - EXIT");

  var input = prompt("Choose: ");
  return input;
}

function initTask() {

  var credents;
  try {
    if (fs.existsSync('./db.json')) {

      console.log('db.json exists.');
      credents = fs.readFileSync('./db.json', 'utf-8');
      credents = JSON.parse(credents);

    } else {

      console.log('db.json dont\'t exists. Initing it');
      credents = {
        credents: [{
          user: "foo",
          pass: "bar"
        }]
      };

      fs.appendFileSync("./db.json", JSON.stringify(credents));
      console.log('db.txt created.');
    }
  } catch (e) {
    console.log("Error:\n " + e);
  }
  return credents;
}
