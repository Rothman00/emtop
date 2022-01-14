    <div id="content">
        <div class="panel box-shadow-none content-header">
            <div class="panel-body">
                <div class="col-md-12">
                    <h3 class="animated fadeInLeft">CONFIGURACIÓN</h3>
                    <p class="animated fadeInDown">
                        Administración <span class="fa-angle-right fa"></span> Configuración
                    </p>
                </div>
            </div>
        </div>
        <div class="col-lg-12 padding-0">
            <div class="col-md-12">
                <div class="col-md-12 tabs-area">
                    <ul id="tabs-demo6" class="nav nav-tabs nav-tabs-v6" role="tablist">
                        <li role="presentation" class="active">
                            <a href="#tabs-demo7-area1" id="tabs-demo6-1" role="tab" data-toggle="tab" aria-expanded="true">Puntos</a>
                        </li>
                        <li role="presentation" class="">
                            <a href="#tabs-demo7-area2" role="tab" id="tabs-demo6-2" data-toggle="tab" aria-expanded="false">Usuarios</a>
                        </li>
                        <li role="presentation">
                            <a href="#tabs-demo7-area3" id="tabs-demo6-3" role="tab" data-toggle="tab" aria-expanded="false">Ciudades</a>
                        </li>
                        <li role="presentation" class="">
                            <a href="#tabs-demo7-area4" role="tab" id="tabs-demo6-4" data-toggle="tab" aria-expanded="false">Banner</a>
                        </li>
                    </ul>
                    <div id="tabsDemo6Content" class="tab-content tab-content-v6 col-md-12">
                        <div role="tabpanel" class="tab-pane fade active in" id="tabs-demo7-area1" aria-labelledby="tabs-demo7-area1">
                            <div class="row">
                                <div class="col-lg-10 col-sm-1"></div>
                                <div class="col-lg-2 col-sm-11">
                                    <button type="button" class="btn btn-round btn-primary" data-toggle="modal" data-target="#puntosConfigModel" onclick="nuevoPuntos();"><i class="icons icon-plus"></i> Nuevo </button>
                                </div>
                            </div>
                            <div id="puntosDatos">
                                <center><img src="<?php echo base_url('asset/img/cargando.gif');?>"></center>
                            </div>        
                        </div>
                        <div role="tabpanel" class="tab-pane fade" id="tabs-demo7-area2" aria-labelledby="tabs-demo7-area2">
                            <div class="row">
                                <div class="col-lg-10 col-sm-1">
                                    <center><h3>USUARIOS</h3></center>
                                </div>
                                <div class="col-lg-2 col-sm-6">
                                    <button type="button" class="btn btn-round btn-primary" data-toggle="modal" data-target="#usuariosConfModel" onclick="nuevoUsuarioConfi();"><i class="icons icon-plus"></i> Nuevo </button>
                                </div>
                            </div>
                            <div id="usuariosDatos">
                                <center><img src="<?php echo base_url('asset/img/cargando.gif');?>"></center>
                            </div>
                            <hr>
                            <div class="row">
                                <div class="col-lg-10 col-sm-1">
                                    <center><h3>ROLES</h3></center>
                                </div>
                                <div class="col-lg-2 col-sm-6">
                                    <button type="button" class="btn btn-round btn-primary" data-toggle="modal" data-target="#rolConfigModel" onclick="nuevoRolConfig();"><i class="icons icon-plus"></i> Nuevo </button>
                                </div>
                            </div>
                            <div id="rolesDatos">
                                <div class="row">
                                    <div class="col-sm-6" id="rolRolCon"></div>
                                    <div class="col-sm-6" id="rutasRolCon"></div>
                                </div>
                                <br>
                                <div class="row">
                                    <div class="col-sm-1"></div>
                                    <div class="col-sm-11 text-right">
                                        <button type="button" class="btn btn-round btn-primary" onclick="guardarRolNuevoN('rolRolCon', 'rutasRolCon');"> Guardar </button>
                                        <button class="btn btn-round btn-danger" onclick="deleteRolNuevoN('rolRolCon')"> Eliminar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div role="tabpanel" class="tab-pane fade" id="tabs-demo7-area3" aria-labelledby="tabs-demo7-area3">
                            <div class="row">
                                <div class="col-lg-10 col-sm-1"></div>
                                <div class="col-lg-2 col-sm-11">
                                    <button type="button" class="btn btn-round btn-primary" data-toggle="modal" data-target="#ciudadModalN" onclick="nuevaCiudad();"><i class="icons icon-plus"></i> Nuevo </button>
                                </div>
                            </div>
                            <div id="ciudadDatosTable">
                                <center><img src="<?php echo base_url('asset/img/cargando.gif');?>"></center>
                            </div>  
                        </div>
                        <div role="tabpanel" class="tab-pane fade" id="tabs-demo7-area4" aria-labelledby="tabs-demo7-area4">
                            <div class="row">
                                <div class="col-lg-10 col-sm-1"></div>
                                <div class="col-lg-2 col-sm-11">
                                    <button type="button" class="btn btn-round btn-primary" data-toggle="modal" data-target="#bannerModalN" onclick="nuevaBanner();"><i class="icons icon-plus"></i> Nuevo </button>
                                </div>
                            </div>
                            <br>
                            <div class="row" id="bannerIndicator">
                                <div class="col-sm-6">
                                    <div class="panel">
                                        <div class="panel-heading">
                                            <center><h3>Activas</h3></center>
                                        </div>
                                        <div class="panel-body">
                                            <div class="col-md-12 col-sm-12 col-xs-12">
                                                <div id="carousel-example3" class="carousel slide" data-ride="carousel">
                                                    <ol class="carousel-indicators" id="indicatorNum1"></ol>
                                                    <div class="carousel-inner" role="listbox" id="contenidoCarouel1"></div>
                                                    <a class="left carousel-control" href="#carousel-example3" role="button" data-slide="prev">
                                                        <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                                                        <span class="sr-only">Previous</span>
                                                    </a>
                                                    <a class="right carousel-control" href="#carousel-example3" role="button" data-slide="next">
                                                        <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                                                        <span class="sr-only">Next</span>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-6">
                                    <div class="panel">
                                        <div class="panel-heading">
                                            <center><h3>Inactivas</h3></center>
                                        </div>
                                        <div class="panel-body">
                                            <div class="col-md-12 col-sm-12 col-xs-12">
                                                <div id="carousel-example4" class="carousel slide" data-ride="carousel">
                                                    <ol class="carousel-indicators" id="indicatorNum2"></ol>
                                                    <div class="carousel-inner" role="listbox" id="contenidoCarouel2"></div>
                                                    <a class="left carousel-control" href="#carousel-example4" role="button" data-slide="prev">
                                                        <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                                                        <span class="sr-only">Previous</span>
                                                    </a>
                                                    <a class="right carousel-control" href="#carousel-example4" role="button" data-slide="next">
                                                        <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                                                        <span class="sr-only">Next</span>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!--MODAL DE NUEVO PUNTOS-->
        <div class="modal fade" id="puntosConfigModel" style="overflow:hidden;" aria-labelledby="exampleModalToggleLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">Puntos</h4>
                    </div>
                    <div class="modal-body">
                        <div class="row form-group">
                            <label class="col-sm-3 control-label text-right">PORCENTAJE <span class="obligatorio">*</span></label>
                            <div class="col-sm-9">
                                <input type="number" class="form-control primary" id="porcentaje" step="0.01" min="0" placeholder="0 %">
                            </div>
                        </div>
                        <div class="row form-group">
                            <label class="col-sm-3 control-label text-right">FACTOR <span class="obligatorio">*</span></label>
                            <div class="col-sm-9">
                                <input type="number" class="form-control primary" id="factor" step="0.01" min="0" placeholder="0">
                            </div>
                        </div>
                        <div class="row form-group form-animate">
                            <label class="col-sm-3 control-label text-right">DESDE <span class="obligatorio">*</span></label>
                            <div class="col-sm-9">
                                <input type="month" class="form-control primary " id="desde">
                            </div>
                        </div>
                        <div class="row form-group form-animate">
                            <label class="col-sm-3 control-label text-right">HASTA <span class="obligatorio">*</span></label>
                            <div class="col-sm-9">
                                <input type="month" class="form-control primary " id="hasta">
                            </div>
                        </div>
                        <center>
                            <div class="col">
                                <span class="obligatorio">TODOS LOS CAMPOS * SON OBLIGATORIOS</span>
                            </div>
                            <br>
                        </center>
                        <div class="row">
                            <div class="col-sm-1"></div>
                            <div class="col-sm-10 text-right">
                                <button type="button" class="btn btn-round btn-primary" onclick="guardarPuntos();"> Guardar </button>
                                <button class="btn btn-round btn-light" data-toggle="modal" data-target="#puntosConfigModel"><i class="mdi mdi-close icon-sm btn-icon-prepend"></i> Cancelar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--FIN MODAL NUEVO PUNTOS-->

        <!--MODAL DE NUEVO USUARIO-->
        <div class="modal fade" id="usuariosConfModel" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">Usuario</h4>
                    </div>
                    <div class="modal-body">
                        <div class="row form-group">
                            <label class="col-sm-3 control-label text-right">DNI <span class="obligatorio">*</span></label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control primary" id="dni">
                            </div>
                        </div>
                        <div class="row form-group">
                            <label class="col-sm-3 control-label text-right">NOMBRES <span class="obligatorio">*</span></label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control primary" id="nombres">
                            </div>
                        </div>
                        <div class="row form-group">
                            <label class="col-sm-3 control-label text-right">APELLIDOS <span class="obligatorio">*</span></label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control primary" id="apellidos">
                            </div>
                        </div>
                        <div class="row form-group">
                            <label class="col-sm-3 control-label text-right">EMAIL <span class="obligatorio">*</span></label>
                            <div class="col-sm-9">
                                <input type="email" class="form-control primary" id="email">
                            </div>
                        </div>
                        <div class="row form-group">
                            <label class="col-sm-3 control-label text-right">TELEFONO <span class="obligatorio">*</span></label>
                            <div class="col-sm-9">
                                <input type="number" class="form-control primary" id="telefono" step="1" min="0">
                            </div>
                        </div>
                        <div class="row form-group">
                            <label class="col-sm-3 control-label text-right">FOTO <span class="obligatorio">*</span></label>
                            <center>
                                <div class="col-sm-8 input-group fileupload-v1">
                                    <input type="file" name="fileRead" id="fileRead" class="fileupload-v1-file hidden" accept="image/*" data-bind="event: { change: $root.Browse }"/>
                                    <input type="text" id="imagenClass" class="form-control primary fileupload-v1-path" placeholder="Seleccione una imagen" disabled>
                                    <span class="input-group-btn">
                                        <button class="btn fileupload-v1-btn" type="button"><i class="icons icon-picturer"></i> Escoger</button>
                                    </span>
                                </div>
                                <div class="col-sm-12">
                                    <span class="obligatorio">Subiendo: </span><progress value="0" max="100" id="progress"></progress>
                                </div>
                            </center>
                        </div>
                        <div class="row form-group">
                            <label class="col-sm-3 control-label text-right">ESCUDERIA </label>
                            <div class="col-sm-9">
                                <select class=" form-control primary" id="escuderia" placeholders="Seleccione escuderia"></select>
                                <span class="obligatorio">Dejar en opción SELECCIONAR si va a ser Administrador o Cliente</span>
                            </div>
                        </div>
                        <div class="row form-group">
                            <label class="col-sm-3 control-label text-right">USUARIO <span class="obligatorio">*</span></label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control primary" id="usuario">
                            </div>
                        </div>
                        <div class="row form-group">
                            <label class="col-sm-3 control-label text-right">CONTRASEÑA <span class="obligatorio">*</span></label>
                            <div class="col-sm-9">
                                <input type="password" class="form-control primary" id="password">
                            </div>
                        </div>
                        <center>
                            <div class="col">
                                <span class="obligatorio">TODOS LOS CAMPOS * SON OBLIGATORIOS</span>
                            </div>
                            <br>
                        </center>
                        <div class="row">
                            <div class="col-sm-1"></div>
                            <div class="col-sm-10 text-right">
                                <button type="button" class="btn btn-round btn-primary" onclick="guardarUsuario();"> Guardar </button>
                                <button class="btn btn-round btn-light" data-toggle="modal" data-target="#usuariosConfModel"><i class="mdi mdi-close icon-sm btn-icon-prepend"></i> Cancelar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--FIN MODAL NUEVO USUARIO-->

        <!--MODAL MOSTRAR IMAGEN-->
        <div class="modal fade" id="mostrarImagen" tabindex="-1" aria-labelledby="exampleModalToggleLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">Foto</h4>
                    </div>
                    <div class="modal-body">
                        <img id="imagen" src="<?echo base_Url('asset/img/cargando.gif');?>" class="rounded img-fluid">
                        <div class="row">
                            <div class="col-sm-1"></div>
                            <div class="col-sm-10 text-right">
                                <button class="btn btn-round btn-light" data-toggle="modal" data-target="#mostrarImagen"><i class="mdi mdi-close icon-sm btn-icon-prepend"></i> Cancelar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--FIN MODAL MOSTRAR IMAGEN-->

        <!--MODAL MOSTRAR ROLES-->
        <div class="modal fade" id="otorgarRolUsuario" tabindex="-1" aria-labelledby="exampleModalToggleLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">Roles</h4>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-sm-6" id="rolUsuarioCon"></div>
                            <div class="col-sm-6" id="rutasUsuarioCon"></div>
                        </div>
                        <div class="row">
                            <div class="col-sm-1"></div>
                            <div class="col-sm-10 text-right">
                                <button type="button" class="btn btn-round btn-primary" onclick="guardarRolUsuario();"> Guardar </button>
                                <button class="btn btn-round btn-light" data-toggle="modal" data-target="#otorgarRolUsuario"><i class="mdi mdi-close icon-sm btn-icon-prepend"></i> Cancelar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--FIN MODAL MOSTRAR ROLES-->

        <!--MODAL NUEVO ROLES-->
        <div class="modal fade" id="rolConfigModel" tabindex="-1" aria-labelledby="exampleModalToggleLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">Rol</h4>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-sm-6" >
                                <div class="row form-group">
                                    <label class="col-sm-3 control-label text-right">ROL <span class="obligatorio">*</span></label>
                                    <div class="col-sm-9">
                                        <input type="text" class="form-control primary" id="nombresRolC">
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-6" id="rutasconfigRolN"></div>
                        </div>
                        <center>
                            <div class="col">
                                <span class="obligatorio">TODOS LOS CAMPOS * SON OBLIGATORIOS</span>
                            </div>
                            <br>
                        </center>
                        <div class="row">
                            <div class="col-sm-1"></div>
                            <div class="col-sm-10 text-right">
                                <button type="button" class="btn btn-round btn-primary" onclick="guardarRolNuevoRutas('rutasconfigRolN');"> Guardar </button>
                                <button class="btn btn-round btn-light" data-toggle="modal" data-target="#rolConfigModel"><i class="mdi mdi-close icon-sm btn-icon-prepend"></i> Cancelar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--FIN NUEVO MOSTRAR ROLES-->
        
        <!--MODAL NUEVO CIUDAD-->
        <div class="modal fade" id="ciudadModalN" tabindex="-1" aria-labelledby="exampleModalToggleLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">Ciudad</h4>
                    </div>
                    <div class="modal-body">
                        <div class="row form-group">
                            <label class="col-sm-3 control-label text-right">CIUDAD <span class="obligatorio">*</span></label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control primary" id="ciudadN">
                            </div>
                        </div>
                        <center>
                            <div class="col">
                                <span class="obligatorio">TODOS LOS CAMPOS * SON OBLIGATORIOS</span>
                            </div>
                            <br>
                        </center>
                        <div class="row">
                            <div class="col-sm-1"></div>
                            <div class="col-sm-10 text-right">
                                <button type="button" class="btn btn-round btn-primary" onclick="guardarCiudadN();"> Guardar </button>
                                <button class="btn btn-round btn-light" data-toggle="modal" data-target="#ciudadModalN"><i class="mdi mdi-close icon-sm btn-icon-prepend"></i> Cancelar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--FIN MODAL NUEVO CIUDAD-->

        <!--MODAL NUEVO BANNER-->
        <div class="modal fade" id="bannerModalN" tabindex="-1" aria-labelledby="exampleModalToggleLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">Banner</h4>
                    </div>
                    <div class="modal-body">
                        <div class="row form-group">
                            <label class="col-sm-3 control-label text-right">IMAGEN <span class="obligatorio">*</span></label>
                            <center>
                                <div class="col-sm-8 input-group fileupload-v1">
                                    <input type="file" name="fileRead1" id="fileRead1" class="fileupload-v1-file hidden" accept="image/*" data-bind="event: { change: $root.Browse }"/>
                                    <input type="text" id="imagenClass1" class="form-control primary fileupload-v1-path" placeholder="Seleccione una imagen" disabled>
                                    <span class="input-group-btn">
                                        <button class="btn fileupload-v1-btn" type="button"><i class="icons icon-picturer"></i> Escoger</button>
                                    </span>
                                </div>
                                <div class="col-sm-12">
                                    <span class="obligatorio">Subiendo: </span><progress value="0" max="100" id="progress1"></progress>
                                </div>
                            </center>
                        </div>
                        <div class="row form-group form-animate">
                            <label class="col-sm-3 control-label text-right">DESDE <span class="obligatorio">*</span></label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control primary dateAnimate" id="desdeB">
                            </div>
                        </div>
                        <div class="row form-group form-animate">
                            <label class="col-sm-3 control-label text-right">HASTA <span class="obligatorio">*</span></label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control primary dateAnimate" id="hastaB">
                            </div>
                        </div>
                        <center>
                            <div class="col">
                                <span class="obligatorio">TODOS LOS CAMPOS * SON OBLIGATORIOS</span>
                            </div>
                            <br>
                        </center>
                        <div class="row">
                            <div class="col-sm-1"></div>
                            <div class="col-sm-10 text-right">
                                <button type="button" class="btn btn-round btn-primary" onclick="guardarBanner();"> Guardar </button>
                                <button class="btn btn-round btn-light" data-toggle="modal" data-target="#bannerModalN"><i class="mdi mdi-close icon-sm btn-icon-prepend"></i> Cancelar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--FIN MODAL NUEVO BANNER-->
    </div>