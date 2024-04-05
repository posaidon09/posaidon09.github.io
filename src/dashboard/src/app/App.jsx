import React from 'react';
import { useState } from 'react';
import { TbDownload } from "react-icons/tb";
import { useEffect } from 'react';
import './../index.css';
import { io } from 'socket.io-client';

export default function App() {
  const [progress, setProgress] = useState(0);
  const [downloading, setDownloading] = useState("");
  let socket = io.connect(`http://localhost:3333`);

  function download(obj) {
  socket.emit("download", obj);
};
  useEffect(() => {
    socket.on("downloading", (title) => {
        setDownloading(title)
    });
    socket.on("progress", (percentage) => {
        setProgress(percentage);
    });
  }, []); 

  function handleSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const formObj = Object.fromEntries(formData.entries());
    const url = formObj.url;
    const type = formObj.extension;
    
    const obj = {
      url: url,
      type: type,
    }

    download(obj);
  }

  return (
    <div className="min-h-screen bg-background pt-16 caret-text">
    <div>
      <h1 className="text-text font-bold text-center text-8xl mt-24">YTDL-GUI</h1>
      <p className='text-text text-center text-2xl mt-10'>Youtube video downloader</p>
    </div>
    <div className='flex justify-center mt-40'>
      <form onSubmit={(event) => handleSubmit(event)} className='flex gap-4'>
        <div className='bg-accent flex flex-row rounded-lg p-2 w-max'>
          <input className='bg-secondary w-[75%] rounded-lg p-1 focus:text-text' name='url' placeholder='Youtube URL' />
          <input className='bg-secondary w-[10%] rounded-lg p-1 ml-2 focus:text-text' name='extension' placeholder='Type' />
          <button className='bg-secondary p-2 rounded-lg ml-2' type='submit'><TbDownload /></button>
        </div>
      </form>
    </div>
    <div className='flex justify-center flex-col mt-12'>
    <p className='text-text justify-center text-center'>{progress == 0 ? "" : progress !== 100 ? `download progress for ${downloading}: ${progress}%` : `download complete: ${downloading}`}</p>
    <div className="flex justify-center rounded-xl">
    {progress == 0 ? "" : <progress value={progress/100} className='[&::-webkit-progress-bar]:rounded-lg [&::-webkit-progress-value]:rounded-lg   [&::-webkit-progress-bar]:bg-primary [&::-webkit-progress-value]:bg-secondary [&::-moz-progress-bar]:bg-violet-400 mt-5 w-96' />}
    </div>
    </div>
  </div>

  );
}
