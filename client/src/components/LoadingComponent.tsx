import sat2 from "../../public/satellite2.png";
import wireless from "../../public/wireless.png";
import dish from "../../public/satellite-dish.png";
import "../styles/data-fetching.css"


const LoadingScreen = () => {
    return (
        <div className="loading">
          <div>
            <img
              style={{ height: '50px' }}
              src={sat2}
              alt="satellite"
            />
          </div>
          <div className="satsig">
            <img
              style={{ height: '50px'}}
              src={wireless}
              alt="satwireless"
            />
          </div>
          <div className="dishsig">
            <img
              style={{ height: '50px'}}
              src={wireless}
              alt="dishwireless"
            />
          </div>
          <div>
            <img
              style={{ height: '50px'}}
              src={dish}
              alt="dish"
            />
          </div>
        </div>
      );
}

export default LoadingScreen;