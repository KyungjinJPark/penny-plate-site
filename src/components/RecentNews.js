import { useQuery } from 'react-apollo';
import { Card } from 'react-bootstrap';

import { NEWS_QUERY } from './all-products/queries';

const RecentNews = () => {

  const { loading, error, data } = useQuery(NEWS_QUERY);
  console.log(data);
  if (loading) return <div>Fetching recent news...</div>;
  if (error) return <div>Error fetching recent news</div>;
  const articles = data.allRecentNews;
  return (
    <div>
          <main>
            {articles.map(article => <ArticleListItem key={article.id} article={article} />)}
          </main>
    </div>
  );
};

export default RecentNews;


const ArticleListItem = ({ article }) =>
  <Card style={{ width: "18rem" }}>
    <Card.Body>
      <Card.Title>{article.title}</Card.Title>
      <Card.Text>{(article.articleBody.text).replaceAll("\\n", " ")}</Card.Text>
      <Card.Text>{article.postDate}</Card.Text>
    </Card.Body>
  </Card>;