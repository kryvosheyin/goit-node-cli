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

/**
 * This function invokes the specified action with the given options.
 * It takes an object with an action property and any other action-specific options.
 * It uses a switch to determine which action to take.
 * If the action is successful, it logs the result to the console.
 * If the action fails, it logs the error message to the console.
 * If the action is unknown, it logs a warning to the console.
 *
 * @param {Object} options - An object with an action property and any other action-specific options.
 * @param {string} options.action - The action to take. One of "list", "get", "add", or "remove".
 * @param {string} [options.id] - The id of the contact to get or remove. Required for "get" and "remove".
 * @param {Object} [options.data] - An object with the name, email, and phone of the contact to add. Required for "add".
 */
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
