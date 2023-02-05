const buttonReset = document.getElementById('extensionReset');

const saveSheet = document.getElementById('saveSheetID');
const sheetInput = document.getElementById('googleSheetInput');

const saveAuditSheet = document.getElementById('saveAuditSheetID');
const sheetAuditInput = document.getElementById('auditSheetInput');

const saveScheduleSheet = document.getElementById('saveScheduleSheetID');
const sheetScheduleInput = document.getElementById('scheduleSheetInput');

const saveAccountIDs = document.getElementById('saveTestIDs');
const accountTeacherID = document.getElementById('testTeacherID');
const accountStudentID = document.getElementById('testStudentID');

function InitSettingsHandler()
{
    saveSheet.addEventListener('click', function(){
        localStorage.setItem('sheetID', sheetInput.value);
    });
    saveAuditSheet.addEventListener('click', function(){
        localStorage.setItem('auditSheetID', sheetAuditInput.value);
    });
    saveScheduleSheet.addEventListener('click', function(){
        localStorage.setItem('scheduleSheetLink', sheetScheduleInput.value);
    });

    saveAccountIDs.addEventListener('click', function(){
        localStorage.setItem('testTeacherID', accountTeacherID.value);
        localStorage.setItem('testStudentID', accountStudentID.value);
    });
    
    buttonReset.addEventListener('click', function(){
        localStorage.removeItem('sheetID');
        localStorage.removeItem('auditSheetID');
        localStorage.removeItem('scheduleSheetLink');
        localStorage.removeItem('testTeacherID');
        localStorage.removeItem('testStudentID');
        localStorage.removeItem('userRole');

        DisplayCurrentSelection();
    });
}

function DisplayCurrentSelection()
{
    sheetInput.value = localStorage.getItem('sheetID');
    sheetAuditInput.value = localStorage.getItem('auditSheetID');
    sheetScheduleInput.value = localStorage.getItem('scheduleSheetLink');

    accountTeacherID.value = localStorage.getItem('testTeacherID');
    accountStudentID.value = localStorage.getItem('testStudentID');
}

function AboutTheRole()
{
    document.addEventListener('keydown', function(event) {
        if (event.ctrlKey && event.key === 'y') {
          localStorage.setItem('userRole', 'Dev');
          console.log('we good, ' + localStorage.getItem('userRole'));
        }
      });
}

function GreatAnims()
{
    buttonReset.addEventListener('click', function()
    {
        buttonReset.style.animation = "";
        setTimeout(() => {
            buttonReset.style.animation = "buttonHappyAdaptive 0.333s forwards";
        }, 32);
    });
    saveSheet.addEventListener('click', function()
    {
        saveSheet.style.animation = "";
        setTimeout(() => {
            saveSheet.style.animation = "buttonHappyAdaptive 0.333s forwards";
        }, 32);
    });
    saveAuditSheet.addEventListener('click', function()
    {
        saveAuditSheet.style.animation = "";
        setTimeout(() => {
            saveAuditSheet.style.animation = "buttonHappyAdaptive 0.333s forwards";
        }, 32);
    });
    saveScheduleSheet.addEventListener('click', function()
    {
        saveScheduleSheet.style.animation = "";
        setTimeout(() => {
            saveScheduleSheet.style.animation = "buttonHappyAdaptive 0.333s forwards";
        }, 32);
    });
    saveAccountIDs.addEventListener('click', function()
    {
        saveAccountIDs.style.animation = "";
        setTimeout(() => {
            saveAccountIDs.style.animation = "buttonHappyAdaptive 0.333s forwards";
        }, 32);
    });
}

    // Executing
InitSettingsHandler();
DisplayCurrentSelection();
AboutTheRole();
GreatAnims();