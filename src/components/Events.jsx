import useFetch from "../useFetch";
import { useState } from "react";

const Events = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchByType, setSearchByType] = useState("");
  const { data, loading, error } = useFetch(
    "https://bi-assignment1-backend-39grncbmi-hasanragibs-projects.vercel.app/events",
  );

  // console.log(data);

  // Helper function to format the date
  const formatMeetupDate = (dateString) => {
    const date = new Date(dateString);

    // Get parts manually to avoid default comma separators
    const day = date.toLocaleString("en-IN", { weekday: "short" });
    const month = date.toLocaleString("en-IN", { month: "short" });
    const dayNum = date.getDate();
    const year = date.getFullYear();
    const time = date
      .toLocaleString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
      .toUpperCase(); // AM/PM

    return `${day} ${month} ${dayNum} ${year} ${time} IST`;
  };

  const filteredEvents = data
    ? data.filter((event) => {
        // 1. Topic/Tags Filter
        const query = searchQuery.toLowerCase().trim();
        const matchesSearch =
          query === "" ||
          event.topic.toLowerCase().includes(query) ||
          event.tags?.some((tag) => tag.toLowerCase().includes(query));

        // 2. Type Filter (Handling "Both")
        const typeQuery = searchByType.toLowerCase().trim();
        const matchesType =
          typeQuery === "" ||
          typeQuery === "both" ||
          event.eventType.toLowerCase() === typeQuery;

        return matchesSearch && matchesType;
      })
    : [];

  return (
    <div className="container py-4 bg-light">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1
          className="fs-2 text-danger"
          style={{
            fontFamily: "'Pacifico', cursive",
            fontWeight: "normal", // Cursive fonts usually don't need bold
            fontSize: "2.5rem",
          }}
        >
          Meetup
        </h1>
        <div className="d-flex gap-2">
          <input
            type="text"
            className="form-control"
            style={{ width: "250px" }} // Optional: give it a set width
            placeholder="Search by title"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <hr />
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fs-3">Meetup Events</h2>
        <div className="d-flex gap-2">
          {/* Dropdown for Online/Offline/Both */}
          <select
            className="form-select"
            style={{ width: "200px" }}
            value={searchByType}
            onChange={(e) => setSearchByType(e.target.value)}
          >
            <option value="Both">Both</option>
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
          </select>
        </div>
      </div>

      <div className="row row-cols-1 row-cols-md-3 g-4">
        {filteredEvents
          ? filteredEvents.map((event) => (
              <div className="col" key={event._id}>
                <div className="card h-100 shadow-sm">
                  {/* The image container section creates the 'anchor' for the absolute badge */}
                  <div className="card-img-container position-relative overflow-hidden">
                    <img
                      src={event.thumbnail}
                      className="card-img-top"
                      alt={`Image of ${event.topic}`}
                      style={{ objectFit: "cover", height: "220px" }} // Ensures images align well
                    />

                    {/* 🚀 THE OVERLAY BADGE (POSITIONED TOP-RIGHT) */}
                    <span
                      className={`badge position-absolute top-0 end-0 m-2 z-1 shadow-sm fs-7 
          ${event.eventType.toLowerCase() === "online" ? "bg-success" : "bg-primary"}
        `}
                    >
                      {event.eventType} Event
                    </span>
                    {/* 🚀 END OVERLAY BADGE */}
                  </div>
                  <div className="card-body">
                    <span className="card-text">
                      <small className="text-body-secondary">
                        {formatMeetupDate(event.schedule.eventDate)}
                      </small>
                    </span>
                    <h5 className="card-title">{event.topic}</h5>
                  </div>
                </div>
              </div>
            ))
          : loading && <p>Loading</p>}
      </div>
    </div>
  );
};

export default Events;
