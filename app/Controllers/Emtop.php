<?php

namespace App\Controllers;
use \App\Models\EmtopModel;

class Emtop extends BaseController
{
    protected $request,$session, $model, $incorrect;

    public function __construct() {
		$this->request = \Config\Services::request();
		$this->session = \Config\Services::session();
		$this->model = new EmtopModel();
        $this->incorrect = false;
	}

    public function index()
	{
		if($this->session->has('usuario'))
			return $this->login();
		else
			return view('login/login');
	}

	public function destruirSession()
    {
		$this->session->destroy();
		echo '<script>localStorage.clear();</script>';
		return view('login/login');
    }

	public function login(){
		if($this->session->has('usuario')){
            $asideD = [
                "usuario"=>$this->session->get('usuario'),
                "rutas"=>$this->session->get('rutas'),
                "roles"=>$this->session->get('roles')
            ];
            return view('layouts/header', $asideD).view('layouts/aside', $asideD).view('pages/home').view('layouts/footer', $asideD);
        }
        $datos=array();
        if(isset($_POST['user']) && isset($_POST['pass'])){
            $datos["USUARIO"]=$_POST['user'];
            $datos["PASSWORD"]=$_POST['pass'];
        }else
            return view('login/login');
        $datos = [
            "USUARIO"=>isset($_POST['user']) ? $_POST['user'] : "",
            "PASSWORD"=>isset($_POST['pass']) ? $_POST['pass'] : ""
        ];
        $resp = $this->model->getDataPOST_JSON('/api/login',$datos);
        if($resp->code==200){
            $this->session->set([
                "usuario" => $resp->data->DATOS,
                "rutas" => (array) $resp->data->RUTAS,
                "roles" => $resp->data->ROLES
            ]);
            $asideD = [
                "usuario" => $this->session->get('usuario'),
                "rutas" => $this->session->get('rutas'),
                "roles" => $this->session->get('roles')
            ];
            return view('layouts/header', $asideD).view('layouts/aside', $asideD).view('pages/home').view('layouts/footer', $asideD);
        }else{
            if(isset($resp->msj)){
                echo '<script language="javascript">alert("'.$resp->msj.'");</script>';
                return view('login/login');
            }else{
                echo '<script language="javascript">alert("ERROR EN CONSULTA");</script>';
                return view('login/login');
            }
        }
    }

    public function puntoVenta()
    {
        if($this->session->has('usuario')){
            $asideD = [
                "usuario"=>$this->session->get('usuario'),
                "rutas"=>$this->session->get('rutas'),
                "roles"=>$this->session->get('roles')
            ];
            return view('layouts/header', $asideD).view('layouts/aside', $asideD).view('pages/puntoventa').view('layouts/footer', $asideD);
        }else{
            return view('login/login');
        }
    }

    public function productos()
    {
        if($this->session->has('usuario')){
            $asideD = [
                "usuario"=>$this->session->get('usuario'),
                "rutas"=>$this->session->get('rutas'),
                "roles"=>$this->session->get('roles')
            ];
            return view('layouts/header', $asideD).view('layouts/aside', $asideD).view('pages/productos').view('layouts/footer', $asideD);
        }else{
            return view('login/login');
        }
    }
    
    public function capaciaciones()
    {
        if($this->session->has('usuario')){
            $asideD = [
                "usuario"=>$this->session->get('usuario'),
                "rutas"=>$this->session->get('rutas'),
                "roles"=>$this->session->get('roles')
            ];
            return view('layouts/header', $asideD).view('layouts/aside', $asideD).view('pages/capacitacion').view('layouts/footer', $asideD);
        }else{
            return view('login/login');
        }
    }

    public function foroMensajes()
    {
        if($this->session->has('usuario')){
            $asideD = [
                "usuario"=>$this->session->get('usuario'),
                "rutas"=>$this->session->get('rutas'),
                "roles"=>$this->session->get('roles')
            ];
            return view('layouts/header', $asideD).view('layouts/aside', $asideD).view('pages/foroMensajes').view('layouts/footer', $asideD);
        }else{
            return view('login/login');
        }
    }

    public function premios()
    {
        if($this->session->has('usuario')){
            $asideD = [
                "usuario"=>$this->session->get('usuario'),
                "rutas"=>$this->session->get('rutas'),
                "roles"=>$this->session->get('roles')
            ];
            return view('layouts/header', $asideD).view('layouts/aside', $asideD).view('pages/premios').view('layouts/footer', $asideD);
        }else{
            return view('login/login');
        }
    }

    public function configuracion()
    {
        if($this->session->has('usuario')){
            $asideD = [
                "usuario"=>$this->session->get('usuario'),
                "rutas"=>$this->session->get('rutas'),
                "roles"=>$this->session->get('roles')
            ];
            return view('layouts/header', $asideD).view('layouts/aside', $asideD).view('pages/config').view('layouts/footer', $asideD);
        }else{
            return view('login/login');
        }
    }
}