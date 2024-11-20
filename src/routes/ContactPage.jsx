import React from "react";
import Navbar from '../components/Navbar';

function ContactPage () {
    return (
        <div className="p-2 py-8 flex flex-col align-items-center bg-white dark:bg-[#0f172a]">
            <Navbar />
            <div className="relative flex flex-col items-center justify-center min-h-screen bg-white text-black p-8">
                <div className="absolute inset-0 bg-cover bg-center opacity-20"></div>
                <div className="relative z-10 w-full max-w-5xl p-8 bg-blue-500 bg-opacity-90 rounded-lg shadow-lg">
                </div>
            </div>
        </div>
    )
}

export default ContactPage;