import { Query } from 'react-apollo';
import { Card } from 'react-bootstrap';

import { NEWS_QUERY } from './all-products/queries';

const RecentNews = () => {
  return (
    <div>
      <Query query={NEWS_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <div>Fetching products.....</div>
          if (error) return <div>Error fetching products</div>

          console.log(data);
          const articles = data.allRecentNews;
          return (
            <main>
              {articles.map(article => <ArticleListItem key={article.id} article={article} />)}
            </main>
          )
        }}
      </Query>
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