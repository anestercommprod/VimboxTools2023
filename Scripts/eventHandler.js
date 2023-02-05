if(localStorage.getItem('userRole') != 'Dev')
{
    document.addEventListener('contextmenu', event => event.preventDefault());
}