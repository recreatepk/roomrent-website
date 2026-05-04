<?php
/**
 * Server-side visitor counter for Room Rent website.
 *
 * This stores the shared total in /data/visitor-count.json so every visitor
 * sees the same number. No MySQL database is required.
 */

session_start();
header('Content-Type: application/json');
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');

$countFile = __DIR__ . '/../data/visitor-count.json';

if (!is_dir(dirname($countFile))) {
    mkdir(dirname($countFile), 0755, true);
}

if (!file_exists($countFile)) {
    file_put_contents($countFile, json_encode([
        'total_visitors' => 0,
        'last_updated' => null
    ], JSON_PRETTY_PRINT), LOCK_EX);
}

$fp = fopen($countFile, 'c+');

if (!$fp) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'count' => 0,
        'message' => 'Unable to open counter storage file.'
    ]);
    exit;
}

flock($fp, LOCK_EX);
rewind($fp);

$contents = stream_get_contents($fp);
$data = json_decode($contents, true);

if (!is_array($data) || !isset($data['total_visitors'])) {
    $data = [
        'total_visitors' => 0,
        'last_updated' => null
    ];
}

// Count one visitor per PHP browser session to avoid increasing on every page click.
if (empty($_SESSION['room_rent_visitor_counted'])) {
    $data['total_visitors'] = (int)$data['total_visitors'] + 1;
    $data['last_updated'] = date('Y-m-d H:i:s');
    $_SESSION['room_rent_visitor_counted'] = true;
}

rewind($fp);
ftruncate($fp, 0);
fwrite($fp, json_encode($data, JSON_PRETTY_PRINT));
fflush($fp);
flock($fp, LOCK_UN);
fclose($fp);

echo json_encode([
    'success' => true,
    'count' => (int)$data['total_visitors']
]);
