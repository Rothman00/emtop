<div id="content">
    <div class="panel box-shadow-none content-header">
        <div class="panel-body">
                <div class="col-md-12">
                    <h3 class="animated fadeInLeft">FORO</h3>
                    <p class="animated fadeInDown">
                        Administración <span class="fa-angle-right fa"></span> Foro
                    </p>
                </div>
            </div>
        </div>
        <div class="col-lg-12 top-20 padding-0">
            <div class="col-md-12">
                <div class="panel">
                    <div class="panel-heading"><h3>Foro</h3></div>
                    <div class="panel-body">
                        <div class="row">
                            <div class="col-lg-10 col-sm-1"></div>
                            <div class="col-lg-2 col-sm-11">
                                <button type="button" class="btn btn-round btn-primary" data-toggle="modal" data-target="#foroModel" onclick="nuevoTemaForo();"><i class="icons icon-plus"></i> Tema </button>
                            </div>
                        </div>
                        <br>
                        <div id="foroDatos">
                            <center><img src="<?php echo base_url('asset/img/cargando.gif');?>"></center>
                        </div>
                    </div>
                </div>
            </div>  
        </div>

         <!--MODAL DE NUEVO FORO-->
         <div class="modal fade" id="foroModel" style="overflow:hidden;" aria-labelledby="exampleModalToggleLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">Foro</h4>
                    </div>
                    <div class="modal-body">
                        <div class="row form-group">
                            <label class="col-sm-3 control-label text-right">TEMA <span class="obligatorio">*</span></label>
                            <div class="col-sm-9">
                                <textarea type="text" class="form-control primary" id="tema" rows="2"></textarea>
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
                                <button type="button" class="btn btn-round btn-primary" onclick="guardarTemaForo();"> Guardar </button>
                                <button class="btn btn-round btn-light" data-toggle="modal" data-target="#foroModel"><i class="mdi mdi-close icon-sm btn-icon-prepend"></i> Cancelar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--FIN MODAL NUEVO FORO-->

         <!--MODAL DE NUEVO DISCURSO-->
         <div class="modal fade" id="discursoModel" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">Discursos</h4>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-12 mail-right-content">
                                <div class="col-md-12 padding-0">
                                    <textarea class="summernote hidden" placeholder="Escriba..." id="discusion"></textarea>
                                </div>
                            </div>
                        </div>
                        <br>
                        <div id="contenidoDiscurso"></div>
                        <div class="row">
                            <div class="col-sm-1"></div>
                            <div class="col-sm-10 text-right">
                                <button type="button" class="btn btn-round btn-primary" onclick="guardarDiscusion()"> Enviar</button>
                                <button class="btn btn-round btn-light" data-toggle="modal" data-target="#discursoModel"><i class="mdi mdi-close icon-sm btn-icon-prepend"></i> Cancelar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--FIN MODAL NUEVO DISCURSO-->

    </div>