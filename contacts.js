const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.resolve(__dirname, "./db/contacts.json");

async function readContacts() {
  try {
    const contacts = await fs.readFile(contactsPath);
    return JSON.parse(contacts);
  } catch (error) {
    console.log(error.message);
  }
}

async function writeContacts(contacts) {
  try {
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
  } catch (error) {
    console.log(error.message);
  }
}

async function listContacts() {
  const contacts = await readContacts();
  console.table(contacts);
}

async function getContactById(contactId) {
  const contacts = await readContacts();
  const contact = contacts.find((contact) => contact.id === contactId);
  console.table(contact);
}

async function removeContact(contactId) {
  let contacts = await readContacts();
  const updatedContacts = contacts.filter(
    (contact) => contact.id !== contactId.toString()
  );
  writeContacts(updatedContacts);
}

async function addContact(name, email, phone) {
  const newContact = {
    id: nanoid(),
    name: name,
    email: email,
    phone: phone,
  };
  let contacts = await readContacts();
  contacts.push(newContact);
  writeContacts(contacts);
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
