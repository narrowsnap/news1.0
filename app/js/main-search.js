$(document).ready(function () {
    if(localStorage.getItem('init_status') == 'true'){
        console.log('info: ' + localStorage.getItem('search_info'))
        $('#main_input').attr('value', localStorage.getItem('search_info'))
    } else {
        console.log('by: ' + localStorage.getItem('search_by'))
        $('#main_input').attr('value', localStorage.getItem('search_by'))
    }
})
