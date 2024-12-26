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
      <div className="mb-4">
        <h1 className="text-2xl font-bold tracking-tight">
            <span className="text-gray-900">Git</span><span className="text-[#fca847]">ingest</span>
        </h1>
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
            <br />
            <span className="ml-2 font-normal text-gray-600 text-xs">
              You may need to refresh the page.
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
