import * as React from 'react';
import { Form, useLoaderData, useNavigate } from 'react-router-dom';
import { getContact, deleteContact } from '../contacts';

export async function loader({ params }) {
  const contact = await getContact(params.contactId);
  return contact;
}

export default function Contact() {
  const contact = useLoaderData();
  const navigate = useNavigate();

  const handleDelete = async () => {
    await deleteContact(contact.id);
    navigate('/');
  };

  return (
    <div>
      <h1>Contact Details</h1>
      <div>
        <img src={contact.avatar} alt={`${contact.first} ${contact.last}`} style={{ width: "150px", height: "150px" }} />
        <h2>{contact.first} {contact.last}</h2>
        <p>{contact.twitter}</p>
        <p>{contact.notes}</p>
        <p>Phone: {contact.phone}</p>
        <p>Email: {contact.email}</p>
      </div>
      <Form method="post">
        <button type="submit" formAction={`/contacts/${contact.id}/edit`}>Edit</button>
        <button type="button" onClick={handleDelete} style={{ backgroundColor: "red", color: "white" }}>Delete</button>
      </Form>
    </div>
  );
}
