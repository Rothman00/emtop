//USUARIOS COMENTAR
let datosUsuarios=[];
var dbUsuario = firebase.database().ref('tbl_usuario');
dbUsuario.on('value', (snapshot) => {
    if(snapshot.exists())
        datosUsuarios=snapshot.val();
});

//CONFIGURACION
let datosConfiguracion=[];
var dbConfig = firebase.database().ref('tbl_configuracion');
dbConfig.on('value', (snapshot) => {
    if(snapshot.exists()){
        let data = snapshot.val();
        for (const key in data) {
            const element = data[key];
            if(comprobarFechas(new Date(key), new Date()) && comprobarFechas(new Date(), new Date(element.FECHAHASTA))){
                datosConfiguracion = element;
                return;
            }
        }
    }
});

//FICHA TÉCNICA PARA DIFERENTES ID'S
let datosFichaTecnica = [];
if ($('#capacitacionDatos').length > 0) {
    var dbFichaTecnica = firebase.database().ref('tbl_fichatecnica');
    dbFichaTecnica.on('value', (snapshot) => {
        if(snapshot.exists())
            datosFichaTecnica = snapshot.val();
    });
}

//FORO PARA DIFERENTES ID'S
let datosForo={};
if ($('#foroDatos').length > 0) {
    var starCountRef = firebase.database().ref('tbl_foro');
    starCountRef.on('value', (snapshot) => {
        let datosForoCreacion = [];
        if(snapshot.exists()){
            const data = snapshot.val();
            datosForo = data;
            for (const key in data) {
                const element = data[key];
                datosForoCreacion.push(element);
            }
        }
        setTimeout(function(){
            $('#foroDatos').html(generarForoTemas(datosForoCreacion));
            $('#datatables-generic0').DataTable({
                "scrollX": true,
                dom: 'Bfrtip',
                buttons: [
                    'copy', 'csv', 'excel', 'pdf', 'print'
                ]
            });
        }, 500);
    });
} 