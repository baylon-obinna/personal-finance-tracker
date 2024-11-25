import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import './Dashboard.css';

function Dashboard() {
  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <Row>
        <Col md={4}>
          <Card className="card">
            <Card.Body>
              <Card.Title className="card-title">Total Balance</Card.Title>
              <Card.Text className="card-text">$12,500</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="card">
            <Card.Body>
              <Card.Title className="card-title">Monthly Budget</Card.Title>
              <Card.Text className="card-text">$3,000</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="card">
            <Card.Body>
              <Card.Title className="card-title">Investments</Card.Title>
              <Card.Text className="card-text">$8,000</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Dashboard;
