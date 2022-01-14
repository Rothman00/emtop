<div id="content">
        <div class="panel box-shadow-none content-header">
            <div class="panel-body">
                    <div class="col-md-12">
                        <h3 class="animated fadeInLeft">WHATSAPP</h3>
                        <p class="animated fadeInDown">
                            Administración <span class="fa-angle-right fa"></span> Notificaciones
                        </p>
                    </div>
                </div>
            </div>
            <div class="col-lg-12 top-20 padding-0">
                <div class="col-md-12">
                    <div class="panel">
                        <div class="panel-heading"><h3>Mensajeria</h3></div>
                        <div class="panel-body text-center">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="panel">
                                        <div class="panel-heading"><h4>Roles</h4></div>
                                        <div class="panel-body" id="seccionRoles"></div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="panel">
                                        <div class="panel-heading"><h4>Grupos</h4></div>
                                        <div class="panel-body">
                                            <center>
                                                <div class="form-group form-animate-checkbox">
                                                    <input type="checkbox" class="checkbox" id="grupoAdimin" value="ESCUDERIA">
                                                    <label> ADMINISTRADORES DE ESCUDERIA</label>
                                                </div>
                                                <div class="form-group form-animate-checkbox">
                                                    <input type="checkbox" class="checkbox" id="grupoEmpleados" value="EMPLEADOS">
                                                    <label> MIEMBROS DE ECUDERIAS</label>
                                                </div>
                                                <div class="form-group form-animate-checkbox">
                                                    <input type="checkbox" class="checkbox" id="grupoClientes" value="CLIENTES">
                                                    <label> CLIENTES</label>
                                                </div>
                                            </center>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <br>
                            <div class="row form-group">
                                <label class="col-sm-2 control-label text-right">MENSAJE </label>
                                <div class="col-sm-10">
                                    <textarea type="text" class="form-control primary" id="mensaje" rows="5"></textarea>
                                </div>
                            </div>
                            <div class="row form-group">
                                <label class="col-sm-2 control-label text-right">ARCHIVO </label>
                                <center>
                                    <div class="col-sm-9 input-group fileupload-v1">
                                        <input type="file" name="fileRead" id="fileRead" class="fileupload-v1-file hidden" multiple/>
                                        <input type="text" id="imagenClass" class="form-control primary fileupload-v1-path" placeholder="Seleccione una archivo" disabled>
                                        <span class="input-group-btn">
                                            <button class="btn fileupload-v1-btn" type="button"><i class="icons icon-picturer"></i> Escoger</button>
                                        </span>
                                    </div>
                                </center>
                            </div>
                            <div class="col-sm-12">
                                <span class="obligatorio">Enviados: </span><progress value="0" max="100" id="progress"></progress>
                            </div>
                            <br>
                            <div class="row">
                                <div class="col text-center">
                                    <button type="button" class="btn btn-round btn-success" onclick="enviarMensaje();"><i class="fa fa-whatsapp"></i> Enviar </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>  
            </div>
        </div>