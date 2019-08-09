$(document).ready(function() {
	$('#buscar').click(function() {
        if($('#txtid').val()==""){
            Swal.fire({        
            type: 'error',
            title: 'Ingrese un id de album',
            });
        }else{
            $('#caja1').text("");
            $('#caja2').text("");
            $('#musicas td').remove();
            buscar_album($('#txtid').val());
        }
		
	});
     
    function buscar_album(id) {
        
     	$.ajax({
     		url: 'https://api.deezer.com/album/'+id,
     		type: 'GET',
     		dataType: 'json',
     		
     	})
     	.done(function(datos){
            
     		debugger
            $('#caja1').append('<div class="card mb-3" style="max-width: 640px; background-color: #81CCCC;" ><div class="row no-gutters"><div class="col-md-4"><img style="border-radius: 150px;" src="'+datos.cover_medium+'"></div><div class="col-md-8"><div class="card-body"><h5 class="card-title">Album</p><p class="card-text"><small>'+datos.title+'</h5><p> :: '+datos.nb_tracks+' Canciones ♫ :: <br>:: Duración: '+datos.duration+' seg ▶:: <br> :: Publicado: '+datos.release_date+' ⌚ ::</small></p></div></div></div></div>')
             $('#caja2').append('<div class="card mb-3" style="max-width: 640px; background-color: #81CCCC;" ><div class="row no-gutters"><div class="col-md-4"><img style="border-radius: 150px;" src="'+datos.artist.picture_medium+'"></div><div class="col-md-8"><div class="card-body"><h5 class="card-title">Artista</p><p class="card-text"><small>'+datos.artist.name+'</h5><p> :: '+datos.fans+' Fans ♛ ::</small></p></div></div></div></div>')

            $.each(datos.tracks.data,function(index,val) {
            	
            	var tuplas="";
				tuplas+='<tr>'
                tuplas+='<td style="text-align: center;"><img style="border-radius: 150px;" src='+datos.artist.picture_small+'></td>'
                tuplas+='<td style="text-align: center;">'+val.title+'</td>'
				tuplas+='<td style="text-align: center;">'+val.duration+' seg</td>'
                tuplas+='<td style="text-align: center;"><audio src='+val.preview+' controls type="audio/mpeg"></audio></td>'
                tuplas+='</tr>'
                $('#musicas').append(tuplas);
            });
            
     		console.log("success");
     	})
     	.fail(function() {
            debugger
     		console.log("error");
     	})
     	 
    }
 
	
});