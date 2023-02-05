const endResultsContainer = document.getElementById('endResults');
const monthSelector = document.getElementById('monthSelector');
const auditButton = document.getElementById('auditButton');
const scheduleButton = document.getElementById('scheduleButton');

let newResults;



monthSelector.value = GetCurrentMonth();



function GetAudit()
{
    const base = `https://docs.google.com/spreadsheets/d/${localStorage.getItem('auditSheetID')}/gviz/tq?`;
    const sheetName = '2ndLineMonth' + monthSelector.value; //GetCurrentMonth();
    const query = encodeURIComponent('Select *')
    const request = `${base}&sheet=${sheetName}&tq=${query}`
    
        fetch(request, {})
            .then(res => res.text())
            .then(rep => {
                results = JSON.parse(/(?<=\()(.*?)(?=\);)/.exec(rep)[0]);
                newResults = results;
                FillAuditResults();
            });    
}
function GetCurrentMonth()
{
    const curDate = new Date();
    const curMonth = curDate.getMonth() + 1;
    return curMonth;
}


function FillAuditResults()
{
    endResultsContainer.innerHTML = "";

    if(newResults.table.rows[4] != undefined)
    {
        for (let i = 0; i < newResults.table.rows.length - 1; i++) {
                // Initializing
            const employeeElement = document.createElement('p');
            const name = newResults.table.rows[i].c[0].v.split(' ')[0] + " " + newResults.table.rows[i].c[0].v.split(' ')[1].slice(0, 1) + ".";
            const ticketsChecked = newResults.table.rows[i].c[1].v;
            const ticketsInTotal = newResults.table.rows[i].c[2].v;
            const auditPercent = newResults.table.rows[i].c[3].f;
            
                // Styling
            if(newResults.table.rows[i].c[3].v >= 0.95){
                employeeElement.className = "employeeRow bgGood";
            }
            if(newResults.table.rows[i].c[3].v >= 0.90 && newResults.table.rows[i].c[3].v <= 0.95){
                employeeElement.className = "employeeRow bgBad";
            }
            if(newResults.table.rows[i].c[3].v <= 0.90){
                employeeElement.className = "employeeRow bgDurak";
            }

                // Appending
            employeeElement.innerHTML = name + " | " + ticketsChecked + "/" + ticketsInTotal + " | " + auditPercent;
            endResultsContainer.appendChild(employeeElement);
        }
    }
    else{
        const employeeElement = document.createElement('p');
        employeeElement.innerHTML = "No data been found for that certain range.<br>Try going through previous month.";
        employeeElement.className = "errMsg";
        endResultsContainer.appendChild(employeeElement);
    }
}


function AddListeners()
{
    auditButton.addEventListener('click', function()
    {
        auditButton.style.animation = "";
        setTimeout(() => {
            auditButton.style.animation = "buttonHappyAdaptive 0.333s forwards";
        }, 32);
        
        GetAudit();
    });

    scheduleButton.addEventListener('click', function()
    {
        scheduleButton.style.animation = "";
        setTimeout(() => {
            scheduleButton.style.animation = "buttonHappyAdaptive 0.333s forwards";
        }, 32);
        
        chrome.tabs.create({ url: localStorage.getItem('scheduleSheetLink') });
    });
}



// Executing
AddListeners();