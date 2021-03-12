$(function () {
    $("#beolvas").on("click", beolvas);
    $("#kuld").on("click", adBeir);
    $("article").delegate(".torol", "click", adTorol);
    $("article").delegate(".szerkeszt", "click", adSzerkeszt);
    $("#megse").on("click", adMegse);
    $("#modosit").on("click", adModosit);
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
        var id = telefonkonyvem[i].ID;
        var elem = "<div><h2>" + nev + "</h2>\n\
<p>" + tel + "</p><p>" + kep + "</p>\n\
<button class='torol' id='" + id + "'>Töröl</button>\n\
<button class='szerkeszt' id='" + i + "'>Szerkeszt</button>\n\
</div>";
        $("article").append(elem);
    }
}

function beolvas() {
    console.log("beolvas");
    $.ajax({
        type: "GET",
        url: "feldolgoz.php",
        success: function (result) {
            console.log("result");
            telefonkonyvem = JSON.parse(result);
            console.log(telefonkonyvem);
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
        success: function () {
            aktelem.remove();
            kiir();
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
        success: function (ujSzemely) {
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

function adSzerkeszt() {
    console.log("modosit");
    $(".szerkesztes").removeClass("elrejt");
    var index = $(this).attr("id");
    console.log(index);
    
    $("#id2").val(telefonkonyvem[index].ID);
    $("#nev2").val(telefonkonyvem[index].nev);
    $("#tel2").val(telefonkonyvem[index].tel);
    $("#kep2").val(telefonkonyvem[index].kep);   
}

function adModosit() {
    var editszemely = {
        ID: $("#id2").val(),
        nev: $("#nev2").val(),
        tel: $("#tel2").val(),
        kep: $("#kep2").val()
    };
    console.log("modosit");
    console.log(editszemely)
    $.ajax({
        type: "PUT",
        url: "modosit.php",
        data: editszemely,
        success: function () {
            beolvas();
            
        },
        error: function () {
            alert("Hiba az adatok módosításakor!");
        }
    });
}

function adMegse() {
    $(".szerkesztes").addClass("elrejt");
}