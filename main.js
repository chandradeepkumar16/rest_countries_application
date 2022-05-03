	const mainWrapper = document.querySelector(".mainWrapper");
const searchCountry = document.querySelector("input[type='search']");

let modalWrapper = document.createElement("div");
let countryArray = []; 
const fetchCountry = async(event) => {
	const apiEndpoint = `https://restcountries.com/v3.1/all`
	const countries = document.querySelector(".countries");

	await fetch(apiEndpoint)
		.then(response => response.json())
		.then(data => {
			console.log(data);
			data.forEach(element => {

				const { flags, name, population, region, capital } = element

				//const currency = element.currencies.name;
				let country = document.createElement("div");
				let imageBtn = document.createElement("button");
				let countryDetails = document.createElement("div");
				let img = document.createElement("img");


				countryArray.push(name.common);

				country.classList.add("allCountries");
				countryDetails.classList.add("paraName");

				img.classList.add("flags");
				img.alt = `${name.common}'s flag`;
				imageBtn.appendChild(img)
				imageBtn.classList.add("image-btn")

				countries.appendChild(country);
				country.appendChild(imageBtn)
				country.appendChild(countryDetails);

				countryDetails.innerHTML = `
				<div class="country-details-wrapper">				
				  	    <h2 class="country-details-title">
						   ${name.common}
						</h2>
						<div class="country-details-content">
				    		 <p class="country-population">
							     <span class="country-details-data-titles">Population:</span>
								 <span class="country-details-data-content">${population.toLocaleString()}</span>
							</p>
				       		 <p class="country-region">
								<span class="country-details-data-titles">Region:</span>
								<span class="country-details-data-content">${region}</span>
							 </p>
				        	 <p class="country-capital">
							 	<span class="country-details-data-titles">Capital:</span>
							 	<span class="country-details-data-content">${capital}</span>
							 </p>
						</div>
				</div>			  
				`

				img.src = `${flags.svg}`;


			});

		})
		.catch(error => console.log("Error :", error));
};

fetchCountry();

searchCountry.addEventListener("input", (e) => {
	const resultCountry = e.target.value;
	const availableCountries = Array.from(document.querySelectorAll(".country-details-title"));
	availableCountries.forEach(country => {
		const myCountry = country.innerHTML.toLowerCase().trim();
		if (myCountry === resultCountry.toLowerCase().trim()) {
			country.closest(".allCountries").classList.remove("hide-card")
		} else if (myCountry.includes(resultCountry.toLowerCase().trim())) {
			country.closest(".allCountries").classList.remove("hide-card")
		} else {
			country.closest(".allCountries").classList.add("hide-card")
		}
	})
})



