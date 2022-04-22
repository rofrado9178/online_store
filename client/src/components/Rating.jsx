import starRating from "../helper/starRating";

const Rating = (props) => {
  const { rating, totalReview } = props;

  return (
    <aside>
      <span className="star-rating">
        {starRating(rating)}
        {totalReview}
      </span>
    </aside>
  );
};

export default Rating;
