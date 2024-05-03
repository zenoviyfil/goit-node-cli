import { program } from "commander";
import contacts from './contacts.js'

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const list = await contacts.listContacts()
      console.table(list)
      break;

    case "get":
      const get = await contacts.getContactById()
      console.log(get)
      break;

    case "add":
      const add = await contacts.addContact({name, email, phone})
      console.log(add)
      break;

    case "remove":
      const remove = await contacts.removeContact(id)
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
