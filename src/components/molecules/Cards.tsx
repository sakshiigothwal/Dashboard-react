import React from 'react';
import '../../styles/Cards.css'

type CardProps = {
  title: string;
  description: string;
};

const Card = (props: CardProps) => {
  return (
    <div className="card">
      <h3 className="card-title">{props.title}</h3>
      <p className="card-description">{props.description}</p>
    </div>
  );
};
//.memo doesn't allow unnecessary re-render 
export default React.memo(Card);
