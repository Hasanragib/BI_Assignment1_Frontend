import { useParams } from "react-router-dom";
import useFetch from "../useFetch";

const EventsDetails = () => {
  const { topicName } = useParams();

  const { data, loading, error } = useFetch(
    `https://bi-assignment1-backend-39grncbmi-hasanragibs-projects.vercel.app/events/${topicName}`,
  );

  console.log(data);

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

  return (
    <div className="container py-4 bg-light">
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
      <hr />
      {data ? (
        <div className="row p-3">
          <div className="col-6">
            <h1>{data.topic}</h1>
            <span>
              <small className="text-body-secondary">Hosted By:</small>
            </span>
            <h4>{data.title}</h4>
            <img src={data.thumbnail} class="img-fluid mt-3" alt="..." />
            <h4 className="mt-4">Details:</h4>
            <p className="mt-3">{data.description}</p>
            <h4>Additional Information:</h4>
            <h6>
              Dress Code:{" "}
              <small className="text-body-secondary">
                {data.attendeeInfo.dressCode}
              </small>
            </h6>
            <h6>
              Age Restriction:{" "}
              <small className="text-body-secondary">
                {data.attendeeInfo.ageRestriction} and above
              </small>
            </h6>
            <h4 className="mt-4">Event Tags:</h4>
            <span className="badge text-bg-danger m-2">{data.tags[0]}</span>
            <span className="badge text-bg-danger m-2">{data.tags[1]}</span>
            <span className="badge text-bg-danger m-2">{data.tags[2]}</span>
          </div>
          <div className="col-2"></div>
          <div className="col-3">
            <div className="bg-white p-2">
              <div>
                <p className=" px-2 mb-0">
                  <small>Timing:</small>
                </p>
                <p className="mb-0 px-4">
                  <small>{formatMeetupDate(data.schedule.startTime)} </small>
                  <small>To</small>
                </p>
                <p className="mb-0 px-4">
                  <small>{formatMeetupDate(data.schedule.startTime)} </small>
                </p>
              </div>
              <div className="mt-4">
                <p className=" px-2 mb-0">
                  <small>Address:</small>
                </p>
                <p className="px-4 mb-0">
                  <small>{data.location.venueName}</small>
                </p>
                <p className="px-4 mb-0">
                  <small>
                    {data.location.address}, {data.location.city}
                  </small>
                </p>
              </div>
              <div className="mt-4">
                <p className="px-2">
                  <small>₹ {data.pricing}</small>
                </p>
              </div>
            </div>
            <div className="mt-4">
              <div>
                <h4>Speakers: ({data.speakers?.length || 0})</h4>
              </div>
              <div>
                <div className="row g-3">
                  {" "}
                  {/* g-3 adds a nice gap between speaker cards */}
                  {data.speakers?.map((speaker, index) => (
                    <div className="col" key={index}>
                      {/* card: white bg, small shadow, rounded corners, fixed width */}
                      <div
                        className="card h-100 border-light shadow-sm text-center p-3"
                        style={{ width: "180px" }}
                      >
                        {/* Profile Image: rounded-circle makes it a round, mx-auto centers it */}
                        <img
                          src={speaker.profileImage}
                          className="rounded-circle mx-auto mb-3"
                          alt={speaker.name}
                          style={{
                            width: "80px",
                            height: "80px",
                            objectFit: "cover",
                          }}
                        />

                        <div className="card-body p-0">
                          <h6 className="card-title fw-bold mb-1">
                            {speaker.name}
                          </h6>
                          <p className="card-text text-muted small">
                            {speaker.role}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        loading && <p>Loading</p>
      )}
    </div>
  );
};

export default EventsDetails;
