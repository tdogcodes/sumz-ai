import { useState, useEffect } from "react";
import { copy, linkIcon, loader, tick } from "../assets";
import {useLazyGetSummaryQuery} from "../services/article";

const Demo = () => {
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });

  const [getSummary, {error, isFetching}] = useLazyGetSummaryQuery();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting URL:", article.url); // Debugging
    try {
      const { data } = await getSummary({ articleUrl: article.url });
      console.log("API Response:", data); // Debugging
      if (data?.summary) {
        setArticle({ ...article, summary: data.summary });
        console.log("Summary:", data.summary); // Debugging
      }
    } catch (err) {
      console.error("Error fetching summary:", err);
    }
  };

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
      </div>

      {/* Display Results */}
    </section>
  );
};

export default Demo;
