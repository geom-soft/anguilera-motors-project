<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require_once('assets/vendor/autoload.php');

if ( ! function_exists('extraeRegistros'))
{
    function extraeRegistros($ruta){

      $servicios = array();
      $index = -1;

      try {
        $reader = \PhpOffice\PhpSpreadsheet\IOFactory::createReader('Xlsx');
        $reader->setReadDataOnly(true);
        $spreadsheet = $reader->load($ruta);
        $worksheet = $spreadsheet->getActiveSheet();
      } catch (\PhpOffice\PhpSpreadsheet\Reader\Exception $e) {
        return FALSE;
      }



      foreach ($worksheet->getRowIterator() as $ixRow => $row) {

        if ($ixRow == 1) continue; // salta los encabezados

        $a = $worksheet->getCellByColumnAndRow(1, $ixRow)->getValue();
        $b = $worksheet->getCellByColumnAndRow(2, $ixRow)->getValue();
        $c = $worksheet->getCellByColumnAndRow(3, $ixRow)->getValue();
        $d = $worksheet->getCellByColumnAndRow(4, $ixRow)->getValue();
        $e = $worksheet->getCellByColumnAndRow(5, $ixRow)->getValue();
        $f = $worksheet->getCellByColumnAndRow(6, $ixRow)->getValue();

        if ($a == null && $b == null && $c == null && $d == null && $e == null && $f == null) continue; // salta filas vacías


        // identifica si comienza un servicio o es ruta
        if ($a !== null) {
          $index++;
          $unix_date = ($a - 25569) * 86400; // conversion de fecha UNIX_DATE
          array_push($servicios, array(
            // "fecha" => $a,
            "fecha" => gmdate("Y-m-d H:i:s", $unix_date),
            "rutas" => array(array(
              "lugar" => $b,
              "domicilio" => $c,
              "nombre" => $d,
              "nomina" => $e,
              "telefono" => $f
            ))
          ));
        } else {
          array_push($servicios[$index]['rutas'], array(
            "lugar" => $b,
            "domicilio" => $c,
            "nombre" => $d,
            "nomina" => $e,
            "telefono" => $f
          ));
        }

      }

      return $servicios;

    }
}


if ( ! function_exists('imprimeValoresPrueba'))
{
    function imprimeValoresPrueba($ruta){

      $reader = \PhpOffice\PhpSpreadsheet\IOFactory::createReader('Xlsx');
      $reader->setReadDataOnly(true);
      $spreadsheet = $reader->load($ruta);
      $sheet = $spreadsheet->getActiveSheet();
      foreach ($sheet->getRowIterator() as $ixRow => $row) {

        if ($ixRow == 1) continue; // salta los encabezados

        $cellIterator = $row->getCellIterator();
        $cellIterator->setIterateOnlyExistingCells(FALSE);

        foreach ($cellIterator as $ixCol => $cell) {
          echo "<br>".$ixCol.$ixRow." - ".$cell->getValue();
        }

      }

      return "FIN";

    }
}


function conversion($parametro) {
  // esta conversión se hizo porque la hora que se lee de excel esta en un rango de 0 a 1. 0 -> 0:00 y 24:00 -> 1
  $val1 =  $parametro * 24;
  $e = intval($val1);
  $d = abs($e - $val1);
  $val2 = round($d, 2) * 60;
  $val3 = intval($val2);
  return str_pad((string)$e, 2, '0', STR_PAD_LEFT).":".str_pad((string)$val3, 2, '0', STR_PAD_RIGHT);
}



