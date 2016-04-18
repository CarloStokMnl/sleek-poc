<?php
# https://css-tricks.com/snippets/wordpress/allow-svg-through-wordpress-media-uploader/
# Allow SVG Uploads
# add_filter('upload_mimes', 'sleek_allow_svg_uploads');

function sleek_allow_svg_uploads ($mimes) {
	$mimes['svg'] = 'image/svg+xml';

	return $mimes;
}
?>
