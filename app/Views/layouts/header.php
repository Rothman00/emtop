<!DOCTYPE html>
<html lang="es">
<head>
	
	<meta charset="utf-8">
	<meta name="description" content="EMTOP">
	<meta name="keyword" content="">
	<meta name="viewport" content="width=device-width, initial-scale=1">
    <title>EMTOP</title>
    <!-- CSS -->
    <link rel="stylesheet" type="text/css" href="<?php echo base_Url()?>/asset/css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="<?php echo base_Url()?>/asset/css/style.css">
    <link rel="stylesheet" type="text/css" href="<?php echo base_Url()?>/asset/css/my.css">
    <!-- JS -->
    <script src="<?php echo base_Url()?>/asset/js/configuration.js"></script>
    <!-- PLUGINS -->
    <link rel="stylesheet" type="text/css" href="<?php echo base_Url()?>/asset/css/plugins/font-awesome.min.css"/>
    <link rel="stylesheet" type="text/css" href="<?php echo base_Url()?>/asset/css/plugins/simple-line-icons.css"/>
    <link rel="stylesheet" type="text/css" href="<?php echo base_Url()?>/asset/css/plugins/animate.min.css"/>
    <link rel="stylesheet" type="text/css" href="<?php echo base_Url()?>/asset/css/plugins/nouislider.min.css" />
    <link rel="stylesheet" type="text/css" href="<?php echo base_Url()?>/asset/css/plugins/fullcalendar.min.css"/>
    <link rel="stylesheet" type="text/css" href="<?php echo base_Url()?>/asset/css/plugins/select2.min.css" />
    <link rel="stylesheet" type="text/css" href="<?php echo base_Url()?>/asset/css/plugins/dropzone.css"/>
    <link rel="stylesheet" type="text/css" href="<?php echo base_Url()?>/asset/css/plugins/ionrangeslider/ion.rangeSlider.css" />
    <link rel="stylesheet" type="text/css" href="<?php echo base_Url()?>/asset/css/plugins/ionrangeslider/ion.rangeSlider.skinFlat.css" />
    <link rel="stylesheet" type="text/css" href="<?php echo base_url()?>/asset/css/plugins/datatables.bootstrap.min.css"/>
    <link rel="stylesheet" type="text/css" href="<?php echo base_Url()?>/asset/css/plugins/bootstrap-material-datetimepicker.css" />
    <link rel="stylesheet" type="text/css" href="<?php echo base_url()?>/asset/css/plugins/spinkit.css"/>
    <link rel="stylesheet" type="text/css" href="<?php echo base_url()?>/asset/css/plugins/summernote.css"/>

    <!-- DataTable -->
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/buttons/1.7.0/css/buttons.dataTables.min.css"/>
    <!-- HUSO HORARIO -->
    <?php setlocale(LC_TIME, 'es_ES.UTF-8');?>
    <!-- ICON PESTAÑA -->
    <link rel="shortcut icon" href="<?php echo base_Url()?>/asset/img/sinfondo.png">
</head>

 <body id="mimin" class="dashboard">
    <script src="https://www.gstatic.com/firebasejs/8.6.3/firebase-app.js"> </script>
    <script src="https://www.gstatic.com/firebasejs/8.6.3/firebase-analytics.js"> </script>
    <script src="https://www.gstatic.com/firebasejs/8.6.3/firebase-database.js"> </script>
    <script src="https://www.gstatic.com/firebasejs/8.6.3/firebase-storage.js"> </script>
    <script> iniciarF(); </script>

      <!-- start: Header -->
        <nav class="navbar navbar-default header navbar-fixed-top">
          <div class="col-md-12 nav-wrapper">
            <div class="navbar-header" style="width:100%;">
              <div class="opener-left-menu is-open">
                <span class="top"></span>
                <span class="middle"></span>
                <span class="bottom"></span>
              </div>
              <a href="<?php echo base_Url()?>" class="navbar-brand"> 
                <b>EMTOP</b>
              </a>
               
              <ul class="nav navbar-nav navbar-right user-nav">
                <li class="user-name"><span><?php echo $usuario->NOMBRES . ' '. $usuario->APELLIDOS?></span></li>
                <li class="dropdown avatar-dropdown">
                    <img src="<?php if($usuario->FOTO == "") echo base_Url('/asset/img/avatar.jpg'); else echo $usuario->FOTO;?>" class="img-circle avatar" alt="user name" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true"/>
                    <ul class="dropdown-menu user-dropdown">
                        <li><a href=""><span class="fa fa-user"></span> Mi Perfil</a></li>
                        <li><a href="<?php echo base_Url()?>/logout"><span class="fa fa-power-off "></span> Cerrar Sesión</a></li>
                        <li role="separator" class="divider"></li>
                    </ul>
                </li>
                <li><a></a></li>
              </ul>
            </div>
          </div>
        </nav>
      <!-- end: Header -->