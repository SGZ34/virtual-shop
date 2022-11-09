export const generateStars = (quantity) => {
  let stars = [];

  let i = 0;

  while (i < Math.floor(quantity)) {
    stars.push(<i className="fa-solid fa-star star" key={i}></i>);
    i++;
  }

  if (stars.length < 5) {
    let operation = 5 - stars.length;

    let counter = 0;

    while (counter < operation) {
      stars.push(<i className="fa-regular fa-star star" key={5 - counter}></i>);
      counter++;
    }
  }

  return stars.map((star) => star);
};
