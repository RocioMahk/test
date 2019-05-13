
$('#submit').click(function(){
    console.log('estoy en archivo reciveData.js de usuarios');
    var jsonUser = saveUserData();
    console.log(jsonUser);
        $.ajax({
        method: "POST",
        url: '/admin/usuarios/save/',
        data: jsonUser
    })
    .done(function(d){
        console.log(d);
        $('#id')[0].value = d._id;
        $('#modalResponse').fadeIn(500).delay(2000).fadeOut(500, function(){
            window.history.back();
        });

    })
    .error(function(d){
        console.error('ERROR: ' + d);
    });

});

function saveUserData()
{
    var data = {};
    /*if (path.indexOf('registrar') > -1)
        data.primeravez = true;
    if (data.primeravez)
    {*/

        data.id = $('#id')[0].value;
        data.email = $('#email')[0].value;
        data.psw = $('#password1')[0].value;
        data.confPsw = $('#password2')[0].value;
        data.nombre = $('#nombre')[0].value;
        data.apellidos = $('#apellidos')[0].value;
        data.ocupación = $('#ocupacion')[0].value;
        data.fechaNac = $('#fechanac')[0].value;
        data.desc = $('#descripcion')[0].value;
        data.web = $('#website')[0].value;
        //data.foto = $('#')
        data.cita = $('#cita')[0].value;
        data.ubi = $('#ubicacion')[0].value;
        data.grupo = $('input[name="grupo"]:checked').val();
        data.estado = $('input[name="estado"]:checked').val();
    //}
    return data;
    /*

    $.ajax({
        method: "POST",
        url: '/admin/usuarios/save/',
        data: data
    })
    .done(function(d){
        console.log(d);
        $('#id')[0].value = d._id;
        $('#modalResponse').fadeIn(500).delay(2000).fadeOut(500, function(){
            window.history.back();
        });

    })
    .error(function(d){
        //console.error(d);
    }); */

}

