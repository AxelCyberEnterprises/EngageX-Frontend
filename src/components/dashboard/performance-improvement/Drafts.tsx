function Drafts() {
  return (
    <main className="px-4 lg:px-10 pb-10 bg-[#F9F9F9] font-montreal">
      <div className="py-6 flex w-full gap-8 justify-between">
        <div>
          <h6>Start a New Session or Improve a Past Session</h6>
          <small>Select session saved in your draft and proceed</small>
        </div>
        <button className="bg-transparent border border-dark-gray rounded-lg py-3 text-black">
          Cancel
        </button>
      </div>
      <div className="flex flex-wrap"></div>
    </main>
  );
}

export default Drafts;
