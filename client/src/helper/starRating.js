import { v4 as uuidv4 } from "uuid";
const starRating = (num) => {
  const stars = [];
  const roundNum = Math.floor(num);
  const isHalf = roundNum - num !== 0;
  const color = "#ffa41c";

  for (let i = 0; i < 5; i++) {
    const value =
      i < roundNum ? (
        <i className="fas fa-star" style={{ color }} key={uuidv4()}></i>
      ) : i === roundNum && isHalf ? (
        <i
          className="fas fa-star-half-alt"
          style={{ color }}
          key={uuidv4()}
        ></i>
      ) : (
        <i className="far fa-star" style={{ color }} key={uuidv4()}></i>
      );
    stars.push(value);
  }
  return stars;
};

export default starRating;
