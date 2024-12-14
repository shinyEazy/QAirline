import { Box } from "@mui/material";

const Loading = () => {
  return (
    <Box>
      <div>
        <div id="preloader">
          <div className="loader">
            <div className="plane">
              <img
                src="https://zupimages.net/up/19/34/4820.gif"
                className="plane-img"
                alt="Spinning"
              />
            </div>
            <div className="earth-wrapper">
              <div className="earth"></div>
            </div>
          </div>
        </div>
        <style>
          {`
      #preloader {
        position: fixed;
        width: 100%;
        height: 100%;
        display: grid;
        align-items: center;
        text-align: center;
        background: #F8F8FF;
        z-index: 9999999;
        align-content: center;
      }
      #preloader .loader {
        text-align: center;
        width: 100%;
        position: relative;
        overflow: hidden;
        max-width: 35rem;
        height: 18rem;
        margin: 0 auto;
      }
      #preloader .loader .plane {
        position: absolute;
        margin: 0 auto;
        width: 100%;
      }
      #preloader .loader .plane .plane-img {
        animation: spin 2.5s linear infinite;
        width: 250px;
        margin: auto;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
      }
      #preloader .loader .earth-wrapper {
        position: absolute;
        margin: 0 auto;
        width: 100%;
        padding-top: 2.7rem;
      }
      #preloader .loader .earth-wrapper .earth {
        width: 160px;
        height: 160px;
        background: url("https://zupimages.net/up/19/34/6vlb.gif");
        border-radius: 100%;
        background-size: 340px;
        animation: earthAnim 12s infinite linear;
        margin: 0 auto;
        border: 1px solid #CDD1D3;
      }
      @keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
      @keyframes earthAnim {
        0% {
          background-position-x: 0;
        }
        100% {
          background-position-x: -340px;
        }
      }
      @media (max-width: 575px) {
        #preloader .loader .earth-wrapper .earth {
          width: 120px;
          height: 120px;
        }
        #preloader .loader .plane .plane-img {
          width: 210px;
        }
      }
    `}
        </style>
      </div>
    </Box>
  );
};

export default Loading;
