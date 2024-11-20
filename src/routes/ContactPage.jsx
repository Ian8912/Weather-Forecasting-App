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

                    <div className="flex flex-col items-start p-4 bg-blue-400 rounded-lg">
                        <h3 className="text-2xl font-semibold text-black mb-2">Our Goal</h3>
                        <p className="text-black">
                        This project's main goal is to have a functional app that tends to all the user's needs 
                        while embedding features that enhances the user experience.
                        </p>
                    </div>

                    <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
                        <div className="flex flex-col items-center text-center">
                            <img src="https://via.placeholder.com/100" alt="Team Member 2" className="w-24 h-24 rounded-full mb-4 border-2 border-blue-400" />
                            <h4 className="text-xl font-semibold text-black">Anthony Rojas</h4>
                            <p className="text-black">ajr203@txstate.edu</p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <img src="https://via.placeholder.com/100" alt="Team Member 2" className="w-24 h-24 rounded-full mb-4 border-2 border-blue-400" />
                            <h4 className="text-xl font-semibold text-black">Ian Lingo</h4>
                            <p className="text-black">khj23@txstate.edu</p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <img src="https://via.placeholder.com/100" alt="Team Member 3" className="w-24 h-24 rounded-full mb-4 border-2 border-blue-400" />
                            <h4 className="text-xl font-semibold text-black">Nicholas Esteves</h4>
                            <p className="text-black">scr145@txstate.edu</p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <img src="https://via.placeholder.com/100" alt="Team Member 4" className="w-24 h-24 rounded-full mb-4 border-2 border-blue-400" />
                            <h4 className="text-xl font-semibold text-black">Taj Telesford</h4>
                            <p className="text-black">ybh5@txstate.edu</p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <img src="https://via.placeholder.com/100" alt="Team Member 4" className="w-24 h-24 rounded-full mb-4 border-2 border-blue-400" />
                            <h4 className="text-xl font-semibold text-black">Ethan Perez</h4>
                            <p className="text-black">lyg23@txstate.edu</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactPage;