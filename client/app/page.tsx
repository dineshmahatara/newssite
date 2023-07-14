
import { categories } from "./constant/page"
import fetchNews from "./lib/fetchNews"

async function Homepage() {
  // fetch the news data
  const news: NewsResponse= await fetchNews(categories.join(','))
  return (
    <div>page</div>
  )
}

export default Homepage