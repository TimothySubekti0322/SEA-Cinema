fetch("https://seleksi-sea-2023.vercel.app/api/movies")
  .then((response) => response.json())
  .then((data) => {
    const movieListContainer = document.getElementById("movie-list");

    // Loop through each movie and create a movie item using the template
    data.forEach((movie) => {
      const movieItem = document.createElement("div");
      movieItem, (className = "col");
      movieItem.innerHTML = `                <div class="card shadow-sm">
                    <img src="${movie.poster_url}"
                        alt="${movie.title} poster">
                    <title>${movie.title}</title>
                    <div class="card-body" style="background-color: #032055;">
                        <h3 class="card-text" style="color: #fff; text-align: center; padding: 10px 0px;">${movie.title}</h3>
                        <hr style="border: 1px solid #fff;" />
                        <div class="d-flex justify-content-between align-items-center bottom-section">
                            <div class="btn-group gap-3" style="padding: 10px 0px display">
                                <button type="submit" name="details" value = ${movie.id} class="btn btn-primary btn-sm"
                                    style="border: 0px; border-radius: 4px;">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                        class="bi bi-info-circle" viewBox="0 0 16 16">
                                        <path
                                            d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z">
                                        </path>
                                        <path
                                            d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z">
                                        </path>
                                    </svg>
                                    <span>details</span>
                                </button>
                                <button type="button" class="btn btn-primary btn-sm"
                                    style="border: 0px; border-radius: 4px;">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                        class="bi bi-cart3" viewBox="0 0 16 16">
                                        <path
                                            d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                                    </svg>
                                    <span>get ticket</span>
                                </button>
                            </div>
                            <small class="small" style="color: #fff;">Rp ${movie.ticket_price}</small>
                        </div>
                    </div>
                </div>`;
      movieListContainer.appendChild(movieItem);
    });
  })
  .catch((error) => {
    console.log("An error occurred:", error);
  });
