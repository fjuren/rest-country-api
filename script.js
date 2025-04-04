document
  .getElementById('search-button')
  .addEventListener('click', async (e) => {
    e.preventDefault();
    const countrySearch = document.getElementById('search-input').value;

    if (!countrySearch.trim()) {
      document.getElementById('error-message').style.display = 'block';
      document.getElementById('results-container').style.display = 'none';
      return;
    }

    try {
      const apiEndpoint = `https://restcountries.com/v3.1/name/${countrySearch}`;
      const res = await fetch(apiEndpoint);
      const data = await res.json();

      if (data.status === 404 || data.message) {
        // display error message
        document.getElementById('error-message').style.display = 'block';
        document.getElementById('results-container').style.display = 'none';
      } else {
        document.getElementById('error-message').style.display = 'none';
        document.getElementById('results-container').style.display = 'block';

        // just get first result from array for simplicity
        const firstObj = data[0];

        // Flag
        document.getElementById('flag-img').src = firstObj.flags.png;
        document.getElementById('flag-img').alt =
          firstObj.flags.alt || `Flag of ${firstObj.name.common}`;

        // Common country name
        document.getElementById('country-name').innerHTML =
          firstObj.name.common;

        // Official country name
        document.getElementById('official-name').innerHTML =
          firstObj.name.official;

        // Capital
        document.getElementById('capital-city').innerHTML = firstObj.capital
          ? firstObj.capital.join(', ')
          : 'N/A';

        // Population
        document.getElementById('population').innerHTML =
          firstObj.population.toLocaleString();

        // Region
        document.getElementById('region').innerHTML = firstObj.region || 'N/A';

        // Subregion
        document.getElementById('subregion').innerHTML =
          firstObj.subregion || firstObj.continents.join(', ') || 'N/A';

        // Languages
        const languagesArray = firstObj.languages
          ? Object.values(firstObj.languages)
          : [];
        document.getElementById('languages').innerHTML =
          languagesArray.length > 0 ? languagesArray.join(', ') : 'N/A';

        // Currencies (extract names & symbols)
        let currencyText = 'N/A';
        if (firstObj.currencies) {
          const currencyEntries = Object.entries(firstObj.currencies);
          console.log(currencyEntries);
          if (currencyEntries.length > 0) {
            currencyText = currencyEntries
              .map(([code, currency]) => {
                return `${currency.name} (${currency.symbol || code})`;
              })
              .join(', ');
          }
        }
        document.getElementById('currencies').innerHTML = currencyText;

        // Area (format with commas and add km)
        document.getElementById('area').innerHTML = firstObj.area
          ? `${firstObj.area.toLocaleString()} km²`
          : 'N/A';
      }
    } catch (error) {
      console.error('Error fetching country data:', error);
      document.getElementById('error-message').style.display = 'block';
      document.getElementById('results-container').style.display = 'none';
    }
  });
