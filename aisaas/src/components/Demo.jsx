import { useState, useEffect } from "react";
import { copy, linkIcon, loader, tick } from "../assets";
import {useLazyGetSummaryQuery} from "../services/article";

const Demo = () => {
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });

  const [allArticles, setAllArticles] = useState([]);

  const [getSummary, {error, isFetching}] = useLazyGetSummaryQuery();

  const [copied, setCopied] = useState("");
  
  useEffect(()=>{
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem('articles')
    )

    if(articlesFromLocalStorage){
      setAllArticles(articlesFromLocalStorage)
    }
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting URL:", article.url); // Debugging
    
    const { data } = await getSummary({ articleUrl: article.url });
    console.log("API Response:", data); // Debugging

    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary }
      const updatedAllArticles = [newArticle, ...allArticles]

      setArticle(newArticle);
      setAllArticles(updatedAllArticles)
      console.log("Summary:", data.summary); // Debugging
      localStorage.setItem('articles', JSON.stringify(updatedAllArticles))
    }
  }

  const handleCopy = (copyUrl) => {
    setCopied(copyUrl)
    navigator.clipboard.writeText(copyUrl)
    setTimeout(()=> setCopied(false), 3000)
  }

  return (
    <section className="mt-16 w-full max-w-xl">
      <div className="flex flex-col w-full gap-2">
        <form
          className="relative flex justify-center items-center"
          onSubmit={handleSubmit}
        >
            <img
              src={linkIcon}
              alt="link icon"
              className="absolute left-0 my-2 ml-3 w-5"
            />
            <input
              type="url"
              className="url_input peer"
              placeholder="Enter a URL"
              value={article.url}
              onChange={(e) => setArticle({...article, url: e.target.value})}
              required
            />
            <button
              type="submit"
              className="submit_btn cursor-pointer peer-focus:border-gray-700 peer-focus:text-gray-700"
            >
            <p>↵</p>
          </button>
        </form>

        {/* Browse History */}
        <div className="overflow-y-scroll scrollbar-hide flex -mt-3 py-3 flex-col gap-1 max-h-60" style={{maskImage: 'linear-gradient(to top, transparent, black 10%, black 90%, transparent)'}}>
          {allArticles.map((item, index)=> (
            <div key={`link-${index}`} onClick={()=>setArticle(item)} className="link_card transition-all duration-200 -z-10 hover:shadow-[inset_0px_0px_5px_1px_#FFFFFF]">
              <div className="copy_btn" onClick={()=> handleCopy(item.url)}>
                <img src={copy} alt="copy icon" className="w-[60%] h-[60%] bg-transparent object-contain"/>
              </div>
              <p className="flex-1 text-white text-sm font-satoshi font-medium truncate">
                {item.url}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Display Results */}
    <div className="my-7 max-w-full flex justify-center items-center">
      {isFetching ? (<img src={loader} alt="loader" className="w-20 h-20 object-contain"/>) : 
          error ? <p className="font-inter font-bold text-white text-center ">
            That wasn't supposed to happen :c *cries*<br/>
            <span className="font-satoshi font-normal text-red-500">{error?.data?.error}</span>
            </p>
            : article.summary && 
            <div className="flex flex-col gap-3 my-4">
              <h2 className="font-bold text-white font-satoshi text-3xl">Article <span className="blue_gradient">Summary</span></h2>
              <div className="summary_box text-white text-lg">{article.summary}</div>
            </div>
        }
      </div>
    </section>
  );
};

export default Demo;
