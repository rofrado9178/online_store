import starRating from "../helper/starRating";

const Rating = (props) => {
  const { rating, totalReview } = props;

  return (
    <aside>
      <span>
        {starRating(rating)}
        {totalReview}
      </span>
    </aside>
  );
};

export default Rating;
