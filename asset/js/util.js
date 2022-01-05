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