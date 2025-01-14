document.addEventListener("DOMContentLoaded", () => {
    const filterCountry = document.getElementById('filter-country');
    const filterCompany = document.getElementById('filter-company');
    const sortOrder = document.getElementById('sort-order'); // ID des Dropdown-Menüs
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
    function sortTable(order) {
        let rows = Array.from(table.rows);
        rows.sort((a, b) => {
            const co2A = parseInt(a.cells[2].textContent);
            const co2B = parseInt(b.cells[2].textContent);
            return order === 'asc' ? co2A - co2B : co2B - co2A;
        });
        
        // Sortierte Zeilen neu in das Tabellen-Body einfügen
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

    // Event-Listener für Filter und Sortierung
    filterCountry.addEventListener('change', filterTable);
    filterCompany.addEventListener('change', filterTable);
    sortOrder.addEventListener('change', () => {
        sortTable(sortOrder.value); // Wert des Dropdowns (asc/desc) übergeben
    });

    filterTable(); // Initiales Filtern


    $('#toggle-direction').click(function() {
        $('body').toggleClass(function(){
           return $(this).is('.rtl-direction, .ltr-direction') ? 'rtl-direction ltr-direction' : 'rtl-direction';
       })
     })
});
