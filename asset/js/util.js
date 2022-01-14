let files = [];

function decDos(n) {
    if(n=="")return 0;
    if(typeof n === 'undefined') return 0;
    let t=n.toString();
    let regex=/(\d*.\d{0,2})/;
    return t.match(regex)[0];
}

function removerSelectedItem(hasta, id) {
    const $select = document.querySelector(`#${id}`);
    for (let i = $select.options.length; i >= hasta; i--) {
       $select.remove(i);
    }
 }
 
 function addSelectedItem(value, text, id) {
    const $select = document.querySelector(`#${id}`);
    let opt = document.createElement('option');
    opt.value = value;
    opt.text = text;
    $select.appendChild(opt);
 }

 function cambiarEstadoInput(id, estado) { //true -> Correcto valor  false -> Incorrecto valor
   if(estado)
       $(`#${id}`).removeClass('danger').addClass('primary');
   else
       $(`#${id}`).removeClass('primary').addClass('danger');
}

if($('#fileRead').length > 0){
    document.getElementById("fileRead").addEventListener("change", function(e) {
        files = e.target.files;
    });
}

if($('#fileRead1').length > 0){
    document.getElementById("fileRead1").addEventListener("change", function(e) {
        files = e.target.files;
    });
}

function nombreFile(fil) {
    let data1 = fil.split('%2F');
    let data2 = data1[2].split('?alt');
    return data2[0];
}

function fechaHoraString() {
    var date = new Date(),
    year = date.getFullYear(),
    month = (date.getMonth() + 1).toString(),
    formatedMonth = (month.length === 1) ? ("0" + month) : month,
    day = date.getDate().toString(),
    formatedDay = (day.length === 1) ? ("0" + day) : day,
    hour = date.getHours().toString(),
    formatedHour = (hour.length === 1) ? ("0" + hour) : hour,
    minute = date.getMinutes().toString(),
    formatedMinute = (minute.length === 1) ? ("0" + minute) : minute,
    second = date.getSeconds().toString(),
    formatedSecond = (second.length === 1) ? ("0" + second) : second;
    return formatedDay + "-" + formatedMonth + "-" + year + " " + formatedHour + ':' + formatedMinute + ':' + formatedSecond;
}