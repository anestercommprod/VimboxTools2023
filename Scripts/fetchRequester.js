function RequestFetch_Spreadsheets(sheetId,sheetList)
{
    const base = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?`;
    const sheetName = sheetList;
    const query = encodeURIComponent('Select *')
    const request = `${base}&sheet=${sheetName}&tq=${query}`;
    let newResults = "";

    fetch(request, {})
        .then(res => res.text())
        .then(rep => {
            results = JSON.parse(/(?<=\()(.*?)(?=\);)/.exec(rep)[0]);
            newResults = results;
            return newResults;
        }).catch((error) => {
            return error;
            });
}