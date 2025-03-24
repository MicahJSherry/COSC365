<?php
function display_mp3($folder, $file){
	$size = filesize($folder."/".$file);
	$html  = "<li class='mp3item'>";
	$html .= "<a href='".$folder."/". $file ."'>". $file ."</a>";
	$html .= "(". $size ." b)";
	$html .= "</li>";
	return $html;
}
function display_playlist( $file){
	$html  = "<li class='playlistitem'>";
	$html .= "<a href='music.php?playlist=". $file. "'>".$file."</a>";
	$html .= "</li>";
	return $html;
}
?>
<html>
	<head>
		<title>Music Viewer</title>
		<link href="viewer.css" type="text/css" rel="stylesheet" />
	</head>

	<body>
		<div id="header">

			<h1>190M Music Playlist Viewer</h1>
			<h2>Search Through Your Playlists and Music</h2>
		</div>
		
		
		<div id="listarea">
			<ul id="musiclist">
				<?php
				$playlist = $_REQUEST["playlist"];


				$folder = "songs";
				if (isset($playlist) && $playlist != null){
					$content = file_get_contents($folder . "/" . $playlist);
					$files = explode("\n", $content );
						
				} else {
					$files = scandir($folder);
				}
				$html = "";
				foreach( $files as $file ) {
					$file = trim($file);
					if ( $file != "." && $file != ".." ){
						if (pathinfo($file, PATHINFO_EXTENSION) == "mp3" ) {
							$html = display_mp3($folder, $file). $html;
						} elseif (pathinfo($file, PATHINFO_EXTENSION) == "txt" ){
							$html = $html . display_playlist($file);
							
						}
						
					} 
				}
				print $html;
				?>
			</ul>
		</div>
	</body>
</html>