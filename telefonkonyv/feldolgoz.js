$(function () {
    $("#beolvas").on("click", beolvas);
    $("#kuld").on("click", adBeir);
    $("article").delegate(".torol", "click", adTorol);

});

var telefonkonyvem = [];

function kiir() {
    console.log("kiir");
//    var nev = $("#nev").val();
//    var tel = $("#tel").val();
//    var kep = $("#kep").val();

    $("article").empty();
    for (var i = 0; i < telefonkonyvem.length; i++) {
        var nev = telefonkonyvem[i].nev;
        var tel = telefonkonyvem[i].tel;
        var kep = telefonkonyvem[i].kep;
        var ID = telefonkonyvem[i].ID;
        var elem = "<div><h2>" + nev + "</h2><p>" + tel + "</p><p>" + kep + "</p><button class='torol' id='" + ID + "'>Töröl</button></div>";
        $("article").append(elem);
    }
}

function beolvas() {
    console.log("beolvas");
    $.ajax({
        type: "GET",
        url: "feldolgoz.php",
        success: function (result) {
            console.log(result); /*JSONn formátumban várjuk az AB eredményeit*/
           telefonkonyvem = JSON.parse(result);
          console.log(telefonkonyvem); /*JSONn formátumban várjuk az AB eredményeit*/
           kiir();
        },
        error: function () {
            alert("Hiba az adatok betöltésekor!");
        }
    });
}

function adTorol() {
    console.log("Törlés");
    var aktelem = $(this).closest("div");
    var id = $(this).attr("id");

    $.ajax({
        type: "DELETE",
        url: "torles.php?ID=" + id,
        succes: function () {
            aktelem.remove();
        },
        error: function () {
            alert("Hiba az adatok törlésekor!");
        }
    });
}

function adBeir() {
    var szemely = {
        nev: $("#nev").val(),
        tel: $("#tel").val(),
        kep: $("#kep").val()
    };

    $.ajax({
        type: "POST",
        url: "beir.php",
        data: szemely,
        succes: function (ujSzemely) {
            console.log(ujSzemely);
            telefonkonyvem.push(JSON.parse(ujSzemely));
            console.log(telefonkonyvem);
            kiir();
        },
        error: function () {
            alert("Hiba az adatok betöltésekor!");
        }
    });
}

