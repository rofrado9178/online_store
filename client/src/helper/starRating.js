const starRating = (num) => {
  const stars = [];
  const roundNum = Math.floor(num);
  const isHalf = roundNum - num !== 0;
  const color = "#ffa41c";

  for (let i = 0; i < 5; i++) {
    const value =
      i < roundNum ? (
        <i className="fas fa-star" style={{ color }}></i>
      ) : i === roundNum && isHalf ? (
        <i className="fas fa-star-half-alt" style={{ color }}></i>
      ) : (
        <i className="far fa-star" style={{ color }}></i>
      );
    stars.push(value);
  }
  return stars;
};

export default starRating;
