
function ChatRoom() {
  return (
    <>
      <div className="bg-[#323643] pt-20 pb-24 p-2 min-h-screen">

      {/* Messages */}
        <div className="text-white flex flex-col pl-8 pr-8">
          <div className="self-end bg-[#606470] w-fit p-3 rounded-lg m-4">
            <p>User1</p><hr className="mb-2 border-slate-200 border-[1px] rounded-3xl"/>
            <p>Hi</p>
          </div>
          <div className="bg-[#606470] w-fit p-3 rounded-lg m-4">
            <p>User2</p><hr className="mb-2 border-slate-200 border-[1px] rounded-3xl"/>
            <p>How are you</p>
          </div>
          <div className="bg-[#606470] w-fit p-3 rounded-lg m-4">
            <p>User2</p><hr className="mb-2 border-slate-200 border-[1px] rounded-3xl"/>
            <p>How are you</p>
          </div>
          <div className="bg-[#606470] w-fit p-3 rounded-lg m-4">
            <p>User2</p><hr className="mb-2 border-slate-200 border-[1px] rounded-3xl"/>
            <p>How are you</p>
          </div>
          <div className="bg-[#606470] w-fit p-3 rounded-lg m-4">
            <p>User2</p><hr className="mb-2 border-slate-200 border-[1px] rounded-3xl"/>
            <p>How are you</p>
          </div>
          <div className="bg-[#606470] w-fit p-3 rounded-lg m-4">
            <p>User2</p><hr className="mb-2 border-slate-200 border-[1px] rounded-3xl"/>
            <p>How are you</p>
          </div>
          <div className="bg-[#606470] w-fit p-3 rounded-lg m-4">
            <p>User2</p><hr className="mb-2 border-slate-200 border-[1px] rounded-3xl"/>
            <p>How are you</p>
          </div>
          <div className="self-end bg-[#606470] w-fit p-3 rounded-lg m-4">
            <p>User1</p><hr className="mb-2 border-slate-200 border-[1px] rounded-3xl"/>
            <p>Hi</p>
          </div><div className="self-end bg-[#606470] w-fit p-3 rounded-lg m-4">
            <p>User1</p><hr className="mb-2 border-slate-200 border-[1px] rounded-3xl"/>
            <p>Hi</p>
          </div><div className="self-end bg-[#606470] w-fit p-3 rounded-lg m-4">
            <p>User1</p><hr className="mb-2 border-slate-200 border-[1px] rounded-3xl"/>
            <p>Hi</p>
          </div>
        </div>

        <form className="fixed bottom-8 flex justify-center w-screen">
          <input type="text" placeholder="Message" className="outline-none p-3 rounded w-[70vw] sm:w-[40vw] h-8 border-slate-600" />
          <button className="ml-4 text-white bg-green-600 pl-2 hover:bg-green-800 focus:bg-green-400  pr-2 rounded">Send</button>
        </form>

      </div>
    </>
  )
}

export default ChatRoom