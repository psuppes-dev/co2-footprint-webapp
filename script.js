document.addEventListener("DOMContentLoaded", () => {
    const filterCountry = document.getElementById('filter-country');
    const filterCompany = document.getElementById('filter-company');
    const sortBtn = document.getElementById('sort-btn');
    const table = document.getElementById('co2-table').getElementsByTagName('tbody')[0];
    const links = document.querySelectorAll("nav ul li a");
    const sections = document.querySelectorAll("main section");

    // Funktion zum Filtern der Tabelle
    function filterTable() {
        const countryFilter = filterCountry.value.toLowerCase();
        const companyFilter = filterCompany.value.toLowerCase();
        
        for (let row of table.rows) {
            const country = row.cells[0].textContent.toLowerCase();
            const company = row.cells[1].textContent.toLowerCase();
            
            if ((country.includes(countryFilter) || countryFilter === '') &&
                (company.includes(companyFilter) || companyFilter === '')) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        }
    }

    // Funktion zum Sortieren nach CO2-Emissionen
    function sortTable() {
        let rows = Array.from(table.rows);
        rows.sort((a, b) => {
            const co2A = parseInt(a.cells[2].textContent);
            const co2B = parseInt(b.cells[2].textContent);
            return co2A - co2B;
        });
        
        for (let row of rows) {
            table.appendChild(row);
        }
    }

    // Umschalten der Sektionen (Home, Über uns, Kontakt)
    links.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetID = link.getAttribute("href").substring(1);

            sections.forEach(section => {
                section.style.display = "none";
            });

            document.getElementById(targetID).style.display = "block";
        });
    });

    filterCountry.addEventListener('change', filterTable);
    filterCompany.addEventListener('change', filterTable);
    sortBtn.addEventListener('click', sortTable);
    filterTable();
});
