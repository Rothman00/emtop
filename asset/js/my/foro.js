let optForo = true;
let optDiscurso = true;
let optTema = '';
let optIdDis = -1;
let optDiscText = '';
function nuevoTemaForo() {
    optForo = true;
    vaciarForoModal();
}

function vaciarForoModal() {
    $('#tema').val('');
    cambiarEstadoInput("tema", true);
}

function guardarTemaForo() {
    let texto = '¿Seguro de crear tema?';
    if(!optForo)
        texto = '¿Seguro de editar tema?';
    if(confirm(texto)){
        let tem = $('#tema').val();
        let fec = fechaHoraString();
        let est = true;
        if(tem == ''){
            est = false;
            cambiarEstadoInput("tema", false);
        }else
            cambiarEstadoInput("tema", true);
        if(est){
            const dbRef = firebase.database().ref();
            dbRef.child(`tbl_foro/${tem}`).get().then((snapshot) => {
                if (snapshot.exists()) {
                    if(optForo){
                        cambiarEstadoInput("tema", false);
                        alert("NOMBRE DE FORO YA EXISTE");
                    }else{
                        firebase.database().ref(`tbl_foro/${tem}`).set({
                            USUARIO: root,
                            FECHA: fec,
                            TEMA : tem
                        });
                        vaciarForoModal();
                        alert("CORRECTO");
                        $('#foroModel').modal('toggle');
                    }
                } else {
                    if(optForo){
                        firebase.database().ref(`tbl_foro/${tem}`).set({
                            USUARIO: root,
                            FECHA: fec,
                            TEMA : tem
                        });
                        vaciarForoModal();
                        alert("CORRECTO");
                        $('#foroModel').modal('toggle');
                    }else{
                        cambiarEstadoInput("tema", false);
                        alert("NOMBRE DE FORO YA EXISTE");
                    }
                }
            }).catch((error) => {
                alert(`No se pudo realizar este proceso, vuelva a intentar\n${error}`);
            }); 
        }else
            alert("Revise el formulario");
    }
}

function deleteTemaForo(tem) {
    if(confirm('¿Seguro de eliminar foro, se eleminará con todas sus discuciones?'))
        firebase.database().ref(`tbl_foro/${tem}`).set(null);
}

function mostrarDiscursoNuevo(tem) {
    optDiscurso = true;
    optTema = tem;
    $("#discusion").summernote("code", "");
    $('#contenidoDiscurso').html('');
    let dis = datosForo[tem]["DISCUSION"];
    let lado = true;
    if(dis != undefined){
        let contenido = `<div class="col-md-12">
                            <ul class="timeline">`;
        for (const key in dis) {
            const e = dis[key];
            if(e!=null){
                let usu = datosUsuarios[e.USUARIO];
                if(lado){
                    contenido += `<li>
                                    <div class="timeline-badge"><i class="icons icon-speech"></i></div>
                                    <div class="timeline-panel">`;
                    lado = false;
                }else{
                    contenido += `<li class="timeline-inverted">
                                    <div class="timeline-badge"><i class="icons icon-speech"></i></div>
                                    <div class="timeline-panel">`;
                    lado = true;
                }
                contenido += `<div class="timeline-heading">
                                    <h4 class="timeline-title">${usu.NOMBRES} ${usu.APELLIDOS}</h4>
                                    <p><small class="text-muted"><i class="glyphicon glyphicon-time"></i> ${e.FECHA}</small></p>
                                </div>
                                <div class="timeline-body">
                                    <p>${e.DISCUSION}</p>
                                    <br>
                                    <center>
                                `;
                if(root == e.USUARIO)
                    contenido += `      <button type="button" class="btn btn-circle btn-mn btn-warning" onclick='mostrarDiscurso("${key}", "${tem}");'>
                                            <i class="icons icon-speech"></i>
                                        </button>`;
                contenido += `          <button type="button" class="btn btn-circle btn-mn btn-danger" onclick="deleteDiscurso('${tem}', '${key}');">
                                            <i class="icons icon-trash"></i>
                                        </button>
                                    </center>
                                </div>
                            </div>
                        </li>`;
            }
        }
        contenido += '</ul></div>';
        $('#contenidoDiscurso').html(contenido);
    }else
        alert("NO TIENE DISCUSIONES");
}

function mostrarDiscurso(opt, tem) {
    optDiscurso = false;
    optIdDis = opt;
    let dis = datosForo[tem]["DISCUSION"][opt]["DISCUSION"];
    $("#discusion").summernote("code", dis);
}

function guardarDiscusion() {
    let texto = '¿Seguro de crear discusión?';
    if(!optDiscurso)
        texto = '¿Seguro de editar discusión?';
    if(confirm(texto)){
        let tex = $('#discusion').val();
        if(tex != ''){
            let fec = fechaHoraString();
            const dbRef = firebase.database().ref();
            dbRef.child(`tbl_foro/${optTema}/DISCUSION`).get().then((snapshot) => {
                if (snapshot.exists()) {
                    if(optDiscurso && optIdDis == -1){
                        let data = snapshot.val();
                        firebase.database().ref(`tbl_foro/${optTema}/DISCUSION/${data.length}`).set({
                            USUARIO: root,
                            FECHA: fec,
                            DISCUSION: tex,
                            ESTADO: true
                        });
                        $('#discusion').val('');
                        alert("CORRECTO");
                        $('#discursoModel').modal('toggle');
                    }else{
                        firebase.database().ref(`tbl_foro/${optTema}/DISCUSION/${optIdDis}`).set({
                            USUARIO: root,
                            FECHA: fec,
                            DISCUSION: tex
                        });
                        $('#discusion').val('');
                        alert("CORRECTO");
                        optIdDis=-1;
                        $('#discursoModel').modal('toggle');
                    }
                } else {
                    if(optDiscurso){
                        firebase.database().ref(`tbl_foro/${optTema}/DISCUSION/0`).set({
                            USUARIO: root,
                            FECHA: fec,
                            DISCUSION: tex
                        });
                        $('#discusion').val('');
                        alert("CORRECTO");
                        $('#discursoModel').modal('toggle');
                    }else
                        alert("Hubo un problema, vuelva a intentar");
                }
            }).catch((error) => {
                alert(`No se pudo realizar este proceso, vuelva a intentar\n${error}`);
            }); 
        }else
            alert("Su mensaje no tiene contenido");
    }
}

function deleteDiscurso(tem, opt) {
    if(confirm('¿Seguro de eliminar discusión?')){
        firebase.database().ref(`tbl_foro/${tem}/DISCUSION/${opt}`).set(null);
        $('#discursoModel').modal('toggle');
    }
}