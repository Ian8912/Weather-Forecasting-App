import React from 'react'

const FeatureForm = () => {
  return (
   <div className="container mx-auto">
    <h3 className="text-3xl font-bold text-center mb-8 dark:text-[#cbd5e1]">Feedback Form</h3>
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-[#cbd5e1]" htmlFor="name">
        {t('Name')}
        </label>
        <input
          id="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:shadow-outline transition ease-in-out duration-150 dark:bg-[#312e81] dark:text-[#cbd5e1]"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-[#cbd5e1]" htmlFor="email">
        Email
        </label>
        <input
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:shadow-outline transition ease-in-out duration-150 dark:bg-[#312e81] dark:text-[#cbd5e1]"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-[#cbd5e1]" htmlFor="feedback">
        Feedback
        </label>
        <textarea
          id="feedback"
          name="feedback"
          value={formData.feedback}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:shadow-outline transition ease-in-out duration-150 dark:bg-[#312e81] dark:text-[#cbd5e1]"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline dark:bg-[#312e81] dark:text-[#cbd5e1]"
      >
        Submit
      </button>
    </form>
  </div>
  )
}

export default FeatureForm