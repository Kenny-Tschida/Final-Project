import { useState, useEffect } from "react";

function App() {
  const [view, setView] = useState("Home");
  const [park, setPark] = useState([]);

  useEffect(() => {
    console.log("Updated park state:", park);
  }, [park]); // This will log the updated value of park whenever it changes

  useEffect(() => {
    viewHome(); // Fetch park data on component mount
  }, []); // Empty dependency array ensures this effect runs only once on mount

  function viewHome() {
    fetch("http://localhost:8081/listParks")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data:", data);
        const nationalParks = data[0].National_Parks;
        setPark(nationalParks);
        console.log("Updated park state:", nationalParks);
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
            className="card-img-top"
            width="900"
            height="500"
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
          <div class="container">
            {/* Navigation Buttons */}
            <button class="btn btn-primary" onClick={viewHome}>
              Home
            </button>
          </div>
        </div>
      </header>
      <div class="px-5 py-3">
        {view === "Home" && (
          <div>
            <div className="row row-cols-1 row-cols-sm-2 g-2">
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
        {view === "Planner" && <div></div>}{" "}
        {view === "Info" && (
          <body>
            <div class="row">
              <div class="col m-5">
                <h2>
                  <strong>Jacob Lehrman</strong>
                </h2>
                <h4 id="contacts">Contact: jlehrman@iastate.edu</h4>
              </div>
              <div class="col my-5">
                <h2>
                  <strong>Kenneth Tschida</strong>
                </h2>
                <h4 id="contacts">Contact: ktschida@iastate.edu</h4>
              </div>
            </div>
            <div class="row">
              <div class="col m-5">
                <h2>
                  <strong>
                    SE/COMS 319 Spring 2024 - Construction of User Interfaces
                  </strong>
                </h2>
                <h3>Dr. Ali Jannesari</h3>
                <h3>April 24th, 2024</h3>
              </div>
              <div class="col m-5">
                <h3>
                  <strong>Project Description:</strong>
                </h3>
                <p>
                  Our names are Jacob Lehrman and Kenneth Tschida, and in this
                  project we display all of our knowlegdge and technical ability
                  when it comes to developing a website from what we've learned
                  in the class SE/COMS 319 - Construction of User Interfaces at
                  Iowa State University.
                </p>
              </div>
            </div>
          </body>
        )}
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