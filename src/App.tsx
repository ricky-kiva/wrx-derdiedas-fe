function App() {
  return (
    <div
      className='bg-bg-indigo h-screen flex justify-center items-center'
    >
      <div 
        className='bg-neuschwanstein-1-grad w-[94%] h-[90%] p-8 bg-cover bg-center flex flex-col justify-between 
        items-center border-[5px] border-brdr-black rounded-[35px] shadow-2xl shadow-ctnr-blackOutShdw/75'
      >
        <h1>Hello World!</h1>
        <button className="bg-gradient-to-b from-brdr-goldBrdrTop to-brdr-goldBrdrBottom rounded-full p-[1.5px]">
          <span className="block bg-btn-gold rounded-full px-8 py-[6px]">
            Check
          </span>
        </button>

        <h1>Hello World!</h1>
      </div>
    </div>
  );
}

export default App;
