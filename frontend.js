import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import jImage from "./images/IMG_1284.jpeg";
import kImage from "./images/IMG_3037.PNG";

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
  const [whatParks, setWhatParks] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [dataF, setDataF] = useState({});
  const [message, setMessage] = useState("");

  const updateHooks = () => {
    setPlanner([]);
    setWhatParks([]);
    setView("Home");
    setDataF(dataF);
    setSingleHike(singleHike);
  };

  const onSubmit = (data) => {
    if (planner.length > 0) {
      setDataF(data);
      viewConfirm();
    } else {
      console.log("Please select at least one hike before submitting.");
    }
  };

  useEffect(() => {
    console.log("Updated park state:", park);
  }, [park]);

  useEffect(() => {
    viewHome();
  }, []);

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
  function viewAdminLogin() {
    setView("Login");
  }
  function viewAdminPage(){
    setView("Admin");
  }
  function checkPass(){
    var text1 = document.getElementById("text1").value;
    if(text1=="LOL"){
      viewAdminPage();
    } else{
      viewAdminLogin();
      var info = document.getElementById("status");
      info.innerHTML = "<p style=color:red>Password Incorrect</p>"
    }
  }
  function deleteMethod(id, id2) {
    console.log("Call Delete ", id, id2);
    fetch("http://localhost:8081/deleteProduct", {
      method: "DELETE",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        id: id,
        id2: id2
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        document.getElementById("showDeleteData").innerHTML = JSON.stringify(data);
      })
      .catch((err) => console.log("Error:" + err));
  }
  function getDeleteMethod() {
    var id = parseInt(document.getElementById("deleteIntegerInput").value);
    fetch("http://localhost:8081/" + id)
      .then((response) => response.json())
      .then((data) => {
        setSingleHike(data);
      });
  }

  function deleteButton() {
    var inputElement = document.getElementById("deleteIntegerInput");
    var inputValue = inputElement.value;
    deleteMethod(inputValue);
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
              id="return"
              href="#"
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
          <button
            className="btn btn-secondary"
            onClick={() => addToPlanner(el)}
          >
            Add
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => removeFromPlanner(el)}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  ));

  const displayMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 3000); // Clear message after 3 seconds
  };

  const addToPlanner = (el) => {
    const updatedPlanner = Array.isArray(planner) ? planner.slice() : [];
    const isHikeAlreadyAdded = updatedPlanner.some(
      (plannerHike) => plannerHike.title === el.title
    );

    if (!isHikeAlreadyAdded) {
      updatedPlanner.push(el);
      setPlanner(updatedPlanner);
      if (!whatParks.includes(el.park)) {
        setWhatParks((prevParks) => [...prevParks, el.park]);
      }
      displayMessage(`${el.title} added to planner.`);
    } else {
      displayMessage("Error: Hike is already in Planner");
    }
  };

  const removeFromPlanner = (el) => {
    const updatedPlanner = Array.isArray(planner) ? planner.slice() : [];
    const filteredPlanner = updatedPlanner.filter(
      (plannerHike) => plannerHike.title !== el.title
    );
    if (updatedPlanner.length === filteredPlanner.length) {
      displayMessage(`Error: ${el.title} not found in planner.`);
    } else {
      displayMessage(`${el.title} removed from planner.`);
      setPlanner(filteredPlanner);
      const parkHikes = planner.some((hike) => hike.park === el.park);
      if (!parkHikes) {
        setWhatParks((prevParks) =>
          prevParks.filter((park) => park !== el.park)
        );
      }
    }
  };

  const listPlannerHikes =
    Array.isArray(planner) &&
    planner.map((el) => (
      <div className="col" key={el.id}>
        <div id="lower" className="card shadow-sm">
          <img
            className="card-img-top"
            alt="Hike"
            src={el.image}
            width={500}
            height={400}
          />
          <div className="card-body">
            <div className="card-text">{el.title}</div>
            <div className="card-text">{el.park}</div>
            {view !== "Confirm" && (
              <button
                className="btn btn-secondary"
                onClick={() => removeFromPlanner(el)}
              >
                Remove from Planner
              </button>
            )}
          </div>
        </div>
      </div>
    ));

  const listWhatParks = () => {
    return whatParks.map((park, index) => {
      if (index === whatParks.length - 1) {
        return park;
      } else {
        return park + ", ";
      }
    });
  };

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
              <button class="btn btn-primary" onClick={viewAdminLogin}>
                Admin Login
              </button>
            </div>
          </div>
        </div>
      </header>
      <div id="bod" class="px-5 py-3">
        <div id="trail">{message}</div>
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
          <div className="container mt-5">
            <div id="column" class="row row-cols-1 g-1">
              <div className="d-flex flex-row">
                <div id="lower" className="card shadow-sm">
                  <img
                    src={singleHike.image}
                    className="card-img-top"
                    width="500"
                    height="400"
                    alt="Hike"
                  />
                  <div className="card-body">
                    <h5 className="card-text">
                      <strong>{singleHike.title}</strong>
                    </h5>
                    <p className="card-text">Distance: {singleHike.distance}</p>
                    <p className="card-text">
                      Elevation: {singleHike.elevation}
                    </p>
                    <p className="card-text">Duration: {singleHike.duration}</p>
                    <p className="card-text">
                      Difficulty: {singleHike.difficulty}
                    </p>
                    <p className="card-text">Rating: {singleHike.rating}</p>
                  </div>
                </div>
                <div id="lower" className="card shadow-sm">
                  <gmp-map
                    id="map"
                    center={singleHike.location}
                    zoom="11"
                    map-id="DEMO_MAP_ID"
                  >
                    <gmp-advanced-marker
                      position={singleHike.location}
                    ></gmp-advanced-marker>
                  </gmp-map>
                  <div className="card-body">
                    <h5 className="card-text">
                      <strong>Located in {singleHike.park}</strong>
                    </h5>
                    <h6>Coordinates: {singleHike.location}</h6>
                  </div>
                </div>
              </div>
            </div>
            <button
              className="btn btn-primary"
              onClick={() => setView(singleHike.park)}
            >
              Return to {singleHike.park}
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => addToPlanner(singleHike)}
            >
              Add
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => removeFromPlanner(singleHike)}
            >
              Remove
            </button>
          </div>
        )}{" "}
        {view === "Planner" && (
          <div className="container mt-5">
            <div id="title">
              <div>
                <h4>Visited National Parks: {listWhatParks()}</h4>
                <h4>Number of hikes selected: {planner.length}</h4>
                <h6>
                  <i>
                    Please note that you must select at least one hike before
                    submitting
                  </i>
                </h6>
              </div>
            </div>
            <div id="column" class="row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
              {listPlannerHikes}
            </div>
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
        {view === "Confirm" && (
          <div>
            <div className="container mt-5">
              <h1 id="title">Planner summary:</h1>
              <h4 id="title">National Parks Visited: {listWhatParks()}</h4>
              <h4 id="title">Hikes Selected: {planner.length}</h4>
              <div
                id="column"
                class="row-cols-1 row-cols-sm-2 row-cols-md-3 g-3"
              >
                {listPlannerHikes}
              </div>
              <h1 id="title">Contact summary:</h1>
              <h4 id="title">Name: {dataF.fullName}</h4>
              <h4 id="title">Email: {dataF.email}</h4>
              <form
                onSubmit={handleSubmit(updateHooks)}
                className="container mt-5"
              >
                <div className="form-group">
                  <input
                    {...register("Feedback", { required: false })}
                    placeholder="Feedback"
                    className="form-control"
                  />
                </div>
                <button class="btn btn-primary" type="submit">
                  Back to Home
                </button>
              </form>
            </div>
          </div>
        )}{" "}
        {view === "Info" && (
          <body>
            <div id="lower" class="row">
              <div class="col m-5">
                <h2>
                  <strong>Jacob Lehrman</strong>
                </h2>
                <h4 id="contacts">Contact: jlehrman@iastate.edu</h4>
                <img src={jImage} alt="JAKE!" height="350px"></img>
              </div>
              <div class="col my-5">
                <h2>
                  <strong>Kenneth Tschida</strong>
                </h2>
                <h4 id="contacts">Contact: ktschida@iastate.edu</h4>
                <img src={kImage} alt="KENNY!" height="350px"></img>
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
        {view === "Login" && (
            <div className="container mt-5">
            <div id="title">
              <h1>Please Input the admin password.</h1>
            </div>
            <input id="text1" type="text"></input>
            <button class="btn btn-primary" onClick={checkPass} >Login</button>
            <div id="status"></div>
            </div>
        )}
        {view === "Admin" && (
          <div>
          <h1 class="py-3">Delete Method</h1>
          <label htmlFor="deleteIntegerInput">Hike Title: </label>
          <input
            id="deleteIntegerInput"
          />
          <button class="btn btn-primary" onClick={deleteButton}>
            Delete
          </button>

          <h1>Output:</h1>
          <pre id="showDeleteData"></pre>
        </div>
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
