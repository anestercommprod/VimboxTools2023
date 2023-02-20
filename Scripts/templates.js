const selectorElement = document.getElementById('techSup_templates_selector');
const templateText_p = document.getElementById('templateText');
const buttonCopy = document.getElementById('buttonCopy');

var sheetId = '1vSY4mgMXcwP05RmnTd9uUpSyOyrxjZ_bYmHb3zsDVwg';
var curShablon_index = 1;
var maxShablon_index = 3;

let results = "";
let newResults = "";


function FirstInitialization(){
    if(localStorage.getItem('agreementStatus_2022_7_0133') == null)
    {
        localStorage.setItem('agreementStatus_2022_7_0133', 'true');
        alert('Расширение Vimbox Tools v2022.7.0133 было установлено впервые либо сброшено. \nЛицензионое соглашение на использование ПО автоматически подписано. \nПодробно ознакомиться с лицензией пользования можно ознакомиться в пункте "#Справка" > "Заявления конфиденцииальности".');
    }
}

function init() {
    if(localStorage.getItem('sheetID') != null){
        sheetId = localStorage.getItem('sheetID');
    }
    else{
        localStorage.setItem('sheetID', '1vSY4mgMXcwP05RmnTd9uUpSyOyrxjZ_bYmHb3zsDVwg');
    }

	const base = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?`;
	const sheetName = 'user-data';
	const query = encodeURIComponent('Select *')
	const request = `${base}&sheet=${sheetName}&tq=${query}`

    fetch(request, {})
        .then(res => res.text())
        .then(rep => {
            results = JSON.parse(/(?<=\()(.*?)(?=\);)/.exec(rep)[0]);
            newResults = results;
            maxShablon_index = newResults.table.rows[0].c[2].v;

            addSelectorOption();
            curShablon_index = Number(1);
            checkCurrentSelectorState();
        })
};
function addSelectorOption(){
    if(newResults == null)
    {
        init();
    }

    try
    {
        for (var i = 1; i<=maxShablon_index; i++){
            curShablon_index = i;
    
            newSelectorOptionName = newResults.table.rows[curShablon_index].c[1].v;
            var opt = document.createElement('option');
            opt.value = newSelectorOptionName + "_" + i;
            opt.innerHTML = newSelectorOptionName;
            opt.id = "selectorOption_" + i;
            selectorElement.appendChild(opt);

            console.log(i);
        }
    }
    catch(e)
    {
        document.getElementById("curShablonText").innerHTML = 'произошла ошибка при парсинге, попробуй ещё раз. <br><br>Если не помогло, сбрось расширение перейдя в "Инструменты".';

        var opt = document.createElement('option');
        opt.value = newSelectorOptionName + "_" + 1;
        opt.innerHTML = '#UDF!';
        opt.id = "selectorOption_" + 1;
        selectorElement.appendChild(opt);
    }
}

function checkCurrentSelectorState(){
    selectorElement.options[selectorElement.selectedIndex].value;

    selectorElement.addEventListener('change', function() 
    {
        curShablon_index = this.selectedIndex + new Number(1);
        console.log('You selected: ', curShablon_index);
        templateText_p.innerHTML = results.table.rows[curShablon_index].c[0].v;
    });
    buttonCopy.addEventListener('click', function()
    {
        copyStringToClipboard(templateText_p.innerHTML);

            // Animations
        PlayButtonAnimation(buttonCopy.id);
    })

    templateText_p.innerHTML = results.table.rows[curShablon_index].c[0].v;
}




function copyStringToClipboard (str) {
    // Create new element
    var el = document.createElement('textarea');
    // Set value (string to be copied)
    el.value = str;
    // Set non-editable to avoid focus and move outside of view
    el.setAttribute('readonly', '');
    el.style = {position: 'absolute', left: '-9999px'};
    document.body.appendChild(el);
    // Select text inside element
    el.select();
    // Copy text to clipboard
    document.execCommand("copy");
    // Remove temporary element
    document.body.removeChild(el);
}




// Executing
FirstInitialization();
init();