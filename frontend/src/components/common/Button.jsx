function Button({ isLoading, text, children }) {
  return (
    <button
      className={`bg-primary h-[40px] rounded-[10px] cursor-pointer w-full 
      md:w-[181px] md:rounded-[15px] md:shadow-[10px_10px_32px_0_rgba(0,158,226,0.5)] 
      text-white font-bold transition-all duration-300 ease-in-out
      hover:bg-[rgba(0,158,226,0.8)] hover:scale-105 
      active:scale-95 active:opacity-80`}
    >
      {isLoading ? text : children}
    </button>
  );
}

export default Button;
