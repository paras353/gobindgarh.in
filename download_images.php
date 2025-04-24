<?php
// Create necessary directories
$directories = [
    'images/about',
    'images/rooms',
    'images/dining',
    'images/offers',
    'images/gallery'
];

foreach ($directories as $dir) {
    if (!file_exists($dir)) {
        mkdir($dir, 0777, true);
    }
}

// Image URLs and their corresponding local paths
$images = [
    // About section
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80' => 'images/about/hotel-interior.jpg',
    
    // Rooms section
    'https://images.unsplash.com/photo-1590490359683-658d3d23f972?auto=format&fit=crop&w=800&q=80' => 'images/rooms/deluxe-room.jpg',
    'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80' => 'images/rooms/luxury-suite.jpg',
    'https://images.unsplash.com/photo-1587985064135-0366536eab42?auto=format&fit=crop&w=800&q=80' => 'images/rooms/executive-room.jpg',
    
    // Dining section
    'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80' => 'images/dining/main-restaurant.jpg',
    'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80' => 'images/dining/sky-lounge.jpg',
    'https://images.unsplash.com/photo-1579027989536-b7b1f875659b?auto=format&fit=crop&w=800&q=80' => 'images/dining/sushi-bar.jpg',
    'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=800&q=80' => 'images/dining/cafe.jpg',
    
    // Offers section
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80' => 'images/offers/weekend-getaway.jpg',
    'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=800&q=80' => 'images/offers/romance-package.jpg',
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80' => 'images/offers/dining-experience.jpg',
    'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80' => 'images/offers/spa-package.jpg',
    
    // Gallery section
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80' => 'images/gallery/hotel-facade.jpg',
    'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80' => 'images/gallery/hotel-exterior.jpg',
    'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80' => 'images/gallery/deluxe-room-gallery.jpg',
    'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=80' => 'images/gallery/restaurant-gallery.jpg',
    'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80' => 'images/gallery/luxury-suite-gallery.jpg',
    'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80' => 'images/gallery/spa-gallery.jpg',
    'https://images.unsplash.com/photo-1572331165267-854da2b10ccc?auto=format&fit=crop&w=800&q=80' => 'images/gallery/pool-gallery.jpg',
    'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80' => 'images/gallery/rooftop-bar-gallery.jpg',
    'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80' => 'images/gallery/hotel-lobby.jpg'
];

// Download each image
foreach ($images as $url => $path) {
    $imageData = file_get_contents($url);
    if ($imageData !== false) {
        file_put_contents($path, $imageData);
        echo "Downloaded: $path\n";
    } else {
        echo "Failed to download: $url\n";
    }
}

echo "All images have been downloaded and organized.\n";
?> 