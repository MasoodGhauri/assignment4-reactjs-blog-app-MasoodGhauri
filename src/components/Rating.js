import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { useUserLoggedIn } from "../hooks/useUserLoggedIn";

const Rating = ({ ratingList, id }) => {
  const [stars, setStars] = useState(0);
  const [hover, setHover] = useState(null);
  const [error, setError] = useState(false);
  // console.log(ratingList);
  const useUserHook = useUserLoggedIn();
  const user = useUserHook._id;

  if (ratingList) {
    // const index = ratingList.findIndex((r) => r.userID === user);
    const userRating = ratingList.find((r) => r.userID === user);
    if (userRating) {
      console.log(userRating);
      setStars(userRating.stars);
    }
  }
  const addRating = async (currentStars) => {
    setStars(currentStars);
    await fetch(process.env.REACT_APP_BASE_URL + "/Blog/rate", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        token: useUserHook.token,
      },
      body: JSON.stringify({
        blogId: id,
        stars: stars,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.Success === true) {
          setError(null);
        } else {
          setError(true);
          setTimeout(() => {
            setError(null);
          }, 3000);
          setStars(0);
        }
      })
      .catch((err) => {
        console.log("Something went wrong! try again");
        setStars(0);
      });
  };

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
              // onClick={() => addRating(currentStars)}
              hidden={true}
            />
            <FaStar
              className="material-symbols-outlined star"
              onMouseEnter={() => setHover(currentStars)}
              onMouseLeave={() => setHover(null)}
              onClick={() => addRating(currentStars)}
              color={
                !error
                  ? currentStars <= (hover || stars)
                    ? "yellow"
                    : "white"
                  : "lightcoral"
              }
              colo
            />
          </label>
        );
      })}
    </div>
  );
};

export default Rating;
