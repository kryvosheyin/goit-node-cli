import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("src", "database", "contacts.json");

const updateContacts = async (contacts) => {
  await writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

/**
 * Get the list of all contacts
 * @returns {Array<Object>} An array of contact objects
 */
export async function listContacts() {
  const data = await readFile(contactsPath);
  return JSON.parse(data);
}

/**
 * Get a contact by id
 * @param {string} contactId - The ID of the contact to find
 * @returns {Object|null} The contact object if found, or null if not found
 */
export async function getContactById(contactId) {
  const contacts = await listContacts();
  return contacts.find((contact) => contact.id === contactId) || null;
}

export async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) return null;
  const [removedContact] = contacts.splice(index, 1);
  await updateContacts(contacts);
  return removedContact;
}

export async function addContact(contactData) {
  const contacts = await listContacts();
  const newContact = { ...contactData, id: nanoid() };
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
}
