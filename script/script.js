var get = $.ajax({
	url: 'https://slobaaa.github.io/vezbaAjax/prijava',
	type: 'GET'
}) //iscitao je json i u sledecem redu te podatke smesta u promenljivu podatak i je id a podatak je ostalo
get.done(function(podaci) {
	$.each(podaci, function(i,podatak){
		let rekordZaDodavanje = '<tr><td>'+ podatak.jmbg + '</td><td>' + podatak.ime + '</td><td>' + podatak.prezime + '</td><td>' + podatak.email + '</td>	<td>' + podatak.komentar + '</td><td><button id="' + podatak.id + '" class="btn btn-warning">Izmena</button></td><td><button id="' + podatak.id + '" class="btn btn-danger">Obrisi</button></td></tr>';
		$("tbody").append(rekordZaDodavanje);
	});
	$("#tabela").dataTable();

//brisanje
$("#tabela tbody").on('click', 'button', function() {
		if ($(this).hasClass('btn-danger')) {
			$.ajax({
				url: 'https://slobaaa.github.io/vezbaAjax/prijava/' + $(this).attr("id"),
				type: 'DELETE',
				dataType: 'json',
				success: function() {
					alert("Obrisano");
				}
			});
			$(this).parent().parent().remove();
		}
		else if ($(this).hasClass('btn-warning')) {
			$("#modalUnos").modal('toggle');
			var btnThis = $(this);
			var tr=this.parentNode.parentNode;
			$("#ime").attr("placeholder", tr.cells[1].childNodes[0].data);
			$("#prezime").attr("placeholder", tr.cells[2].childNodes[0].data);
			$("#jmbg").attr("placeholder", tr.cells[0].childNodes[0].data);
			$("#email").attr("placeholder", tr.cells[3].childNodes[0].data);
		
			//validacija

			$("#forma").validate({
				rules: {
					ime: {
						required: true,
						minlength: 3
					},
					prezime: {
						required: true,
						minlength: 3
					},
					jmbg: {
						required: true,
					    number: true,
					    minlength: 13,
					    maxlength: 13,
					},
					email: {
						required: true,
						email: true
					},
					komentar: {
						required: true,
						minlength: 10
					}

				},
				messages: {
					ime: {
						required: "Unesite Vase ime",
						minlength: "Mora imati bar 3 karaktera"
					},
					prezime: {
						required: "Unesite Vase prezime",
						minlength: "Mora imati bar 3 karaktera"
					},

					email:  "Unesite validan email",
					
					jmbg: {
						required: "Unesite validan jmbg",
						minlength: "Mora imati 13 karaktera",
						maxlength: "Mora imati 13 karaktera"
					},
					komentar: "Unesite komentar"
				},
			
		submitHandler: function() {
					var imef = $("#ime").val();
					var prezimef = $("#prezime").val();
					var emailf = $("#email").val();
					var jmbgf = $("#jmbg").val();
					var komentarf = $("#komentar").val();

					var osoba={ime:imef, prezime:prezimef, email:emailf, jmbg:jmbgf, komentar:komentarf};
					$.ajax({
						url: 'https://slobaaa.github.io/vezbaAjax/prijava/' + btnThis.attr("id"),
						type: 'PUT',
						data: osoba,
						success: function (podatak){
							var get = $.ajax({
								type: "GET",
								url: "https://slobaaa.github.io/vezbaAjax/prijava"
							});

							get.done(function(podaci){
							$("tbody").empty();
							$.each(podaci, function(i,podatak){
								let rekordZaDodavanje = '<tr><td>'+ podatak.jmbg + '</td><td>' + podatak.ime + '</td><td>' + podatak.prezime + '</td><td>' + podatak.email + '</td>	<td>' + podatak.komentar + '</td><td><button id="' + podatak.id + '" class="btn btn-warning">Izmena</button></td><td><button id="' + podatak.id + '" class="btn btn-danger">Obrisi</button></td></tr>';
								$("tbody").append(rekordZaDodavanje);
							});
						$("#tabela").dataTable();
					});
					
					get.fail(function (podaci) {
						alert(podaci.statusText);
					});
					}					

				});

			$("#modalUnos").modal('toggle');
			}
});
$("#forma").trigger("reset");
}
});
});

//DODAVANJE NOVOG REKORDA SA POST METODOM
function dodajNovogZaposlenog() {
			//VALIDACIJA ADD
			$("#addForma").validate({
				rules: {
					addIme: {
						required: true,
						minlength: 3
					},
					addPrezime: {
						required: true,
						minlength: 3
					},
					addJmbg: {
						required: true,
					    number: true,
					    minlength: 13,
					    maxlength: 13,
					},
					addEmail: {
						required: true,
						email: true
					},
					addKomentar: {
						required: true,
						minlength: 10
					}

				},
				messages: {
					addIme: {
						required: "Unesite Vase ime",
						minlength: "Mora imati bar 3 karaktera"
					},
					addPrezime: {
						required: "Unesite Vase prezime",
						minlength: "Mora imati bar 3 karaktera"
					},

					addEmail: "Unesite validan email",
					
					addJmbg: {
						required: "Unesite validan jmbg",
						minlength: "Mora imati 13 karaktera",
						maxlength: "Mora imati 13 karaktera"
					},
					addKomentar: "Unesite komentar"
				},
			

			//ako je u redu da doda
		submitHandler: function() {
					let imef = $("#addIme").val();
					let prezimef = $("#addPrezime").val();
					let jmbgf = $("#addJmbg").val();
					let emailf = $("#addEmail").val();
					let komentarf = $("#addKomentar").val();

					var dataToSend = {ime:imef,prezime:prezimef,email:emailf, jmbg:jmbgf, komentar:komentarf};
						var zahtev = $.ajax({
						type: "POST",
						url: 'https://slobaaa.github.io/vezbaAjax/prijava',
						data: dataToSend
					});
			

			zahtev.done(function(podaci) 
			{
				$("#prikaz").text(JSON.stringify(podaci));
				alert("done");
					
					var get = $.ajax({
						type: "GET",
						url: "https://slobaaa.github.io/vezbaAjax/prijava"
					});

					get.done(function(podaci){
						$("tbody").empty();
						$.each(podaci, function(i,podatak){
							let rekordZaDodavanje = '<tr><td>'+ podatak.jmbg + '</td><td>' + podatak.ime + '</td><td>' + podatak.prezime + '</td><td>' + podatak.email + '</td>	<td>' + podatak.komentar + '</td><td><button id="' + podatak.id + '" class="btn btn-warning">Izmena</button></td><td><button id="' + podatak.id + '" class="btn btn-danger">Obrisi</button></td></tr>';
							$("tbody").append(rekordZaDodavanje);
						});
						$("#tabela").dataTable();
					});
					
					get.fail(function (podaci) {
						alert(podaci.statusText);
					});
					$("#tabela").dataTable();
				
			});
			zahtev.fail(function(podaci) //od posta
			{
				alert(podaci.statusText);
				alert("fail");
			});
	}

});
}







