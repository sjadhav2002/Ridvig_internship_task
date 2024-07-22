import { Card, Row, Col } from "react-bootstrap";

interface Item {
    id : number ,
    name : string,
    company : string,
    price : number,
    quantity : string,
    description : string,
}

interface Cardprops{
    item : Item
}




const ItemCard: React.FC<Cardprops> = ({item}) => {

  return (
    <div className="card" style={{ width: '18rem' }}>
      <div className="card-body">
        <h3 className="card-title">{item.company} {item.name}</h3>
        <div>
          <p className="card-text">{item.description}</p>
          <Row>
            <Col><p className="card-text">Qty: {item.quantity}</p></Col>
            <Col><p className="card-text">{item.price}Rs</p></Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
