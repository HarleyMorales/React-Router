import { useLoaderData } from "react-router-dom";
import { getContact } from "../contacts";

// Loader to fetch individual contact details
export async function loader({ params }) {
  const contact = await getContact(params.contactId);
  return { contact };
}

export default function Contact() {
  const { contact } = useLoaderData();
  return (
    <div>
      <h2>Contact Details</h2>
      <p>Name: {contact.first} {contact.last}</p>
      <p>Phone: {contact.phone}</p>
      <p>Email: {contact.email}</p>
      {/* Add more contact details as needed */}
    </div>
  );
}
