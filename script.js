const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

populateUI();

let ticketPrice = parseInt(movieSelect.value);

//save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem("selectMovieIndex", movieIndex);
    localStorage.setItem("selectMoviePrice", moviePrice);
}

//update total and count
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll(".row .seat .selected");

    const seatIndex = [...selectedSeats].map(seat => ["seats".indexOf(seat)]);
    localStorage.setItem("selectedSeats", JSON.stringify(seatIndex));

    const selectedSeatsCount = selectedSeats.length;
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}

//get data from local storage and populate ui
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

    if (selectedSeats !== null && selectedSeats.legnth > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add("selected");
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem("selectMovieIndex");

    if (selectedMovieIndex !== null) {
        movieSelect.selectIndex = selectMovieIndex;
    }


}

//moviue select event
movieSelect.addEventListener("change", e => {
    ticketPrice = +e.target.value;
    updateSelectedCount();
})



//seat click event
container.addEventListener("click", e => {
    if (
        e.target.classList.contains("seat") &&
        !e.target.classList.contains("occupied")
    ) {
        e.target.clasList.toggle("selected");

        updateSelectedCount();
    }
});

//initial count and total set
updateSelectedCount();