import * as React from 'react';
import { useLoaderData, Form } from 'react-router-dom';
import { getContact } from '../contacts';

export async function loader({ params }) {
  const contact = await getContact(params.contactId);
  if (!contact) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }
  return contact;
}

export default function Contact() {
  const contact = useLoaderData();

  return (
    <div id="contact">
      <div>
        <img src={contact.avatar} alt={`${contact.first} ${contact.last}`} />
        <div>
          <h2>{contact.first} {contact.last}</h2>
          <p>@{contact.twitter}</p>
          <p>{contact.notes}</p>
          <p>Phone: {contact.phone}</p>
          <p>Email: {contact.email}</p>
        </div>
      </div>
      <Form
        method="post"
        action="destroy"
        onSubmit={(event) => {
          if (!confirm("Please confirm you want to delete this record.")) {
            event.preventDefault();
          }
        }}
      >
        <button type="submit">Delete</button>
      </Form>
    </div>
  );
}
