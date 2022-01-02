<?php 
namespace App\Models;
use CodeIgniter\Model;

class EmtopModel extends Model
{
    public function getDataPOST_JSON($sec,$json)
    {
        $url = 'http://localhost/emtop'.$sec;
        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_URL => $url,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_CUSTOMREQUEST => "POST",
            CURLOPT_POSTFIELDS => json_encode($json),
            CURLOPT_HTTPHEADER => array(
              'Accept: application/json',
              'Content-Type: application/json',
            ),
        ));
        $response = curl_exec($curl);
        curl_close($curl);
        return json_decode($response);
    }
}