import { ExternalLink, MapPin, Building2 } from "lucide-react";

const events = [
  {
    title: " Tree Plantation Drives",
    organizer: "MY Bharat",
    location: "Across India",
    description:
      "Participate in government-supported tree plantation campaigns and volunteer opportunities.",
    link: "https://mybharat.gov.in/",
  },
  {
    title: " Swachh Bharat Mission",
    organizer: "Government of India",
    location: "Nationwide",
    description:
      "Join cleanliness campaigns and sanitation awareness programs.",
    link: "https://swachhbharatmission.gov.in/",
  },
  {
    title: " Beach Cleanup Activities",
    organizer: "GVMC",
    location: "Visakhapatnam",
    description:
      "Stay updated with beach cleanup initiatives and environmental activities.",
    link: "https://www.gvmc.gov.in/",
  },
  {
    title: " Plastic Waste Management",
    organizer: "Central Pollution Control Board",
    location: "India",
    description:
      "Learn about plastic waste management and recycling programs.",
    link: "https://cpcb.nic.in/",
  },
  {
    title: " World Environment Day",
    organizer: "Ministry of Environment",
    location: "India",
    description:
      "Explore official environmental awareness campaigns and celebrations.",
    link: "https://moef.gov.in/",
  },
];

const Events = () => {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero Section */}
      <div className="bg-green-700 text-white py-16 px-6 text-center">

        <h1 className="text-5xl font-bold mb-4">
           Environmental Initiatives & Events
        </h1>

        <p className="text-lg max-w-3xl mx-auto">
          Discover official government environmental campaigns,
          municipal initiatives and volunteer opportunities.
        </p>

      </div>

      {/* Cards */}
      <div className="max-w-7xl mx-auto py-12 px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-8">

        {events.map((event, index) => (

          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition duration-300"
          >
            <h2 className="text-2xl font-bold mb-4">
              {event.title}
            </h2>

            <div className="flex items-center gap-2 text-green-700 mb-2">
              <Building2 size={18} />
              <span>{event.organizer}</span>
            </div>

            <div className="flex items-center gap-2 text-gray-500 mb-4">
              <MapPin size={18} />
              <span>{event.location}</span>
            </div>

            <p className="text-gray-600 mb-6">
              {event.description}
            </p>

            <a
              href={event.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg"
            >
              View Official Website
              <ExternalLink size={18} />
            </a>

          </div>

        ))}

      </div>

    </div>
  );
};

export default Events;