import {useEffect} from "react";
import config from "../config/api";
import {Container} from 'react-bootstrap';
import { VscAdd } from "react-icons/vsc";


function Articles({articles}: any) {
  useEffect(() => {
  }, [])

    return <div>
            <nav className="navbar navbar-light bg-light mb-5">
              <div className="container">
              <a className="navbar-brand" href="#">
                  <img src="https://i.dlpng.com/static/png/6356608_preview.png" width="30" height="30" alt=""/>
                  Ephemeral
              </a>
              <p> Les marques à prix réduits !</p>
              </div>
            </nav>
            <div className="d-flex d-row flex-wrap" style={{"justifyContent": "center"}}>
            {
              articles.map( (article:Article) => {
                return <div key={article.id}>
                  <div className="card m-3">
                    {
                      article.article_big_picture_urls && article.article_big_picture_urls.length > 0 && article.article_big_picture_urls.split(",").map( src => {
                        return <img className="card-img-top" src={src} alt={article.article_name}/>
                      })
                    }
                    <div className="card-body">
                    <h2 className="card-title">{article.article_brand_name}</h2>
                      <h3 className="card-title">{article.article_name}</h3>
                      <div className="card-text mt-3 mb-3">
                        <h5>{article.article_real_price} €</h5>
                        <div className="d-flex d-row flex-wrap">
                          {
                              article.article_thumbnails_url && article.article_thumbnails_url.length > 0 && article.article_thumbnails_url.split(",").map( src => {
                                return <img className="card-img-top m-2" style={{height:"109px", width: "89px"}} src={src} alt={article.article_name}/>
                          
                              })
                            }
                        </div>
                      </div>
                      <button className="btn btn-success">Ajouter <VscAdd></VscAdd> </button>
                    </div>
                  </div>
                  </div>  
              })
            }
            </div>
        <Container>

        </Container>
    </div>
}
type Article = {
  id:number,
  article_name:string,
  article_brand_name:string,
  article_promo_percent:string,
  article_promo_price:string,
  article_real_price:string,
  article_thumbnails_url?: string,
  article_big_picture_urls?: string
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