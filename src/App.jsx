import { Routes, Route, Link } from "react-router-dom"; // Remove 'BrowserRouter as Router'
import Events from "./components/Events";
import EventsDetails from "./components/EventsDetails";

function App() {
  return (
    <div className="container">
      <nav>
        <Link to="/events">
          <button className="btn btn-primary">Events</button>
        </Link>
      </nav>
    </div>
  );
}

export default App;
