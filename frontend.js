import { useState, useEffect } from "react";

function App() {
  const [view, setView] = useState("Home");
  const [park, setPark] = useState([]);

  useEffect(() => {
    viewHome();
  }, []);

  function viewHome() {
    fetch("http://localhost:8081/listParks")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data:", data);
        setPark(data.National_Parks);
        console.log("Updated park state:", park);
        setView("Home");
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  const viewAllParks =
    park &&
    park.map((el) => (
      <div className="col" key={el.id}>
        <div className="card shadow-sm">
          <img
            src={el.image}
            id="catalog_image"
            className="mx-3 mt-3"
            width="35%"
            height="35%"
            alt="image"
          />
          <div className="card-body">
            <h5 className="card-text">
              <strong>{el.name}</strong>
            </h5>
            <p className="card-text">Location: {el.location}</p>
            <p className="card-text">Category: {el.type}</p>
          </div>
        </div>
      </div>
    ));

  return (
    <div>
      <header data-bs-theme="dark">
        <div
          class="navbar navbar-dark bg-dark shadow-sm py-3"
          id="navbarHeader"
        >
          <div class="container">
            <h1>HikersPlanner: Home</h1>
          </div>
          <div class="container">{/* Navigation Buttons */}</div>
        </div>
      </header>
      <div class="px-5 py-3">
        {view === "Home" && (
          <div>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
              {park && park.length > 0 && viewAllParks}
            </div>
          </div>
        )}{" "}
        {view === "Grand Teton National Park" && <div></div>}{" "}
        {view === "Zion National Park" && <div></div>}{" "}
        {view === "Yosemite National Park" && <div></div>}{" "}
        {view === "Yellowstone National Park" && <div></div>}{" "}
        {view === "Badlands National Park" && <div></div>}{" "}
        {view === "Joshua Tree National Park" && <div></div>}{" "}
        {view === "Info" && <div></div>}
      </div>
      <footer>
        <div id="foot">
          <div class="container">
            <p>HikersPlanner: Home</p>
            <p>Developed by Jacob Lehrman and Kenneth Tschida</p>
            <p>
              <i>
                Please note that all images used are compliant with internet
                copyright laws, being taken from creative commons licenses.
              </i>
            </p>
            <p class="float-end mb-1">
              <a id="return" href="#">
                Back to top
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
