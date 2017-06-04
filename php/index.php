<?php

include 'simple_html_dom.php';

// Create DOM from URL or file.
$html = file_get_html('http://www.bomberosperu.gob.pe/po_diario.asp');

// Find all links 

$data = [];
$map = [];
// Find all article blocks

$tr = $html->find('tr.TextoContenido');
$img = $html->find('img');

foreach ($tr as $item) {
  $data['id'] = $item->find('td div', 0)->plaintext;
  $data['number'] = $item->find('td div', 1)->plaintext;
  $data['created'] = $item->find('td div', 2)->plaintext;
  $data['address'] = $item->find('td div', 3)->plaintext;
  $data['emergency_type'] = $item->find('td div', 4)->plaintext;
  $data['status'] = $item->find('td div', 5)->plaintext;
  $data['machines'] = $item->find('td div', 6)->plaintext;

  foreach( $img as $element) {
  	$map['lat'] = $element->src;
  	$map['long'] = $element->onclick;
    $data['map'] = $map;
  }

  //print_r(str_replace("&nbsp;", "",$data));

  $json = json_encode(str_replace("&nbsp;", "",$data));

  print_r($json);
}  