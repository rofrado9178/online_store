const rating = (num) => {
  const stars = [];
  const roundNum = Math.floor(num);
  const isHalf = roundNum - num !== 0;

  for (let i = 0; i < 5; i++) {
    const value =
      i < roundNum ? "full" : i === roundNum && isHalf ? "half" : "empty";
    stars.push(value);
  }
  return stars;
};

console.log(rating(0.8));
console.log(rating(1.8));
console.log(rating(4.8));
console.log(rating(0.5));
console.log(rating(3));
console.log(rating(5));
console.log(rating(6));
console.log(rating(2.9));
