import { useState, useEffect } from 'react';
import { storage } from 'wxt/storage';

function App() {
  const [baseUrl, setBaseUrl] = useState<string>('');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    storage.getItem<string>('sync:baseUrl').then((savedUrl) => {
      if (savedUrl) {
        setBaseUrl(savedUrl);
      }
    });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await storage.setItem('sync:baseUrl', baseUrl);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div className="min-w-32 p-4 bg-[#fff4da]">
      <div className="mb-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">
            <span className="text-gray-900">Git</span><span className="text-[#fca847]">ingest</span> <span className="text-gray-600 tracking-tighter">Extension</span>
        </h1>
        <a 
          href="https://github.com/lcandy2/gitingest-extension" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-gray-800"
          title="View on GitHub"
        >
          <svg height="24" width="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
          </svg>
        </a>
      </div>

      <div className="rounded-xl relative z-20 pl-6 sm:pl-8 pr-6 sm:pr-12 py-6 border-[3px] border-gray-900 bg-[#fff4da]">
        <form 
          className="flex flex-col w-full h-full justify-center items-stretch space-y-4"
          onSubmit={handleSave}
        >
          <div className="space-y-2">
            <label 
              htmlFor="baseUrl" 
              className="block font-bold text-gray-900 text-sm"
            >
              Service URL
            </label>
            <div className="relative">
              <div className="w-full h-full rounded bg-gray-900 translate-y-1 translate-x-1 absolute inset-0 z-10"></div>
              <input
                id="baseUrl"
                type="text"
                value={baseUrl}
                onChange={(e) => setBaseUrl(e.target.value)}
                placeholder="https://gitingest.com"
                className="border-[3px] w-full relative z-20 border-gray-900 placeholder-gray-500 text-base font-medium focus:outline-none py-2 px-4 rounded"
              />
            </div>
          </div>
          
          <div className="relative w-full group">
            <div className="w-full h-full rounded bg-gray-800 translate-y-1 translate-x-1 absolute inset-0 z-10"></div>
            <button 
              type="submit"
              className="py-2 rounded px-4 group-hover:-translate-y-px group-hover:-translate-x-px ease-out duration-300 z-20 relative w-full border-[3px] border-gray-900 font-medium bg-[#ffc480] tracking-wide text-base flex-shrink-0 text-gray-900"
            >
              Save
            </button>
          </div>
        </form>

        {isSaved && (
          <div className="mt-6 text-sm text-green-600 font-medium text-center relative z-20">
            Settings saved!
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
