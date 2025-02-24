import {
  listContacts,
  getContactById,
  addContact,
  removeContact,
} from "./contacts.js";

import { program } from "commander";
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

async function invokeAction({ action, id, ...data }) {
  try {
    switch (action) {
      case "list":
        const contacts = await listContacts();
        return console.table(contacts);

      case "get":
        const contact = await getContactById(id);
        return contact
          ? console.log(contact)
          : console.log(`Contact with id ${id} was not found`);

      case "add":
        const newContact = await addContact(data);
        return console.log(newContact);

      case "remove":
        const contactToDelete = await removeContact(id);
        return console.log(contactToDelete);

      default:
        console.warn("\x1B[31m Unknown action type!");
    }
  } catch (error) {
    console.error("An error occurred: ", error.message);
  }
}

invokeAction(options);
