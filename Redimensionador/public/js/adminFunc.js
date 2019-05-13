confPass = false

function confirmarPsw()
{
	var a = document.getElementById("Password1").value;
	var b = document.getElementById("Password2").value;

	if(!(a==b))
	{
		alert("ambos password no coinciden");
		return false;
	}
	else
		return true;

}

function guardarUsuario(userId)
{
	console.log(userId);
	pack = {};
	if (userId != '')
		pack.id = userId;
	pack.email = $('#email')[0].value;
	//if (confPass)
	pack.pass = $('#Password1')[0].value;
	pack.nombre = $('#nombre')[0].value;
	pack.apellidos = $('#apellidos')[0].value;
	//pack.ocupacion = $('#ocupacion')[0].value;
	pack.fechanac = $('#fechanac')[0].value;
	//pack.descripcion = $('#descripcion')[0].value;
	//pack.website = $('#website')[0].value;
	//pack.cita = $('#cita')[0].value;
	//pack.ubicacion = $('#ubicacion')[0].value;
	pack.grupo = $('input[name="grupo"]:checked').val();
	pack.estado = $('input[name="estado"]:checked').val();
	console.log(pack);

	$.ajax({
        method: "POST",
        url: '/admin/api/guardarUsuario/',
        data: pack
    })
    .done(function(d){
        console.log(d);
        if (d.estado == 'ok')
        {
        	$("#userId")[0].value = d.elem._id;
        	history.pushState({}, "", "/admin/usuario/"+d.elem.local.email);
        	$('#modalResponse').fadeIn().delay(2500).fadeOut();
        }

        //modificar url para que tenga referenciado el nuevo usuario que acabas de crear

    })
    .error(function(d){
        //console.error(d);
    });

}

function guardarRango(rangoId)
{
	console.log(rangoId);
	pack = {};
	if (rangoId != '')
		pack.id = rangoId;
	//pack.Juego = $('#titulo')[0].value;
	//pack.Usuario = $('#intro')[0].value;
	pack.contenido = $('#contenido')[0].value;
	//pack.Calificacion = $('#link')[0].value;

	$.ajax({
        method: "POST",
        url: '/admin/api/guardarRango/',
        data: pack
    })
    .done(function(d){
        console.log(d);

    })
    .error(function(d){
        //console.error(d);
    });

}

function guardarJuego(juegoId)
{
	console.log(juegoId);
	pack = {};
	if (juegoId != '')
		pack.id = juegoId;
	pack.titulo = $('#titulo')[0].value;
	pack.intro = $('#intro')[0].value;
	pack.contenido = $('#contenido')[0].value;
	pack.link = $('#link')[0].value;
	pack.publicado = $('#publicado')[0].value;
	pack.estado = $('input[name="estado"]:checked').val();
	pack.plataforma = $('#plataforma')[0].value;

	$.ajax({
        method: "POST",
        url: '/admin/api/guardarJuego/',
        data: pack
    })
    .done(function(d){
        console.log(d);

    })
    .error(function(d){
        //console.error(d);
    });
}

function guardarAutor(autorId)
{
	console.log('autorId');
	console.log(autorId);
	pack = {};
	if (autorId != '')
		pack.id = autorId;
	pack.nombre = $('#nombre')[0].value;
	pack.apellidos = $('#apellidos')[0].value;
	pack.descripcion = $('#descripcion')[0].value;
	pack.website = $('#website')[0].value;

	$.ajax({
        method: "POST",
        url: '/admin/api/guardarAutor/',
        data: pack
    })
    .done(function(d){
        console.log(d);
        if (d.estado == 'ok')
        {
        	$("#autorId")[0].value = d._id;
        	history.pushState({}, "", "/admin/autor/"+d.elem.slug);
        	$('#modalResponse').fadeIn().delay(2500).fadeOut();

        }

    })
    .error(function(d){
        //console.error(d);
    });

}

function guardarPublicacion(publicacionId)
{
	console.log(publicacionId);
	pack = {};
	if (publicacionId != '')
		pack.id = publicacionId;
	pack.titulo = $('#titulo')[0].value;
	pack.intro = $('#intro')[0].value;
	pack.contenido = $('#contenido')[0].value;
	pack.publicado = new Date($('#publicado')[0].value);
	pack.estado = $('input[name="estado"]:checked').val();
	pack.papelera = $('input[name="papelera"]:checked').val();
	pack.destacado = $('input[name="destacado"]:checked').val();

	$.ajax({
        method: "POST",
        url: '/admin/api/guardarPublicacion/',
        data: pack
    })
    .done(function(d){
        console.log(d);

    })
    .error(function(d){
        //console.error(d);
    });
}

$(document).ready(function(){
	$('#Password2').focusout(function(){
		console.log('verificar pass');
		confPass = confirmarPsw();
		console.log(confPass);
	});

	$('#guardaUser').click(function(){
		userId = $('#userId')[0].value;
		guardarUsuario(userId);
	});

	$('#guardaRango').click(function(){
		rangoId = $('#rangoId')[0].value;
		guardarRango(rangoId);
	});

	$('#guardaJuego').click(function(){
		juegoId = $('#juegoId')[0].value;
		guardarJuego(juegoId);
	});

	$('#guardaAutor').click(function(){
		autorId = $('#autorId')[0].value;
		console.log('estoy en adminFunc de autor');
		guardarAutor(autorId);
	});

	$('#guardaPublicacion').click(function(){
		publicacionId = $('#publicacionId')[0].value;
		guardarPublicacion(publicacionId);
	});

	$( "#fechanac" ).datepicker();

	$( "#publicado" ).datepicker();
});
