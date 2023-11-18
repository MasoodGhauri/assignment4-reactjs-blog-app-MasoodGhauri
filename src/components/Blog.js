import Rating from "./Rating";
import { BsSendFill } from "react-icons/bs";
import { ImEyeBlocked } from "react-icons/im";
import { FaGlobeAmericas } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

const Blog = ({blog}) => {

    const calculateAverageStars=(ratingStars)=> {
        if (!ratingStars || ratingStars.length === 0) {
            return 0;
        }
    
        const sumStars = ratingStars.reduce((sum, rating) => sum + rating.stars, 0);
        const averageStars = sumStars / ratingStars.length;
    
        return averageStars;
    }

    const formatDateTime = (inputDateTime) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
        const formattedDateTime = new Date(inputDateTime).toLocaleString('en-US', options);
        return formattedDateTime;
    }
    
    let avr=calculateAverageStars(blog.RatingStars);
    let time=formatDateTime(blog.createdAt);

    return ( 
        <div className="blogWrapper">
            <div className="timeWrapper">
                <p className="time">{time}</p>
                {blog.Status === "active"?<FaGlobeAmericas/>:<ImEyeBlocked/>}
            </div>
            <div className="top">
                <h2 className="title">
                    {blog.Title}
                </h2>
                <h4 className="author">{window.innerWidth < 500 ? blog.Author.substring(0, 5) + '...' : blog.Author}</h4>
            </div>
            <div className="catagories">
                {
                    blog.Catagories.map((c, i) => {
                        return <span className="catagory">{c}</span>
                    })
                }
                </div>
            <div className="body">
                <p>{blog.Body}</p>
                <div className="keyWords">
                {
                    blog.Keywords.map((b, i) => {
                        return <span className="keyword">{b}</span>
                    })
                }
                </div>
            </div>
            <hr />
            <div className="ratingSection">
                Rate it:<Rating/>
                <h3 className="avergeStars">
                    <span>Average {avr}</span>
                    <FaStar/>
                </h3>
                </div>
            <hr />
            <div className="comWrapper">
                <h3>Comments</h3>
                <div className="comments">
                    {blog.Comments.length>0 ? blog.Comments.map((c,i)=>{
                        return(
                            <div className="com">
                                <h4>{c.userID}</h4>
                                <h6>{c.body}</h6>
                            </div>
                        )
                    })
                    :
                    <div className="com">
                        <h6>No comments on this blog yet</h6>
                    </div>
                    }
                </div>
                <div className="addComment">
                    <input type="text" className="comInput" placeholder="add comment"/>
                    <BsSendFill className="comBtn"/>
                </div>
            </div>
        </div>
     );
}
 
export default Blog;