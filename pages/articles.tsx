import {useEffect} from "react";
import config from "../config/api";

function Articles({articles}: any) {
  console.log(articles);
  useEffect(() => {
  }, [])

    return <div className="container">
    </div>
}
type Article = {
  id:number,
  article_name:string,
  article_brand_name:string,
  article_promo_percent:string,
  article_promo_price:string,
  article_real_price:string
}
interface Articles {
  articles: Article[]
}

// This gets called on every request
export async function getServerSideProps() {
    const res = await fetch(`${config.API_URL}/ephemeral/articles`, {
      headers: {
        "Content-type": "application/json"
      }
    })
    const data = await res.json();

    let result: Articles = {
      articles: []
    };
    result.articles = data;


    // Pass data to the page via props
    return { props: result }
}
  
  export default Articles;