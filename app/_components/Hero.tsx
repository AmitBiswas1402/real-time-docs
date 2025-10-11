import React from "react";

function Hero() {
  return (
    <main className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 bg-gradient-to-b from-black via-slate-900 to-black overflow-hidden">
      {/* Soft gradient glow behind text */}
      <div className="absolute -top-40 w-[400px] h-[400px] bg-sky-500/10 blur-[100px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-blue-400/10 blur-[120px] rounded-full" />

      <div className="relative z-10 max-w-4xl">
        <h1 className="text-7xl sm:text-7xl font-extrabold leading-tight tracking-tight">
          <span className="bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">
            Documents & diagrams
          </span>
          <strong className="block mt-3 text-white font-extrabold">
            for engineering teams.
          </strong>
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
          All-in-one markdown editor, collaborative canvas, and diagram-as-code builder.
        </p>

        {/* <div className="mt-8 flex justify-center gap-4">
          <button className="px-5 py-2.5 rounded-lg bg-sky-500 hover:bg-sky-600 text-white font-semibold transition-all">
            Get Started
          </button>
          <button className="px-5 py-2.5 rounded-lg border border-sky-400 text-sky-300 hover:bg-sky-800/20 font-semibold transition-all">
            Learn More
          </button>
        </div> */}
      </div>
    </main>
  );
}

export default Hero;
