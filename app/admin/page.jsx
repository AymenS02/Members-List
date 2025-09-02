"use client";
import { useState } from "react";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [authorized, setAuthorized] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/members?password=${password}`);
      if (res.status === 401) {
        setError("❌ Wrong password");
        setLoading(false);
        return;
      }

      const data = await res.json();
      setMembers(data);
      setAuthorized(true);
    } catch (err) {
      setError("Failed to fetch members");
    } finally {
      setLoading(false);
    }
  };

  if (!authorized) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-gray-800">
        <form
          onSubmit={handleLogin}
          className="bg-black p-6 rounded shadow-md w-80"
        >
          <h1 className="text-2xl font-bold mb-4 text-center text-white">Admin Login</h1>
          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 w-full mb-4 rounded"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white py-2 px-4 rounded w-full hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? "Checking..." : "Login"}
          </button>
          {error && <p className="text-red-500 mt-3">{error}</p>}
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-800 p-6">
      <h1 className="text-3xl font-bold mb-6">Admin – Members List</h1>

      {members.length === 0 ? (
        <p>No submissions yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full bg-black rounded shadow-md">
            <thead>
              <tr className="bg-gray-700 text-left">
                <th className="p-3 text-white">First Name</th>
                <th className="p-3 text-white">Last Name</th>
                <th className="p-3 text-white">Phone</th>
                <th className="p-3 text-white">Payment Status</th>
                <th className="p-3 text-white">Submitted At</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr key={member._id} className="border-t">
                  <td className="p-3 text-white">{member.firstName}</td>
                  <td className="p-3 text-white">{member.lastName}</td>
                  <td className="p-3 text-white">{member.phone}</td>
                  <td
                    className={`p-3 font-medium ${
                      member.paymentStatus === "Paid"
                        ? "text-green-600"
                        : "text-orange-500"
                    }`}
                  >
                    {member.paymentStatus}
                  </td>
                  <td className="p-3">
                    {new Date(member.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
