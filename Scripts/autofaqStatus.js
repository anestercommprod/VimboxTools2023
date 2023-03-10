const invisibleCont = document.getElementById('invisibleContainer');
const statusCont = document.getElementById('statusContainer');
const buttonIntegrate = document.getElementById("fetchingButton");
let statusJSon;
let statusJSon_resolved;

let groupSelector = document.getElementById('employerGroupSelector');
let currentGroup = "";



function FetchingStatus()
{
    statusCont.innerHTML = "<p>Loading...</p>";
    
    fetch("https://skyeng.autofaq.ai/api/operators/statistic/currentState", {
    "headers": {
      "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
      "accept-language": "en-US,en;q=0.9,ru;q=0.8",
      "cache-control": "max-age=0",
      "sec-ch-ua": "\"Not?A_Brand\";v=\"8\", \"Chromium\";v=\"108\", \"Google Chrome\";v=\"108\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"Windows\"",
      "sec-fetch-dest": "document",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "none",
      "sec-fetch-user": "?1",
      "upgrade-insecure-requests": "1"
    },
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": null,
    "method": "GET",
    "mode": "cors",
    "credentials": "include"
  }).then(data => {
    statusJSon = data.json(); 
    statusJSon.then(value => {
        statusJSon_resolved = value;
        IntegrateEveryTechSup();
    })}).catch((error) => {
        statusCont.innerHTML = "<p>" + error + "<br><br>" + "Yet it can be related to network issues or site availability." + "<br><br>" + "Check if <a href='https://skyeng.autofaq.ai/login' target='_blank'>AutoFAQ</a> is even loads itself." + "</p>";
      });;
  
  console.log("clicked!");
}

function setCurrentGroup(){
    currentGroup = groupSelector.value;
    groupSelector.addEventListener('change', (event) => 
    {
        currentGroup = event.target.value;
    });
    switch(currentGroup){
        case "techSup1crm2":
            currentGroup = {option1: "(CRM2)", option2: "undefined"};
        break;
        case "techSup1chat":
            currentGroup = {option1: "????-", option2: "(CRM2)"};
        break;
        case "techSup2crm2":
            currentGroup = {option1: "????2-", option2: "undefined"};
            
        break;
        case "clientSupport1chat":
            currentGroup = {option1: "????-", option2: "undefined"};
        break;
        default:
            currentGroup = "undefined"
        break;
    }
}
function IntegrateEveryTechSup()
{
    console.log("initializing...");
  
    var nameCheckingString;
    var checkingElement;

    statusCont.innerHTML = "";
    setCurrentGroup();

    for (let i = 0; i < statusJSon_resolved.onOperator.length; i++) 
    {
        checkingElement = document.getElementById("employerTableCell_id" + i);      
        //Removing elements
        if(checkingElement)
        {
            console.log("deleted " + checkingElement.innerHTML);
            checkingElement.remove();
        }
    }

    setTimeout(() => 
    {
        for (let i = 0; i < statusJSon_resolved.onOperator.length; i++) 
        {
            nameCheckingString = statusJSon_resolved.onOperator[i].operator.fullName;
            checkingElement = document.getElementById("employerTableCell_id" + i);            
            
            //Adding html elements
            if(nameCheckingString.includes(currentGroup.option1) && !nameCheckingString.includes(currentGroup.option2))
            {
                var employerElement = document.createElement("div");
                if(!checkingElement)
                {
                    var employerElement_created = document.createElement("p");
                    var currentStatus = statusJSon_resolved.onOperator[i].operator.status;
                    var assignedChats = statusJSon_resolved.onOperator[i].aCnt;

                    switch(currentStatus)
                    {
                        case "Offline":
                            employerElement_created.className = "employerTableCell flexRowStart status_offline";
                        break;
                        case "Online":
                            employerElement_created.className = "employerTableCell flexRowStart status_online";
                        break;
                        case "Busy":
                            employerElement_created.className = "employerTableCell flexRowStart status_busy";
                        break;
                        case "Timeout":
                            employerElement_created.className = "employerTableCell flexRowStart status_timeout";
                        break;
                        case "Pause":
                            employerElement_created.className = "employerTableCell flexRowStart status_pause";
                        break;

                        default:
                            employerElement_created.className = "employerTableCell status_offline flexRowStart";
                        break;
                    }
                    employerElement_created.id = "employerTableCell_id" + i;
                    employerElement_created.innerHTML = Derussify(nameCheckingString) + " | " + currentStatus + " | Chats: " + Number(assignedChats);
                    statusCont.prepend(employerElement_created);
                }
                console.log("integrating: " + i + " | " + statusJSon_resolved.onOperator[i].operator.fullName);
            }
            else
            {
                console.log("not integrating, user doesn't belong to selected group(" + nameCheckingString + ")")
            }
        }     

        console.log("completed");

        setTimeout(() => {
            const offliners = document.querySelectorAll('.status_offline');
            for (let index = 0; index < offliners.length; index++) {
                invisibleCont.appendChild(offliners[index]);                
            }
            setTimeout(() => {  
                for (let index = 0; index < offliners.length; index++) {
                    statusCont.append(offliners[index]);                
                }
            }, 3);
        }, 3);
    }, 1);
}

function AddListeners()
{
    buttonIntegrate.addEventListener('click', function()
    {
        IntegrateEveryTechSup();
        PlayButtonAnimation(buttonIntegrate.id);
    });
}



// Executing
AddListeners();
FetchingStatus();

console.log("> AutoFAQ status receiver initialized successfully");