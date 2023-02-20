if(localStorage.getItem('sheetID') == null)
{
    localStorage.setItem('sheetID', '1vSY4mgMXcwP05RmnTd9uUpSyOyrxjZ_bYmHb3zsDVwg');
}
if(localStorage.getItem('auditSheetID') == null)
{
    localStorage.setItem('auditSheetID', '1mf9pFgyHu6M4LYvEaDt8xUDx0Ie2N1IbZZ7f54hFnJQ');
}
if(localStorage.getItem('scheduleSheetLink') == null)
{
    localStorage.setItem('scheduleSheetLink', 'https://docs.google.com/spreadsheets/d/1_O5ootR0BhcuK6f3KKBUofcG6Kzllnt-WPjv8xA-Vn4/edit#gid=0');
}

if(localStorage.getItem('afboard_configSheetId') == null)
{
    localStorage.setItem('afboard_configSheetId', '17BDUTOv8xuFp7OVJZ18qTsZierh-ZmCa6KyzPbNj8a4')
}

if(localStorage.getItem('afboard_groupChats') || localStorage.getItem('afboard_groupCRM') || localStorage.getItem('afboard_group2Line') || localStorage.getItem('afboard_groupCSS'))
{

}





function ReinitializeAutoFAQ()
{
    const base = `https://docs.google.com/spreadsheets/d/${localStorage.getItem('afboard_configSheetId')}/gviz/tq?`;
    const sheetName = 'AutoFAQ_Config';
    const query = encodeURIComponent('Select *')
    const request = `${base}&sheet=${sheetName}&tq=${query}`;
    let newResults = "";

    fetch(request, {})
        .then(res => res.text())
        .then(rep => {
            results = JSON.parse(/(?<=\()(.*?)(?=\);)/.exec(rep)[0]);
            newResults = results;
            console.log(newResults);
        }).catch((error) => {
            return error;
            });
}