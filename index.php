<?php

include 'simple_html_dom.php';

// Create DOM from URL or file.
$html = file_get_html('http://www.bomberosperu.gob.pe/po_diario.asp');

// Find all links 

$data = [];
// Find all article blocks
$i = 0;
$img = $html->find('img');

foreach ($img as $item) {
  $data[] = $item->src;
}
print_r($data);
