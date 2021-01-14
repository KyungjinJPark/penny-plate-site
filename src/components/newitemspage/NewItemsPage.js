import {
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import { useQuery } from 'react-apollo';
import { Card, Container } from 'react-bootstrap';

import { NEWITEMS_QUERY, NEWITEMINFO_QUERY } from '../productspage/queries';

const NewItemsPage = () => {
  let match = useRouteMatch();
  return (<div>
    <Switch>
      <Route path={`${match.path}/:articleId`}>
        <ArticlePage />
      </Route>
      <Route path={match.path}>
        <ArticleList match={match} />
      </Route>
    </Switch>
  </div>)
};

export default NewItemsPage;

const ArticleList = ({ match }) => {
  const { loading, error, data } = useQuery(NEWITEMS_QUERY);
  if (loading) return <div>Fetching new products...</div>;
  if (error) return <div>Error fetching new products</div>;
  const articles = data.allNewItems;
  console.log(articles)
  return (<Container className="normal-container">
    <h1>New Items</h1>
    <div className="separator"></div>
    <ul>
      {articles.map(article => <li>
        <Link to={`${match.url}/${article.id}`}>
          <ArticleListItem key={article.id} article={article} />
        </Link>
      </li>)}
    </ul>
  </Container>)
};

const ArticleListItem = ({ article }) =>
  <Card style={{ width: "18rem" }}>
    <Card.Img variant="top" src={article.image.url} />
    <Card.Body>
      <Card.Title>{article.title}</Card.Title>
      {/* <Card.Text>{(article.itemDescription.text).replaceAll("\\n", " ")}</Card.Text> */}
    </Card.Body>
  </Card>;

const ArticlePage = () => {
  let { articleId } = useParams();
  const { loading: infoLoading, error: infoError, data: infoData } = useQuery(NEWITEMINFO_QUERY, {
    variables: { itemId: articleId },
  });
  if (infoLoading) {
    return <p>Fetching new product information.....</p>
  }
  else if (infoError) {
    return <p>Error fetching new product information</p>
  }
  else {
    const info = infoData.newItems;
    console.log("recieved!");
    console.log(info);
    // TODO: The buttons do nothing! 
    return (
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={info.image.url} />
        <Card.Body>
          <Card.Title>{info.title}</Card.Title>
          <Card.Text dangerouslySetInnerHTML={{ __html: info.itemDescription.html }} ></Card.Text>
        </Card.Body>
      </Card>
    )
  }
}