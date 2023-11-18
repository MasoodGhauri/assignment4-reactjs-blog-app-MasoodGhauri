import { useState } from "react";
import { FaStar } from "react-icons/fa";

const Rating = () => {
  const [stars, setStars] = useState(null);
  const [hover, setHover] = useState(null);

  return (
    <div className="ratingWrapper">
      {[...Array(5)].map((_, i) => {
        const currentStars = i + 1;

        return (
          <label key={currentStars}>
            <input
              type="radio"
              name="stars"
              value={currentStars}
              onClick={() => setStars(currentStars)}
              hidden={true}
            />
            <FaStar
              className="material-symbols-outlined"
              onMouseEnter={() => setHover(currentStars)}
              onMouseLeave={() => setHover(null)}
              onClick={() => setStars(currentStars)}
              color={currentStars <= (hover || stars) ? "yellow" : "white"}
            />
          </label>
        );
      })}
      {/* <p>current rating = {stars}</p> */}
    </div>
  );
};

export default Rating;
