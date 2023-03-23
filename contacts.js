const fs = require("fs/promises");
const path = require("path");


const contactsPath = path.join(__dirname, '/db/contacts.json');

async function listContacts() {
    const contacts = await fs.readFile(contactsPath);
    const contactsAll = JSON.parse(contacts)
    console.table(contactsAll);
}

async function getContactById(contactId) {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  const contact = contacts.find((item) => item.id === contactId.toString());
  console.table(contact)
}

async function removeContact(contactId) {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const index = contacts.findIndex(item => item.id === contactId);
    if(index === -1){
        return null;
    }
    const [result] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  console.log(`Contact with id ${contactId} has been removed`);
  return result;
}



async function addContact( name, email, phone) {
  const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    const newContact = { id: Date.now(), name, email, phone };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
  console.log(`Contact with name ${JSON.stringify(name)} has been added`);
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};