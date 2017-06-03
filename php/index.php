<?php

include 'simple_html_dom.php';

// Create DOM from URL or file.
$html = file_get_html('http://www.bomberosperu.gob.pe/po_diario.asp');

// Find all links 

$data = [];
// Find all article blocks
$i = 0;
$tr = $html->find('tr.TextoContenido');

foreach ($tr as $item) {
  $data[] = $item->find('td div', 3)->plaintext;
}
print_r($data);
