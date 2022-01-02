//USUARIOS COMENTAR
let datosUsuarios=[];
var starCountRef = firebase.database().ref('tbl_usuario');
starCountRef.on('value', (snapshot) => {
    if(snapshot.exists())
        datosUsuarios=snapshot.val();
});