if ( ! function_exists('extraeServicios'))
{
    function extraeServicios($ruta){

      $registros = array();
      $index = -1;

      try {
        $reader = \PhpOffice\PhpSpreadsheet\IOFactory::createReader('Xlsx');
        $reader->setReadDataOnly(true);
        $spreadsheet = $reader->load($ruta);
        $worksheet = $spreadsheet->getActiveSheet();
      } catch (\PhpOffice\PhpSpreadsheet\Reader\Exception $e) {
        return FALSE;
      }



      foreach ($worksheet->getRowIterator() as $ixRow => $row) {

        if ($ixRow == 1) continue; // salta los encabezados

        $a = $worksheet->getCellByColumnAndRow(1, $ixRow)->getValue();
        $b = $worksheet->getCellByColumnAndRow(2, $ixRow)->getValue();
        $c = $worksheet->getCellByColumnAndRow(3, $ixRow)->getValue();
        $d = $worksheet->getCellByColumnAndRow(4, $ixRow)->getValue();
        $e = $worksheet->getCellByColumnAndRow(5, $ixRow)->getValue();
        $f = $worksheet->getCellByColumnAndRow(6, $ixRow)->getValue();
        $g = $worksheet->getCellByColumnAndRow(7, $ixRow)->getValue();

        if ($a == null && $b == null && $c == null && $d == null && $e == null && $f == null && $g == null) continue; // salta filas vacías


        $hre = ($e == 'ENTRADA' || $e == 'ENTRADA Y SALIDA') ? conversion($g) : null;
        $hrs = ($e == 'SALIDA' || $e == 'ENTRADA Y SALIDA') ? conversion($c) : null;

        // identifica si comienza un servicio o es ruta
        if ($d !== null) {
          $index++;
          $unix_date = ($a - 25569) * 86400; // conversion de fecha UNIX_DATE

          array_push($registros, array(
            // "fecha" => $a,
            "fecha_servicio" => gmdate("Y-m-d", $unix_date),
            "hora_entrada" => conversion($b),
            "hora_salida" => conversion($c),
            "nombre_ruta" => $d,
            "paradas" => array(array(
              "tipo_parada" => $e,
              "idnomina" => $f,
              "hora_recoleccion_entrada" => $hre,
              "hora_recoleccion_salida" => $hrs
            ))
          ));
        } else {
          array_push($registros[$index]['paradas'], array(
            "tipo_parada" => $e,
            "idnomina" => $f,
            "hora_recoleccion_entrada" => $hre,
            "hora_recoleccion_salida" => $hrs
          ));
        }

      }

      return $registros;

    }
}






if ( ! function_exists('extraeEmpleados'))
{
    function extraeEmpleados($ruta){

      $registros = array();
      $index = -1;

      try {
        $reader = \PhpOffice\PhpSpreadsheet\IOFactory::createReader('Xlsx');
        $reader->setReadDataOnly(true);
        $spreadsheet = $reader->load($ruta);
        $worksheet = $spreadsheet->getActiveSheet();
      } catch (\PhpOffice\PhpSpreadsheet\Reader\Exception $e) {
        return FALSE;
      }



      foreach ($worksheet->getRowIterator() as $ixRow => $row) {

        if ($ixRow == 1) continue; // salta los encabezados

        $a = $worksheet->getCellByColumnAndRow(1, $ixRow)->getValue();
        $b = $worksheet->getCellByColumnAndRow(2, $ixRow)->getValue();
        $c = $worksheet->getCellByColumnAndRow(3, $ixRow)->getValue();
        $d = $worksheet->getCellByColumnAndRow(4, $ixRow)->getValue();
        $e = $worksheet->getCellByColumnAndRow(5, $ixRow)->getValue();
        $f = $worksheet->getCellByColumnAndRow(6, $ixRow)->getValue();

        if ($a == null && $b == null && $c == null && $d == null && $e == null && $f == null) continue; // salta filas vacías


        if ($a !== null) {
          $index++;
          array_push($registros, array(
            "numero_nomina" => $a,
            "nombre_solicitante" => $b,
            "telefono" => $c,
            "alias_lugar" => $d,
            "domicilio" => $e,
            "ubicacion" => $f
          ));
        }

      }

      return $registros;

    }
}
