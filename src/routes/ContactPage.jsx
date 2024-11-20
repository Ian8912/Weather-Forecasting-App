import React from "react";
import Navbar from '../components/Navbar';

function ContactPage () {
    return (
        <div className="p-2 py-8 flex flex-col align-items-center bg-white dark:bg-[#0f172a]">
            <Navbar />
            <div className="relative flex flex-col items-center justify-center min-h-screen bg-white text-black p-8">
                <div className="absolute inset-0 bg-cover bg-center opacity-20"></div>
                <div className="relative z-10 w-full max-w-5xl p-8 bg-blue-500 bg-opacity-90 rounded-lg shadow-lg">
                <h2 className="text-4xl font-bold text-center text-black mb-4">About Us</h2>
                    <p className="text-center text-lg text-black mb-12">
                    This is a weather app project created for our software engineering course. We believe that there are features 
                    that are missing that could better inform the user when it comes to the weather. 
                    We hope to create an app that people can love and appreciate.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ContactPage;