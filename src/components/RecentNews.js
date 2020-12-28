import {
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

import { Query } from 'react-apollo';
import { Card } from 'react-bootstrap';

import { NEWS_QUERY } from './all-products/queries';

const RecentNews = () => {
  let match = useRouteMatch();

  return (
    <div>
      <Switch>
        <Route path={`${match.path}/:articleId`}>
          <ArticlePage />
        </Route>
        <Route path={match.path}>
          <Query query={NEWS_QUERY}>
            {({ loading, error, data }) => {
              if (loading) return <div>Fetching products.....</div>
              if (error) return <div>Error fetching products</div>

              console.log(data);
              const articles = data.allRecentNews;

              return (
                <main>
                  <ul>
                    {articles.map(article => <li>
                      <Link to={`${match.url}/${article.id}`}>
                        <ArticleListItem key={article.id} article={article} />
                      </Link>
                    </li>)}
                  </ul>
                </main>
              )
            }}
          </Query>
        </Route>
      </Switch>
    </div>
  );

};

export default RecentNews;

const ArticlePage = () => {
  let { articleId } = useParams();
  return <h3>Requested article ID: {articleId}</h3>;
}

const ArticleListItem = ({ article }) =>
  <Card style={{ width: "18rem" }}>
    <Card.Body>
      <Card.Title>{article.title}</Card.Title>
      <Card.Text>{(article.articleBody.text).replaceAll("\\n", " ")}</Card.Text>
      <Card.Text>{article.postDate}</Card.Text>
    </Card.Body>
  </Card>;