import React, { useState } from "react";

const NewsLetter = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    setEmail("");
  };

  return (
    <>
      <style>{`
        @keyframes popIn {
          0% {
            opacity: 0;
            transform: scale(0.95);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-popIn {
          animation: popIn 0.4s ease forwards;
        }
      `}</style>

      <div className="flex flex-col items-center justify-center text-center space-y-4 pt-10 pb-12 px-6 max-w-xl mx-auto bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 rounded-2xl shadow-xl animate-popIn">
        <h1 className="md:text-3xl text-2xl font-semibold text-white">
          Subscribe now & get 20% off
        </h1>

        <p
          className="text-sm text-white"
          style={{ textAlign: "justify", lineHeight: "1.5rem" }}
        >
        InstaCart transforms your online shopping and selling into a sleek, hassle-free experience —
          powered by smart, interactive dashboards that move as fast as you do.
        </p>

        <div className="flex items-center justify-between w-full md:h-14 h-12">
          <input
            className="border border-white/50 rounded-md h-full border-r-0 outline-none w-full rounded-r-none px-3 text-gray-700"
            type="text"
            placeholder="Enter your email id"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            className="md:px-12 px-8 h-full text-white bg-blue-700 hover:bg-blue-800 transition duration-300 rounded-md rounded-l-none"
            onClick={handleSubscribe}
          >
            Subscribe
          </button>
        </div>
      </div>
    </>
  );
};

export default NewsLetter;
