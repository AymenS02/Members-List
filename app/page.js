"use client";
import { useState } from "react";

export default function Home() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("Paid");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/members", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, lastName, phone, paymentStatus }),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage(`✅ ${data.member.firstName} ${data.member.lastName} added as ${data.member.paymentStatus}`);
      setFirstName("");
      setLastName("");
      setPhone("");
      setPaymentStatus("Paid");
    } else {
      setMessage(`❌ ${data.error}`);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-white">Mosque Membership Form</h1>

      <p className="text-white m-2">Assalam Alykum Wa rahmutallah wa baraktuh!</p>

      <p className="text-white m-2">A message to all brothers! Please become a memeber asap if you havnt yet!</p>

      <p className="text-white m-2">How to become a member:</p>

      <p className="text-white m-2">Donate $50 to the masjid by card inorder to have proof of payment ($10 if you are currently a student)</p>

      <form onSubmit={handleSubmit} className="bg-black border border-white p-6 mt-4 rounded shadow-md w-80">
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="border p-2 w-full mb-4 rounded"
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="border p-2 w-full mb-4 rounded"
          required
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border p-2 w-full mb-4 rounded"
          required
        />

        <select
          value={paymentStatus}
          onChange={(e) => setPaymentStatus(e.target.value)}
          className="border p-2 w-full mb-4 rounded"
          required
        >
          <option value="Paid">Paid</option>
          <option value="Will Pay Soon">Will Pay Soon</option>
        </select>

        <button
          type="submit"
          className="bg-green-500 border border-black text-black py-2 px-4 rounded w-full hover:bg-green-600"
        >
          Submit
        </button>
      </form>

      {message && <p className="mt-4 text-lg">{message}</p>}
    </main>
  );
}
