import {
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import { useQuery } from 'react-apollo';
import { Container, Row, Col, Card } from 'react-bootstrap';

import "./newitemspage.css";
import { NEWITEMS_QUERY, NEWITEMINFO_QUERY } from '../productspage/queries';

const NewItemsPage = () => {
  let match = useRouteMatch();
  return (<Container className="normal-container">
    <Switch>
      <Route path={`${match.path}/:articleId`}>
        <NewItemPage />
      </Route>
      <Route path={match.path}>
        <h1>New Items</h1>
        <div className="separator"></div>
        <NewItemList />
      </Route>
    </Switch>
  </Container>)
};

const NewItemList = () => {
  const { loading, error, data } = useQuery(NEWITEMS_QUERY);
  if (loading) return <div>Fetching new products...</div>;
  if (error) return <div>Error fetching new products</div>;
  const articles = data.allNewItems;
  return (<Row>
    {articles.map(article => <Col xs={12} sm={6} md={4} key={article.id}>
      <Link to={`new-items/${article.id}`}>
        <NewItemListItem article={article} />
      </Link>
    </Col>)}
  </Row>)
};

export { NewItemsPage as default, NewItemList };


const NewItemListItem = ({ article }) =>
  <div style={{ textAlign: "center" }}>
    <Card.Img src={article.images[0].url} />
    <div className="new-item-text">
      <h4>{article.title}</h4>
    </div>
  </div>;

const NewItemPage = () => {
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
    return (<>
      <div className="content-section">
        <h1>{info.title}</h1>
        <div className="separator"></div>
        <p dangerouslySetInnerHTML={{ __html: info.itemDescription.html }}></p>
      </div>
      <div className="content-section">
        <Row>
          {info.images.map((imgInfo, index) => {
            return <Col xs={6}>
              <img
                src={imgInfo.url}
                width="100%"
                style={{ marginBottom: "3rem" }}
                alt={`${info.title} ${index}`}
              />
            </Col>
          })}
        </Row>
      </div>
    </>)
  }
}