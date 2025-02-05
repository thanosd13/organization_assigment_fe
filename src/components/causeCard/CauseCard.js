import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export const CauseCard = ({ title, text, image }) => {
  return (
    <Card style={{ width: '28rem' }}>
      <Card.Img variant='top' height='200rem' src={image} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{text}</Card.Text>
        <Button variant='primary'>Περισσότερα...</Button>
      </Card.Body>
    </Card>
  );
};
