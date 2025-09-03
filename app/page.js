"use client";
import { useState, useEffect } from "react";
import { Users, CheckCircle, ArrowDown, Phone, User } from "lucide-react";

export default function Home() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("Paid");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
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
    } catch (error) {
      setMessage("❌ An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900">
      <div className="absolute inset-0 bg-black/20"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-full mb-4 shadow-lg">
            <Users size={32} />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">
            Mosque Membership Registration
          </h1>
          <p className="text-gray-300">Join our community of believers</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Information Panel */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl p-8">
              <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
                <CheckCircle className="text-blue-400" size={24} />
                Membership Information
              </h2>
              
              <div className="space-y-4">
                <div className="bg-blue-500/20 border-l-4 border-blue-400 p-4 rounded-r-lg backdrop-blur-sm">
                  <p className="text-blue-200 font-medium mb-2">
                    السلام عليكم ورحمة الله وبركاته
                  </p>
                  <p className="text-blue-300 text-sm">
                    Peace be upon you and God&apos;s mercy and blessings
                  </p>
                </div>

                <div className="space-y-3 text-gray-200">
                  <p className="font-medium text-white">
                    🕌 A message to all brothers! Please become a member ASAP if you haven&apos;t yet!
                  </p>
                  
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <h3 className="font-semibold text-white mb-2">How to become a member:</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-green-400 font-bold">💰</span>
                        <span className="text-gray-300">
                          Donate <strong className="text-white">$50</strong> to the masjid by card for proof of payment
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400 font-bold">🎓</span>
                        <span className="text-gray-300">
                          <strong className="text-white">$10</strong> if you are currently a student
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-orange-500/20 border border-orange-500/30 rounded-lg p-4 backdrop-blur-sm">
                    <p className="text-orange-200 text-sm">
                      <strong className="text-orange-100">Important:</strong> This form gathers a list of everyone we can count on when the day of voting comes, which can be very soon!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Registration Form */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl p-8">
              <h2 className="text-2xl font-semibold text-white mb-6">
                Registration Form
              </h2>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      placeholder="First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-white placeholder-gray-400 backdrop-blur-sm"
                      required
                    />
                  </div>
                  
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      placeholder="Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-white placeholder-gray-400 backdrop-blur-sm"
                      required
                    />
                  </div>
                </div>

                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-white placeholder-gray-400 backdrop-blur-sm"
                    required
                  />
                </div>

                <div className="relative">
                  <ArrowDown className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <select
                    value={paymentStatus}
                    onChange={(e) => setPaymentStatus(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-white backdrop-blur-sm appearance-none"
                    required
                  >
                    <option value="Paid" className="bg-gray-800 text-white">✅ Paid</option>
                    <option value="Will Pay Soon" className="bg-gray-800 text-white">⏳ Will Pay Soon</option>
                  </select>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-all transform hover:scale-[1.02] disabled:scale-100 shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Submitting...
                    </div>
                  ) : (
                    "Submit Registration"
                  )}
                </button>
              </div>

              {message && (
                <div className={`mt-6 p-4 rounded-lg border backdrop-blur-sm ${
                  message.includes('✅') 
                    ? 'bg-green-500/20 border-green-500/30 text-green-200' 
                    : 'bg-red-500/20 border-red-500/30 text-red-200'
                }`}>
                  <p className="font-medium">{message}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}