// home.js - Handles the rotating featured event on the home page

// Array of featured events (can be fetched from server in a real app)
const events = [
  {
    title: "Community Clean-up Day",
    date: "2025-05-15",
    location: "Local Park",
    image: "/images/cleanup.jpg",
    index: 0
  },
  {
    title: "Health Awareness Workshop",
    date: "2025-05-20",
    location: "Community Hall",
    image: "/images/health.jpg",
    index: 1
  },
  {
    title: "Youth Talent Show",
    date: "2025-05-25",
    location: "Civic Centre",
    image: "/images/talent.jpg",
    index: 2
  },
  {
    title: "Tech for Teens",
    date: "2025-05-31",
    location: "Library Auditorium",
    image: "/images/tech.jpg",
    index: 3
  },
  {
    title: "Elderly Care Awareness",
    date: "2025-06-06",
    location: "Sunrise Old Age Home",
    image: "/images/elderly.jpg",
    index: 4
  }
];

let currentIndex = 0;
const container = document.getElementById("featuredEvent");

/**
 * Render a single featured event card.
 * @param {Object} event - The event object to display.
 */
function renderEvent(event) {
  container.innerHTML = `
    <div class="card bg-transparent border-0">
      <a href="/events/${event.index}" tabindex="0" aria-label="View details for ${event.title}">
        <img src="${event.image}" class="card-img-top mb-3 rounded shadow" alt="${event.title}">
      </a>
      <div class="card-body text-white">
        <h5 class="card-title">
          <a href="/events/${event.index}" class="text-decoration-none text-white fw-bold">${event.title}</a>
        </h5>
        <p class="card-text text-white-50 small mb-1">
          <i class="bi bi-calendar-event me-1"></i> ${event.date}
        </p>
        <p class="card-text text-white-50 small">
          <i class="bi bi-geo-alt me-1"></i> ${event.location}
        </p>
      </div>
    </div>
  `;
}

// Initial render
renderEvent(events[currentIndex]);

/**
 * Cycle to the next event in the list.
 */
function showNextEvent() {
  container.style.opacity = 0;
  setTimeout(() => {
    currentIndex = (currentIndex + 1) % events.length;
    renderEvent(events[currentIndex]);
    container.style.opacity = 1;
  }, 300); // Fade out before showing next
}

// Automatically rotate featured event every 5 seconds
setInterval(showNextEvent, 5000);

// Optional: Allow user to manually cycle events with keyboard arrows
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") {
    showNextEvent();
  } else if (e.key === "ArrowLeft") {
    container.style.opacity = 0;
    setTimeout(() => {
      currentIndex = (currentIndex - 1 + events.length) % events.length;
      renderEvent(events[currentIndex]);
      container.style.opacity = 1;
    }, 300);
  }
});