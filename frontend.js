import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

function App() {
  const [view, setView] = useState("Home");
  const [park, setPark] = useState([]);
  const [hike, setHike] = useState([]);
  const [singleHike, setSingleHike] = useState({
    id: 0,
    title: "",
    distance: "",
    elevation: "",
    difficulty: "",
    image: "",
    duration: "",
    location: "",
    rating: 0,
  });
  const [planner, setPlanner] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    viewConfirm();
  };

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
        setPark(data);
        console.log("Updated park state:", data);
        setView("Home");
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  function handleParkView(parkName) {
    // Set the view based on the park name
    switch (parkName) {
      case "Grand Tetons National Park":
        fetch("http://localhost:8081/gethikes/1")
          .then((response) => response.json())
          .then((data) => {
            console.log("Fetched data:", data);
            setHike(data.hikes);
            setView(parkName);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
        break;
      case "Zion National Park":
        fetch("http://localhost:8081/gethikes/2")
          .then((response) => response.json())
          .then((data) => {
            console.log("Fetched data:", data);
            setHike(data.hikes);
            setView(parkName);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
        break;
      case "Yosemite National Park":
        fetch("http://localhost:8081/gethikes/3")
          .then((response) => response.json())
          .then((data) => {
            console.log("Fetched data:", data);
            setHike(data.hikes);
            setView(parkName);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
        break;
      case "Yellowstone National Park":
        fetch("http://localhost:8081/gethikes/4")
          .then((response) => response.json())
          .then((data) => {
            console.log("Fetched data:", data);
            setHike(data.hikes);
            setView(parkName);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
        break;
      case "Badlands National Park":
        fetch("http://localhost:8081/gethikes/5")
          .then((response) => response.json())
          .then((data) => {
            console.log("Fetched data:", data);
            setHike(data.hikes);
            setView(parkName);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
        break;
      case "Joshua Tree National Park":
        fetch("http://localhost:8081/gethikes/6")
          .then((response) => response.json())
          .then((data) => {
            console.log("Fetched data:", data);
            setHike(data.hikes);
            setView(parkName);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
        break;
      default:
        // Handle default case if needed
        break;
    }
  }

  function viewHike(data) {
    setSingleHike(data);
    setView("Hike");
  }

  function viewPlanner() {
    setView("Planner");
  }

  function viewConfirm() {
    setView("Confirm");
  }

  function viewInfo() {
    setView("Info");
  }

  const viewAllParks =
    park &&
    park.map((el) => (
      <div className="col" key={el.id}>
        <div id="lower" className="card shadow-sm">
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
            {/* Button to navigate to the respective park view */}
            <button
              className="btn btn-primary"
              onClick={() => handleParkView(el.name)}
            >
              View {el.name}
            </button>
          </div>
        </div>
      </div>
    ));

  const viewAllHikes = hike.map((el) => (
    <div className="col" key={el.id}>
      <div id="lower" className="card shadow-sm">
        <img
          src={el.image}
          className="card-img-top"
          width="500"
          height="400"
          alt="Hike"
        />
        <div className="card-body">
          <h5 className="card-text">
            <strong>{el.title}</strong>
          </h5>
          <p className="card-text">Distance: {el.distance}</p>
          <p className="card-text">Elevation: {el.elevation}</p>
          <p className="card-text">Duration: {el.duration}</p>
          <p className="card-text">Difficulty: {el.difficulty}</p>
          <p className="card-text">Rating: {el.rating}</p>
          <button className="btn btn-primary" onClick={() => viewHike(el)}>
            View {el.title}
          </button>
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
            <h1>HikersPlanner</h1>
            <div>
              {/* Navigation Buttons */}
              <button class="btn btn-primary" onClick={viewHome}>
                Home
              </button>
              <button class="btn btn-primary" onClick={viewPlanner}>
                Planner
              </button>
              <button class="btn btn-primary" onClick={viewInfo}>
                About
              </button>
            </div>
          </div>
        </div>
      </header>
      <div id="bod" class="px-5 py-3">
        {view === "Home" && (
          <div>
            <div id="con" class="container">
              <p id="trail">
                Below you will find all of the national parks we currently offer
                services for. All you need to do is click on the button of a
                park that interests you, and then you'll be viewing the many
                hikes that you can find in the respected park!
              </p>
            </div>
            <div id="column" className="row row-cols-1 row-cols-sm-2 g-2">
              {park && park.length > 0 && viewAllParks}
            </div>
          </div>
        )}{" "}
        {view === "Grand Tetons National Park" && (
          <div>
            <div>
              <div id="con" class="container">
                <p id="trail">
                  Below you will find all of the hikes we currently offer for
                  Grand Tetons National Park. All you need to do is click on the
                  button of a hike that interests you, and then you'll be
                  viewing the details of each hike!
                </p>
              </div>
              <div
                id="column"
                class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3"
              >
                {viewAllHikes}
              </div>
            </div>
          </div>
        )}{" "}
        {view === "Zion National Park" && (
          <div>
            <div>
              <div id="con" class="container">
                <p id="trail">
                  Below you will find all of the hikes we currently offer for
                  Zion National Park. All you need to do is click on the button
                  of a hike that interests you, and then you'll be viewing the
                  details of each hike!
                </p>
              </div>
              <div
                id="column"
                class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3"
              >
                {viewAllHikes}
              </div>
            </div>
          </div>
        )}{" "}
        {view === "Yosemite National Park" && (
          <div>
            <div>
              <div id="con" class="container">
                <p id="trail">
                  Below you will find all of the hikes we currently offer for
                  Yosemite National Park. All you need to do is click on the
                  button of a hike that interests you, and then you'll be
                  viewing the details of each hike!
                </p>
              </div>
              <div
                id="column"
                class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3"
              >
                {viewAllHikes}
              </div>
            </div>
          </div>
        )}{" "}
        {view === "Yellowstone National Park" && (
          <div>
            <div>
              <div id="con" class="container">
                <p id="trail">
                  Below you will find all of the hikes we currently offer for
                  Yellowstone National Park. All you need to do is click on the
                  button of a hike that interests you, and then you'll be
                  viewing the details of each hike!
                </p>
              </div>
              <div
                id="column"
                class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3"
              >
                {viewAllHikes}
              </div>
            </div>
          </div>
        )}{" "}
        {view === "Badlands National Park" && (
          <div>
            <div>
              <div id="con" class="container">
                <p id="trail">
                  Below you will find all of the hikes we currently offer for
                  Badlands National Park. All you need to do is click on the
                  button of a hike that interests you, and then you'll be
                  viewing the details of each hike!
                </p>
              </div>
              <div
                id="column"
                class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3"
              >
                {viewAllHikes}
              </div>
            </div>
          </div>
        )}{" "}
        {view === "Joshua Tree National Park" && (
          <div>
            <div>
              <div id="con" class="container">
                <p id="trail">
                  Below you will find all of the hikes we currently offer for
                  Joshua Tree National Park. All you need to do is click on the
                  button of a hike that interests you, and then you'll be
                  viewing the details of each hike!
                </p>
              </div>
              <div
                id="column"
                class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3"
              >
                {viewAllHikes}
              </div>
            </div>
          </div>
        )}{" "}
        {view === "Hike" && (
          <div>
            <div>
              <div id="divPic">
                <img
                  src={singleHike.image}
                  className="card-img-top"
                  width="500"
                  height="400"
                  alt="Hike"
                />
                <gmp-map id="map"
                  center={singleHike.location}
                  zoom="11"
                  map-id="DEMO_MAP_ID"
                >
                  <gmp-advanced-marker
                    position={singleHike.location}
                    title="Lakeshore Trail"
                  ></gmp-advanced-marker>
                </gmp-map>
              </div>
            </div>
            <div id="divTitle">
              <h1>
                <strong>{singleHike.title}</strong>
              </h1>
              <div id="divDescription">
                <p className="card-text">Distance: {singleHike.distance}</p>
                <p className="card-text">Elevation: {singleHike.elevation}</p>
                <p className="card-text">Duration: {singleHike.duration}</p>
                <p className="card-text">Difficulty: {singleHike.difficulty}</p>
                <p className="card-text">Rating: {singleHike.rating}</p>
              </div>
            </div>
          </div>
        )}{" "}
        {view === "Planner" && (
          <div>
            <form onSubmit={handleSubmit(onSubmit)} className="container mt-5">
              <div className="form-group">
                <input
                  {...register("fullName", { required: true })}
                  placeholder="Full Name"
                  className="form-control"
                />
                {errors.fullName && (
                  <p className="text-danger">Full Name is required.</p>
                )}
              </div>
              <div className="form-group">
                <input
                  {...register("email", {
                    required: true,
                    pattern: /^\S+@\S+$/i,
                  })}
                  placeholder="Email"
                  className="form-control"
                />
                {errors.email && (
                  <p className="text-danger">Email is required.</p>
                )}
              </div>
              <button class="btn btn-primary" type="submit">
                Submit
              </button>
            </form>
          </div>
        )}{" "}
        {view === "Confirm" && <div></div>}{" "}
        {view === "Info" && (
          <body>
            <div id="lower" class="row">
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
            <p>HikersPlanner</p>
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
