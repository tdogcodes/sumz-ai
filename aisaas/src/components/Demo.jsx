import { useState, useEffect } from "react";
import { copy, linkIcon, loader, tick } from "../assets";

const Demo = () => {
  const [article, setArticle] = useState("");

  return (
    <section className="mt-16 w-full max-w-xl">
      <div className="flex flex-col w-full gap-2">
        <form
          className="relative flex justify-center items-center"
          onSubmit={() => {}}
          action=""
        >
            <img
              src={linkIcon}
              alt="link icon"
              className="absolute left-0 my-2 ml-3 w-5"
            />
            <input
              type="url"
              className="url_input"
              placeholder="Enter a URL"
              value={article}
              onChange={(e) => setArticle(e.target.value)}
              required
            />
          <button
            type="submit"
            className="submit_btn cursor-pointer"
          >
            <p>↵</p>
          </button>
        </form>
      </div>
    </section>
  );
};

export default Demo;
