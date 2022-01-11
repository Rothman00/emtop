    <div id="content">
        <div class="panel box-shadow-none content-header">
            <div class="panel-body">
                <div class="col-md-12">
                    <h3 class="animated fadeInLeft">PREMIOS</h3>
                    <p class="animated fadeInDown">
                        Administración <span class="fa-angle-right fa"></span> Premios
                    </p>
                </div>
            </div>
        </div>
        
        <div class="col-md-12">
            <div class="col-md-12 tabs-area">
                <div class="liner"></div>
                <ul class="nav nav-tabs nav-tabs-v5" id="tabs-demo6">
                    <li class="active">
                        <a href="#tabs-demo6-area1" data-toggle="tab" title="welcome">
                            <span class="round-tabs one">
                                <i class="glyphicon glyphicon-gift"></i>
                            </span> 
                        </a>
                    </li>
                    <li>
                        <a href="#tabs-demo6-area5" data-toggle="tab" title="completed">
                            <span class="round-tabs five">
                                <i class="glyphicon glyphicon-ok"></i>
                            </span> 
                        </a>
                    </li>
                </ul>
                <div class="tab-content tab-content-v5">
                    <div class="tab-pane fade in active" id="tabs-demo6-area1">
                        <div class="row">
                            <div class="col-lg-10 col-sm-1"></div>
                            <div class="col-lg-2 col-sm-11">
                                <button type="button" class="btn btn-round btn-primary" data-toggle="modal" data-target="#premioModel" onclick="nuevoPremio();"><i class="icons icon-plus"></i> Nuevo </button>
                            </div>
                        </div>
                        <br>
                        <div id="catalogoPremios"></div>
                    </div>
                    <div class="tab-pane fade" id="tabs-demo6-area5">
                        <div id="tablaCanjes"></div>
                    </div>
                    <div class="clearfix"></div>
                </div>
            </div>
        </div>

        <!--MODAL DE NUEVO PREMIO-->
        <div class="modal fade" id="premioModel" tabindex="-1" aria-labelledby="exampleModalToggleLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">Premio</h4>
                    </div>
                    <div class="modal-body">
                        <div class="row form-group">
                            <label class="col-sm-3 control-label text-right">CODIGO <span class="obligatorio">*</span></label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control primary" id="codigo">
                            </div>
                        </div>
                        <div class="row form-group">
                            <label class="col-sm-3 control-label text-right">NOMBRE <span class="obligatorio">*</span></label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control primary" id="nombre">
                            </div>
                        </div>
                        <div class="row form-group">
                            <label class="col-sm-3 control-label text-right">DESCRIPCIÓN <span class="obligatorio">*</span></label>
                            <div class="col-sm-9">
                                <textarea type="text" class="form-control primary" id="descripcion"></textarea>
                            </div>
                        </div>
                        <div class="row form-group">
                            <label class="col-sm-3 control-label text-right">IMAGEN <span class="obligatorio">*</span></label>
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
                            <label class="col-sm-3 control-label text-right">PUNTOS <span class="obligatorio">*</span></label>
                            <div class="col-sm-9">
                                <input type="number" class="form-control primary" id="puntos" step="1" min="0" placeholder="0">
                            </div>
                        </div>
                        <div class="row form-group form-animate">
                            <label class="col-sm-3 control-label text-right">DESDE <span class="obligatorio">*</span></label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control primary dateAnimate" id="desde">
                            </div>
                        </div>
                        <div class="row form-group form-animate">
                            <label class="col-sm-3 control-label text-right">HASTA <span class="obligatorio">*</span></label>
                            <div class="col-sm-9">
                                <input type="text" class="form-control primary dateAnimate" id="hasta">
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
                                <button type="button" class="btn btn-round btn-primary" onclick="guardarPremio();"> Guardar </button>
                                <button class="btn btn-round btn-light" data-toggle="modal" data-target="#premioModel"><i class="mdi mdi-close icon-sm btn-icon-prepend"></i> Cancelar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--FIN MODAL NUEVO PREMIO-->
    </div>