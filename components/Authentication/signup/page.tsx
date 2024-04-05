export default function signup() {
  return (
    <section className="w-screen h-screen flex items-center justify-center bg-gray-100 " id="signup">
      <div className="flex flex-col items-center bg-white p-8 rounded-lg shadow-lg">
        <div className="mb-8">
          <img src="https://bolster.ai/wp-content/uploads/2023/10/shutterstock_573033007.jpg" alt="" className="w-32 h-32 rounded-full" />
        </div>
        <div className="max-w-lg flex flex-col">
          <h1 className="text-2xl font-bold text-center mb-4">Welcome to Promotector</h1>
          <p className="text-lg text-center font-medium mb-8">Where you can be free from scams</p>
          <form className="w-full max-w-sm">
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" id="email" name="email" className="mt-1 p-2 block w-full border border-gray-300 rounded-md" />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input type="password" id="password" name="password" className="mt-1 p-2 block w-full border border-gray-300 rounded-md" />
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">Sign Up</button>
          </form>
        </div>
      </div>
    </section>
  )
}