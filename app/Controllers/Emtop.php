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

	public function login()
	{
		if($this->session->has('usuario')){
            $asideD = [
                "usuario"=>$this->session->get('usuario'),
                "rutas"=>$this->session->get('rutas'),
                "roles"=>$this->session->get('roles')
            ];
            return view('layouts/header').view('layouts/aside', $asideD).view('layouts/body').view('layouts/footer');
        }
        if(!isset($_POST['user']) && !isset($_POST['pass']))
            return $this->login();
        $resp = $this->model->login($_POST['user'], $_POST['pass']);
        if($resp["ESTATUS"] == "CORRECTO"){
            $this->session->set([
                "usuario" => $resp["DATOS"],
                "rutas" => (array) $resp["RUTAS"],
                "roles" => $resp["ROLES"]
            ]);
            $asideD = [
                "usuario" => $this->session->get('usuario'),
                "rutas" => $this->session->get('rutas'),
                "roles" => $this->session->get('roles')
            ];
            return view('layouts/header').view('layouts/aside', $asideD).view('layouts/body').view('layouts/footer');
        }else{
            echo '<script language="javascript">alert("'.$resp["ESTATUS"].'");</script>';
            return $this->login();
        }
    }
}